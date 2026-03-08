import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  title: 'Hand Saw Cutting Services in Agawam & Springfield MA',
  description:
    'Professional hand saw cutting services in Agawam, Springfield, and Western Massachusetts. Compact precision cutting for tight or indoor areas, perfect for residential projects and small openings.',
  alternates: {
    canonical: `${siteUrl}/hand-saw-cutting`,
  },
  openGraph: {
    title: 'Hand Saw Cutting Services | Red Core',
    description:
      'Compact precision cutting for tight or indoor areas. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/hand-saw-cutting`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hand Saw Cutting',
  description:
    'Compact precision cutting for tight or indoor areas where large machines cannot fit. Perfect for residential projects and small openings.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/hand-saw-cutting`,
};

export default function HandSawCuttingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
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
