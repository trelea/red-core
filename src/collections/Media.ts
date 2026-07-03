import type { CollectionConfig } from 'payload';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const s3 = () =>
  new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
  });

export const Media: CollectionConfig = {
  slug: 'media',
  // Public read so the <img> requests to /payload-api/media/file/* are served
  // to anonymous visitors. Mutations still require an authenticated admin user.
  access: { read: () => true },
  lockDocuments: false, // avoid the admin `disabled` hydration mismatch
  // File storage handled by the s3Storage plugin (R2). Every uploaded image is
  // downscaled to a sane max size and converted to optimized WebP before it is
  // stored, so the frontend never receives multi-megapixel originals (phone
  // photos are ~24 MP, which decode to ~90 MB of bitmap each and cause scroll
  // lag). Payload runs this through `sharp` and updates the filename (.webp),
  // mimeType, filesize, and width/height automatically.
  upload: {
    // Cap the longest edge at 1024px (no upscaling of already-smaller images).
    resizeOptions: {
      width: 1024,
      height: 1024,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
  },
  hooks: {
    afterChange: [
      // With `clientUploads: true` the browser PUTs the RAW file to R2 via a
      // presigned URL, and the storage plugin then skips its own server-side
      // upload for that file (it filters out files carrying a
      // clientUploadContext — see @payloadcms/plugin-cloud-storage
      // hooks/afterChange). Payload core still runs the sharp pipeline above
      // and renames the doc to `<name>.webp`, so without this hook the doc
      // points at a .webp object that was never stored (404). Store the
      // converted buffer ourselves and drop the raw original.
      async ({ doc, req }) => {
        const ctx = (req.context?._payloadCloudStorage ?? {}) as {
          file?: typeof req.file;
        };
        const file = req.file ?? ctx.file;
        if (!file?.clientUploadContext || !file.data?.length || !doc?.filename)
          return doc;

        const client = s3();
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET || '',
            Key: doc.filename,
            Body: file.data,
            ContentType: doc.mimeType ?? 'image/webp',
          }),
        );

        // The raw client-uploaded object sits under the original filename;
        // remove it when the pipeline renamed the file (e.g. .jpg -> .webp).
        if (file.name && file.name !== doc.filename) {
          await client
            .send(
              new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET || '',
                Key: file.name,
              }),
            )
            .catch(() => {}); // best effort — an orphan original is harmless
        }

        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      admin: {
        description:
          'Describes the image for screen readers and SEO. Optional but recommended.',
      },
    },
  ],
};
