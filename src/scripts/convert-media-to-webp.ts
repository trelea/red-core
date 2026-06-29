/**
 * One-off migration: convert every existing image in the `media` collection to
 * WebP, updating BOTH the R2 bucket object and the Payload database record so
 * that all references (projects reference media by id, URLs derive from the
 * record's filename) keep working.
 *
 * New uploads are already converted automatically via the Media collection's
 * `upload.formatOptions` (see src/collections/Media.ts). This backfills files
 * that were uploaded before that was added.
 *
 * How it works, per image record (skipping anything already `image/webp`):
 *   1. read the original bytes from the bucket (GetObject by filename)
 *   2. re-upload them through Payload's Local API — `upload.formatOptions`
 *      converts to WebP, which updates filename (.webp), mimeType, filesize and
 *      width/height in the DB and writes the new object to the bucket
 *   3. delete the old (pre-conversion) bucket object whose key changed
 *
 * Run (DRY RUN — prints the plan, changes nothing):
 *   npm run convert:webp
 * Apply for real (note: `payload run` strips CLI flags, so use the APPLY env var):
 *   APPLY=1 npm run convert:webp
 *
 * Requires these env vars (same ones payload.config's s3Storage uses) to point
 * at the bucket/database you want to convert — set them in .env or export them:
 *   S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION, S3_ENDPOINT
 *   DATABASE_URI (+ DATABASE_AUTH_TOKEN)
 *
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

// `payload run` does not forward CLI flags to the script's process.argv, so the
// apply switch is an env var: `APPLY=1 npm run convert:webp`.
const APPLY = /^(1|true|yes)$/i.test(process.env.APPLY ?? '');

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var "${name}". Set the S3_* and DATABASE_* vars ` +
        `for the bucket/database you want to convert before running.`,
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
  // aws-sdk v3's Node stream exposes transformToByteArray(); fall back to async
  // iteration just in case.
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
    `\n${APPLY ? '⚙  APPLYING' : '🔎 DRY RUN'} — converting media images to WebP ` +
      `(bucket: ${bucket})\n`,
  );

  // Load every media record up front (the collection is small) so paginating
  // doesn't interact with the updates we make.
  const { docs } = await payload.find({
    collection: 'media',
    limit: 0,
    pagination: false,
    depth: 0,
  });

  let images = 0;
  let changed = 0;
  let alreadyWebp = 0;
  let failed = 0;

  for (const doc of docs as Media[]) {
    const { filename, mimeType } = doc;
    if (!filename || !mimeType || !mimeType.startsWith('image/')) continue;
    images++;

    if (mimeType === 'image/webp') {
      alreadyWebp++;
      continue;
    }

    try {
      const obj = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: filename }),
      );
      const original = await bodyToBuffer(obj.Body);
      const kb = (original.length / 1024).toFixed(0);

      if (!APPLY) {
        console.log(`would convert  ${filename}  (${mimeType}, ${kb} KB)`);
        changed++;
        continue;
      }

      // Re-upload through Payload; formatOptions converts to WebP and Payload
      // updates the DB record + writes the new bucket object.
      const updated = await payload.update({
        collection: 'media',
        id: doc.id,
        data: {}, // no field changes — the new `file` drives the conversion
        file: {
          data: original,
          name: filename,
          mimetype: mimeType,
          size: original.length,
        },
      });

      const newName = updated.filename;
      // Remove the old object whose key changed (e.g. photo.jpg -> photo.webp).
      if (newName && newName !== filename) {
        try {
          await s3.send(
            new DeleteObjectCommand({ Bucket: bucket, Key: filename }),
          );
        } catch {
          // Old object already gone — ignore.
        }
      }

      const newKb = ((updated.filesize ?? 0) / 1024).toFixed(0);
      console.log(`✓ ${filename} -> ${newName}  (${kb} KB -> ${newKb} KB)`);
      changed++;
    } catch (err) {
      failed++;
      console.error(`✗ ${filename}:`, (err as Error).message);
    }
  }

  console.log(
    `\nDone. images=${images} ${APPLY ? 'converted' : 'to-convert'}=${changed} ` +
      `already-webp=${alreadyWebp} failed=${failed}`,
  );
  if (!APPLY && changed > 0) {
    console.log('\nRe-run with `APPLY=1 npm run convert:webp` to convert.');
  }

  await flushAndExit(failed > 0 ? 1 : 0);
}

// Top-level await: `payload run` resolves the module import and exits, so the
// work must keep the module from finishing until it's done.
await main().catch(async (err) => {
  console.error(err);
  await flushAndExit(1);
});
