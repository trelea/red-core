import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  // Public read so the <img> requests to /payload-api/media/file/* are served
  // to anonymous visitors. Mutations still require an authenticated admin user.
  access: { read: () => true },
  lockDocuments: false, // avoid the admin `disabled` hydration mismatch
  upload: true, // file storage handled by the s3Storage plugin (R2)
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
