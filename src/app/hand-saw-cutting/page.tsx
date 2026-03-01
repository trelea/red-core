import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

export const metadata: Metadata = {
  title: 'Hand Saw Cutting',
  description:
    'Compact precision cutting for tight or indoor areas where large machines cannot fit. Perfect for residential projects and small openings.',
};

export default function HandSawCuttingPage() {
  return (
    <>
      <Hero
        variant="background"
        title={
          <>
            <span className="font-bold">Hand saw</span>
            <br />
            <span className="font-bold">cutting</span>
          </>
        }
        description={
          <>
            <p>
              Compact precision cutting for tight or indoor areas where large
              machines cannot fit. Perfect for residential projects and small
              openings.
            </p>
            <p className="mt-6">
              <strong>Includes:</strong> small wall cuts, corner cuts, interior
              openings, and detail work.
            </p>
          </>
        }
        image={{
          src: '/hand-saw-cutting-img.png',
          alt: 'Hand saw cutting concrete wall',
        }}
      />
      <ProjectGallery
        images={[
          { src: '/hand-saw-cutting-assets/image 9.png', alt: 'Hand saw cutting concrete wall' },
          { src: '/hand-saw-cutting-assets/image 10.png', alt: 'Hand saw cutting concrete wall' },
          { src: '/hand-saw-cutting-assets/image 11.png', alt: 'Hand saw cutting concrete wall' },
          { src: '/hand-saw-cutting-assets/image 12.png', alt: 'Hand saw cutting concrete wall' },
          { src: '/hand-saw-cutting-assets/image 13.png', alt: 'Hand saw cutting concrete wall' },
        ]}
      />
      <GetAQuote />
    </>
  );
}
