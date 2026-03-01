import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

export const metadata: Metadata = {
  title: 'Small Demolition',
  description:
    'Controlled removal of concrete sections without damaging surrounding structures. Clean and safe process for renovations and repairs.',
};

export default function SmallDemolitionPage() {
  return (
    <>
      <Hero
        variant="background"
        title={
          <>
            <span className="font-bold">Small</span>
            <br />
            <span className="font-bold">demolition</span>
          </>
        }
        description={
          <>
            <p>
              Controlled removal of concrete sections without damaging
              surrounding structures. Clean and safe process for renovations and
              repairs.
            </p>
            <p className="mt-6">
              <strong>Includes:</strong> concrete breaking, section removal,
              surface demolition, and debris cleanup options.
            </p>
          </>
        }
        image={{
          src: '/small-demolition-img.png',
          alt: 'Small demolition of concrete structure',
        }}
      />
      <ProjectGallery
        images={[
          { src: '/small-demolition-assets/image 9.png', alt: 'Small demolition of concrete structure' },
          { src: '/small-demolition-assets/image 10.png', alt: 'Small demolition of concrete structure' },
          { src: '/small-demolition-assets/image 11.png', alt: 'Small demolition of concrete structure' },
          { src: '/small-demolition-assets/image 12.png', alt: 'Small demolition of concrete structure' },
          { src: '/small-demolition-assets/image 13.png', alt: 'Small demolition of concrete structure' },
        ]}
      />
      <GetAQuote />
    </>
  );
}
