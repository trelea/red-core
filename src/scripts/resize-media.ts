/**
 * One-off migration: downscale existing oversized images in the `media`
 * collection to the same cap new uploads now use (longest edge 2048px), updating
 * BOTH the R2 bucket object and the Payload DB record.
 *
 * Why: phone photos were stored at ~24 MP (4284x5712). The WebP *file* is small,
 * but the browser decodes it to ~90 MB of bitmap each — 8-10 of them in a
 * projects section is ~900 MB of bitmap memory and causes heavy scroll lag.
 * Capping at 2048px (~5 MP) cuts decode/memory ~20x. New uploads are already
 * capped via the Media collection's `upload.resizeOptions`; this backfills old
 * files.
 *
 * Per image record, skipping anything already within the cap:
 *   1. read the original bytes from the bucket
 *   2. re-upload through Payload — `resizeOptions` + `formatOptions` downscale to
 *      <=2048px WebP, updating filename/mimeType/filesize/width/height in the DB
 *      and writing the new (smaller) object to the bucket
 *   3. delete the old object if its key changed
 *
 * Run (DRY RUN — prints the plan, changes nothing):
 *   npm run resize:media
 * Apply for real (`payload run` strips CLI flags, so use the APPLY env var):
 *   APPLY=1 npm run resize:media
 *
 * Requires the same env vars as payload.config's s3Storage (S3_* + DATABASE_*).
 * Recommended: back up the database and bucket before running with --apply.
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import type { Media } from '@/payload-types';

// Keep in sync with Media.upload.resizeOptions in src/collections/Media.ts.
const MAX_EDGE = 1024;

// `payload run` does not forward CLI flags to process.argv, so the apply switch
// is an env var: `APPLY=1 npm run resize:media`.
const APPLY = /^(1|true|yes)$/i.test(process.env.APPLY ?? '');

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var "${name}". Set the S3_* and DATABASE_* vars ` +
        `for the bucket/database you want to process before running.`,
    );
  }
  return value;
}

// process.exit() can truncate buffered stdout when it's piped (e.g. via
// `npm run`). Drain both streams before exiting so all progress is shown.
async function flushAndExit(code: number): Promise<never> {
  await Promise.all(
    [process.stdout, process.stderr].map(
      (stream) =>
        new Promise<void>((resolve) => {
          if (stream.write('')) resolve();
          else stream.once('drain', () => resolve());
        }),
    ),
  );
  process.exit(code);
}

async function bodyToBuffer(body: unknown): Promise<Buffer> {
  const maybe = body as { transformToByteArray?: () => Promise<Uint8Array> };
  if (typeof maybe?.transformToByteArray === 'function') {
    return Buffer.from(await maybe.transformToByteArray());
  }
  const chunks: Buffer[] = [];
  for await (const chunk of body as AsyncIterable<Uint8Array>) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function main() {
  const bucket = requireEnv('S3_BUCKET');
  const s3 = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true, // required for R2
    credentials: {
      accessKeyId: requireEnv('S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('S3_SECRET_ACCESS_KEY'),
    },
  });

  const payload = await getPayload({ config });

  console.log(
    `\n${APPLY ? '⚙  APPLYING' : '🔎 DRY RUN'} — downscaling media to <=${MAX_EDGE}px ` +
      `(bucket: ${bucket})\n`,
  );

  const { docs } = await payload.find({
    collection: 'media',
    limit: 0,
    pagination: false,
    depth: 0,
  });

  let images = 0;
  let changed = 0;
  let withinCap = 0;
  let failed = 0;

  for (const doc of docs as Media[]) {
    const { filename, mimeType, width, height } = doc;
    if (!filename || !mimeType || !mimeType.startsWith('image/')) continue;
    images++;

    const w = width ?? 0;
    const h = height ?? 0;
    if (w <= MAX_EDGE && h <= MAX_EDGE) {
      withinCap++;
      continue;
    }

    try {
      const obj = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: filename }),
      );
      const original = await bodyToBuffer(obj.Body);

      if (!APPLY) {
        console.log(`would resize  ${filename}  ${w}x${h}`);
        changed++;
        continue;
      }

      const updated = await payload.update({
        collection: 'media',
        id: doc.id,
        data: {}, // no field changes — the new `file` drives resize + webp
        file: {
          data: original,
          name: filename,
          mimetype: mimeType,
          size: original.length,
        },
      });

      const newName = updated.filename;
      if (newName && newName !== filename) {
        try {
          await s3.send(
            new DeleteObjectCommand({ Bucket: bucket, Key: filename }),
          );
        } catch {
          // Old object already gone — ignore.
        }
      }

      console.log(
        `✓ ${filename}  ${w}x${h} -> ${updated.width}x${updated.height}` +
          `  (${newName})`,
      );
      changed++;
    } catch (err) {
      failed++;
      console.error(`✗ ${filename}:`, (err as Error).message);
    }
  }

  console.log(
    `\nDone. images=${images} ${APPLY ? 'resized' : 'to-resize'}=${changed} ` +
      `within-cap=${withinCap} failed=${failed}`,
  );
  if (!APPLY && changed > 0) {
    console.log('\nRe-run with `APPLY=1 npm run resize:media` to downscale.');
  }

  await flushAndExit(failed > 0 ? 1 : 0);
}

await main().catch(async (err) => {
  console.error(err);
  await flushAndExit(1);
});
