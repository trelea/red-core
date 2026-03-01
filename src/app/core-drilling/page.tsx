import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

export const metadata: Metadata = {
  title: 'Core Drilling',
  description:
    'Precision drilling of perfectly round holes in concrete, brick, and stone. Used for pipes, cables, ventilation, and utility lines.',
};

export default function CoreDrillingPage() {
  return (
    <>
      <Hero
        variant="background"
        title={
          <>
            <span className="font-bold">Core</span>
            <br />
            <span className="font-bold">drilling</span>
          </>
        }
        description={
          <>
            <p>
              Precision drilling of perfectly round holes in concrete, brick, and
              stone. Used for pipes, cables, ventilation, and utility lines.
            </p>
            <p className="mt-6">
              <strong>We drill for:</strong> plumbing lines, electrical
              conduits, HVAC openings, exhaust vents, and anchor holes.
            </p>
          </>
        }
        image={{
          src: '/core-drilling-img.png',
          alt: 'Core drilling into concrete wall',
        }}
      />
      <ProjectGallery
        images={[
          { src: '/core-drilling-assets/image 9.png', alt: 'Core drilling on site' },
          { src: '/core-drilling-assets/image 10.png', alt: 'Core drilling equipment in use' },
          { src: '/core-drilling-assets/image 11.png', alt: 'Core drilling project' },
          { src: '/core-drilling-assets/image 12.png', alt: 'Concrete core drilling work' },
          { src: '/core-drilling-assets/image 13.png', alt: 'Core drilling result' },
        ]}
      />
      <GetAQuote />
    </>
  );
}
