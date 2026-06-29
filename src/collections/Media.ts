import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  // Public read so the <img> requests to /payload-api/media/file/* are served
  // to anonymous visitors. Mutations still require an authenticated admin user.
  access: { read: () => true },
  lockDocuments: false, // avoid the admin `disabled` hydration mismatch
  // File storage handled by the s3Storage plugin (R2). Every uploaded image is
  // converted to optimized WebP before it is stored, so the frontend only ever
  // serves small files. Payload runs this through `sharp` and updates the
  // filename (.webp), mimeType, and size automatically.
  upload: {
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
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
