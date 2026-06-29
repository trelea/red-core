import type { CollectionConfig } from 'payload';

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
    // Cap the longest edge at 2048px (no upscaling of already-smaller images).
    resizeOptions: {
      width: 2048,
      height: 2048,
      fit: 'inside',
      withoutEnlargement: true,
    },
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
