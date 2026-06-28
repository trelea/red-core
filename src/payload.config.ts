import path from 'path';
import { fileURLToPath } from 'url';
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
      collections: {
        // served through Payload's media route (no public bucket URL needed)
        media: true,
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
