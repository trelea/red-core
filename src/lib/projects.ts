import { getPayload } from 'payload';
import config from '@payload-config';
import type { Project } from '@/components/our-projects';
import type { Media } from '@/payload-types';

export type ProjectCollectionSlug =
  | 'core-drilling-projects'
  | 'slab-cutting-projects'
  | 'small-demolition-projects'
  | 'wall-saw-cutting-projects';

/**
 * Fetches a service page's projects from Payload and maps them to the shape the
 * `OurProjects` component expects ({ ..., project_images: { src, alt }[] }).
 * Sorted by id so the admin's insertion order (and the alternating layout) is
 * preserved.
 */
export async function getProjects(
  slug: ProjectCollectionSlug,
): Promise<Project[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: slug,
    limit: 100,
    depth: 2, // populate the media upload relationship
    sort: 'id',
  });

  return docs.map((d) => ({
    project_title: d.project_title,
    project_location: d.project_location,
    project_price: d.project_price,
    project_description: d.project_description,
    cols_reversed: d.cols_reversed ?? false,
    project_images: (d.project_images ?? []).map((pi) => {
      const img = pi.image as Media;
      return { src: img?.url ?? '', alt: img?.alt ?? '' };
    }),
  }));
}
