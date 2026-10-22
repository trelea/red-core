import { getPayload } from 'payload';
import config from '@payload-config';
import type { Project } from '@/components/our-projects';
import type { Media } from '@/payload-types';

export type ProjectCollectionSlug =
  | 'core-drilling-projects'
  | 'slab-cutting-projects'
  | 'demolition-cutting-projects'
  | 'wall-saw-cutting-projects'
  | 'concrete-restoration-projects';

/**
 * Fetches a service page's projects from Payload and maps them to the shape the
 * `OurProjects` component expects ({ ..., project_images: { src, alt }[] }).
 * Sorted by creation date, newest first, so the latest projects render at the
 * top of the list.
 */
export async function getProjects(
  slug: ProjectCollectionSlug,
): Promise<Project[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: slug,
    limit: 100,
    depth: 2, // populate the media upload relationship
    sort: '-createdAt',
  });

  return docs.map((d) => {
    const images = d.project_images ?? [];
    const total = images.length;

    return {
      project_title: d.project_title,
      project_location: d.project_location,
      project_price: d.project_price,
      project_description: d.project_description,
      project_images: images.map((pi, index) => {
        const img = pi.image as Media;
        const mediaAlt = img?.alt?.trim();

        let alt = mediaAlt;
        if (!alt) {
          const base = `${d.project_title} — ${d.project_location}`;
          const description = d.project_description?.trim();
          const firstSentence = description
            ? description.split(/[.!?]\s/)[0].trim()
            : '';
          const photoSuffix = total > 1 ? ` (photo ${index + 1} of ${total})` : '';
          const candidate = firstSentence
            ? `${base}: ${firstSentence}${photoSuffix}`
            : `${base}${photoSuffix}`;
          alt = candidate.length > 125 ? `${base}${photoSuffix}` : candidate;
        }

        return { src: img?.url ?? '', alt };
      }),
    };
  });
}
