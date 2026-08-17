import type { CollectionConfig, Field } from 'payload';

// Defined once so all 4 service-page project collections look the same.
const projectFields: Field[] = [
  {
    name: 'project_title',
    label: 'Project Title',
    type: 'text',
    required: true,
    admin: {
      description: 'Shown as the project heading and in the "Service" badge.',
    },
  },
  {
    name: 'project_location',
    label: 'Location',
    type: 'text',
    required: true,
  },
  {
    name: 'project_price',
    label: 'Price (USD)',
    type: 'number',
    required: true,
  },
  {
    name: 'project_description',
    label: 'Description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'project_images',
    label: 'Images',
    type: 'array',
    required: true,
    minRows: 1,
    labels: { singular: 'Image', plural: 'Images' },
    admin: {
      description:
        'Add one or more images for this project (2+ enables a slider).',
    },
    fields: [
      // each row references one uploaded image in the Media collection (R2)
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
    ],
  },
];

const makeProjectsCollection = (
  slug: string,
  label: string,
  dbName?: string,
): CollectionConfig => ({
  slug,
  ...(dbName ? { dbName } : {}),
  labels: { singular: `${label} Project`, plural: `${label} Projects` },
  // Off to avoid the admin SSR/client `disabled` hydration mismatch on a
  // single-admin CMS (locking toggles every field's disabled state).
  lockDocuments: false,
  admin: { useAsTitle: 'project_title', group: 'Projects' },
  fields: projectFields,
});

export const CoreDrillingProjects = makeProjectsCollection(
  'core-drilling-projects',
  'Core Drilling',
);
export const SlabCuttingProjects = makeProjectsCollection(
  'slab-cutting-projects',
  'Slab Cutting',
);
// dbName keeps the original table so projects created before the rename survive.
export const DemolitionCuttingProjects = makeProjectsCollection(
  'demolition-cutting-projects',
  'Demolition & Cutting',
  'small_demolition_projects',
);
export const WallSawCuttingProjects = makeProjectsCollection(
  'wall-saw-cutting-projects',
  'Wall Saw Cutting',
);
export const ConcreteRestorationProjects = makeProjectsCollection(
  'concrete-restoration-projects',
  'Concrete Restoration',
);
