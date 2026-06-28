import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  lockDocuments: false, // avoid the admin `disabled` hydration mismatch
  admin: { useAsTitle: 'email' },
  fields: [],
};
