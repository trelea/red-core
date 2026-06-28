import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '@payload-config';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, '../public');

type SeedImage = { file: string; alt: string };
type SeedProject = {
  project_title: string;
  project_location: string;
  project_price: number;
  project_description: string;
  cols_reversed?: boolean;
  project_images: SeedImage[];
};

// One entry per project collection — mirrors the previously hardcoded arrays.
const data: Record<string, SeedProject[]> = {
  'core-drilling-projects': [
    {
      project_title: 'Core Drilling',
      project_location: 'Worcester, MA',
      project_price: 1800,
      project_description:
        'Performed core drilling of 16 holes in a 15-story apartment building, including one hole on each floor. Drilled 2” diameter openings through CMU/concrete walls for contractor utility and installation work.',
      project_images: [
        { file: 'core-drilling-assets/img1.png', alt: 'Core drilling into concrete wall' },
        { file: 'core-drilling-assets/img2.png', alt: 'Core drilled opening through concrete' },
      ],
    },
    {
      project_title: 'Core Drilling',
      project_location: 'Agawam',
      project_price: 750,
      project_description:
        'We completed one 6-inch core drilling hole through the concrete foundation wall for pipe/utility access. The hole was drilled from the exterior side using professional core drilling equipment. Work was completed cleanly, accurately, and safely, with cleanup after drilling.',
      cols_reversed: true,
      project_images: [
        { file: 'core-drilling-assets/img3.png', alt: 'Core drilling a concrete foundation wall' },
        { file: 'core-drilling-assets/img4.png', alt: 'Core drilled hole through concrete foundation' },
      ],
    },
    {
      project_title: 'Core Drilling',
      project_location: 'Easthampton, MA',
      project_price: 800,
      project_description:
        'Drilled two precise holes in the fireplace for the client. Clean, accurate core drilling performed with minimal dust, leaving the area ready for installation.',
      project_images: [
        { file: 'core-drilling-assets/img5.png', alt: 'Core drilling a fireplace' },
        { file: 'core-drilling-assets/img6.png', alt: 'Precise core drilled holes in a fireplace' },
      ],
    },
  ],
  'slab-cutting-projects': [
    {
      project_title: 'Slab Cutting',
      project_location: 'Pittsfield, MA',
      project_price: 3300,
      project_description:
        'Completed two concrete trenches for electrical cable installation, including saw cutting, concrete removal, and trench preparation for utility routing.',
      project_images: [
        { file: 'slab-cutting-assets/img1.png', alt: 'Saw cutting a concrete slab' },
        { file: 'slab-cutting-assets/img2.png', alt: 'Concrete trench cut for cable installation' },
      ],
    },
    {
      project_title: 'Slab Cutting',
      project_location: 'Holyoke, MA',
      project_price: 2500,
      project_description:
        'Concrete slab cutting for drain line installation. Trenches excavated approx. 2 ft deep. Debris removed from basement to exterior per client request. Clean, precise work completed and site left ready for plumbing installation.',
      cols_reversed: true,
      project_images: [
        { file: 'slab-cutting-assets/img3.png', alt: 'Slab cutting for a drain line trench' },
        { file: 'slab-cutting-assets/img4.png', alt: 'Excavated trench after slab cutting' },
      ],
    },
    {
      project_title: 'Slab Cutting',
      project_location: 'Springfield, MA',
      project_price: 1000,
      project_description:
        'Completed a concrete slab opening for underground utility/plumbing access. The work included precise saw cutting, concrete removal, and exposing the area below for the next stage of repair or installation.',
      project_images: [
        { file: 'slab-cutting-assets/img5.png', alt: 'Concrete slab opening for utility access' },
        { file: 'slab-cutting-assets/img6.png', alt: 'Exposed area below a cut concrete slab' },
      ],
    },
  ],
  'small-demolition-projects': [
    {
      project_title: 'Small Demolition',
      project_location: 'East Taunton, MA',
      project_price: 2500,
      project_description:
        'Work completed at Hood through our contractor: expanded existing concrete block door opening to 90” wide and 11’ high, followed by saw cutting, block removal, and manual debris removal due to limited interior access.',
      project_images: [
        { file: 'small-demolition-assets/img1.png', alt: 'Saw cutting a concrete block door opening' },
        { file: 'small-demolition-assets/img2.png', alt: 'Debris removal after small demolition' },
      ],
    },
  ],
  'wall-saw-cutting-projects': [
    {
      project_title: 'Wall Saw Cutting',
      project_location: 'Enfield, CT',
      project_price: 750,
      project_description:
        'Performed precise concrete foundation corner cutting for structural framing access and future opening prep. Controlled saw cutting minimized vibration and maintained clean edges while keeping the structure properly supported during construction work.',
      project_images: [
        { file: 'wall-saw-cutting-assets/img1.png', alt: 'Wall saw cutting a concrete foundation corner' },
        { file: 'wall-saw-cutting-assets/img2.png', alt: 'Concrete opening prepped after saw cutting' },
      ],
    },
    {
      project_title: 'Wall Saw Cutting',
      project_location: 'Agawam, MA',
      project_price: 1000,
      project_description:
        'Completed a 40”x40” door opening in a concrete wall for a partner concrete company. Precise cutting with clean edges, ready for installation.',
      cols_reversed: true,
      project_images: [
        { file: 'wall-saw-cutting-assets/img3.png', alt: 'Wall saw cutting a door opening in concrete' },
        { file: 'wall-saw-cutting-assets/img4.png', alt: 'Finished concrete door opening' },
      ],
    },
    {
      project_title: 'Wall Saw Cutting',
      project_location: 'Northampton, MA',
      project_price: 1000,
      project_description:
        'We completed a 7 ft × 3 ft door opening cut through an 8-inch-thick concrete foundation wall in Northampton, Massachusetts. The work included accurate layout, professional wall sawing, and clean preparation of the opening for the next step of installation.',
      project_images: [
        { file: 'wall-saw-cutting-assets/img5.png', alt: 'Door opening cut through a concrete foundation wall' },
        { file: 'wall-saw-cutting-assets/img6.png', alt: 'Prepared concrete door opening exterior' },
      ],
    },
  ],
};

// Top-level await: `payload run` only awaits the module's evaluation, so the work
// must happen here (not in a fire-and-forget callback).
const payload = await getPayload({ config });

const slugs = Object.keys(data);

// Clear existing data so the seed is repeatable.
for (const slug of slugs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await payload.delete({ collection: slug as any, where: { id: { exists: true } } });
}
await payload.delete({ collection: 'media', where: { id: { exists: true } } });

for (const slug of slugs) {
  for (const p of data[slug]) {
    const project_images: { image: number }[] = [];
    for (const img of p.project_images) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: img.alt },
        filePath: path.join(publicDir, img.file),
      });
      project_images.push({ image: media.id });
    }

    await payload.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: slug as any,
      data: {
        project_title: p.project_title,
        project_location: p.project_location,
        project_price: p.project_price,
        project_description: p.project_description,
        cols_reversed: p.cols_reversed ?? false,
        project_images,
      },
    });
    payload.logger.info(`Seeded ${slug} — ${p.project_location}`);
  }
}

payload.logger.info('Seed complete');
