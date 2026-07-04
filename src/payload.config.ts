import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import {
  CoreDrillingProjects,
  SlabCuttingProjects,
  SmallDemolitionProjects,
  WallSawCuttingProjects,
} from './collections/projects';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: 'users',
    components: {
      graphics: {
        Logo: '@/components/payload/Logo#Logo',
        Icon: '@/components/payload/Icon#Icon',
      },
    },
  },
  // Avoid clashing with the existing /api/* email endpoints (get-a-quote, contact-us).
  routes: { api: '/payload-api' },
  collections: [
    Users,
    Media,
    CoreDrillingProjects,
    SlabCuttingProjects,
    SmallDemolitionProjects,
    WallSawCuttingProjects,
  ],
  editor: lexicalEditor(),
  // Required in Payload v3 for upload image processing (formatOptions/imageSizes).
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      // Upload straight from the browser to R2 via a presigned URL. Vercel
      // functions reject request bodies over 4.5 MB, so routing phone photos
      // (often 5-10 MB) through the server fails with "request too large".
      // Requires a CORS rule on the R2 bucket allowing PUT from the site
      // origins. NOTE: the plugin does NOT store the sharp-converted WebP for
      // client uploads (only the raw browser-uploaded file lands in R2) — the
      // Media collection's afterChange hook stores it; see Media.ts.
      clientUploads: true,
      collections: {
        // When S3_PUBLIC_URL is set (the R2 bucket's public domain, e.g.
        // https://pub-xxxx.r2.dev or a custom domain), media URLs point
        // straight at R2 and the browser downloads files directly. This
        // avoids proxying every image through /payload-api/media/file/*,
        // which is slower and logs an AbortError whenever the browser
        // cancels an in-flight image (navigation, lazy-load, etc.).
        // Without the env var it falls back to serving through Payload's
        // media route (no public bucket URL needed).
        media: process.env.S3_PUBLIC_URL
          ? {
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename }) =>
                `${process.env.S3_PUBLIC_URL}/${encodeURIComponent(filename)}`,
            }
          : true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION, // 'auto' for R2
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true, // required for R2
      },
    }),
  ],
});
