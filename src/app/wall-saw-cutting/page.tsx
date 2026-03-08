import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  title: 'Wall Saw Cutting Services in Agawam & Springfield MA',
  description:
    'Professional wall saw cutting services in Agawam, Springfield, and Western Massachusetts. Heavy-duty cutting for doorways, windows, and large structural openings with straight, smooth edges.',
  alternates: {
    canonical: `${siteUrl}/wall-saw-cutting`,
  },
  openGraph: {
    title: 'Wall Saw Cutting Services | Red Core',
    description:
      'Heavy-duty cutting for doorways, windows, and large structural openings. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/wall-saw-cutting`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wall Saw Cutting',
  description:
    'Heavy-duty cutting for doorways, windows, and large structural openings. Provides straight, smooth edges with minimal vibration.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/wall-saw-cutting`,
};

export default function WallSawCuttingPage() {
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
            <span className="font-bold">Wall saw</span>
            <br />
            <span className="font-bold">cutting</span>
          </>
        }
        description={
          <>
            <p>
              Heavy-duty cutting for doorways, windows, and large structural
              openings. Provides straight, smooth edges with minimal vibration.
            </p>
            <p className="mt-6">
              <strong>Used for:</strong> door openings, window enlargements, wall
              removals, and structural modifications.
            </p>
          </>
        }
        image={{
          src: '/wall-saw-cutting.png',
          alt: 'Wall saw cutting concrete structure',
        }}
      />
      <ProjectGallery
        images={[
          { src: '/wall-saw-cutting-assets/image 9.png', alt: 'Wall saw cutting concrete structure' },
          { src: '/wall-saw-cutting-assets/image 10.png', alt: 'Wall saw cutting concrete structure' },
          { src: '/wall-saw-cutting-assets/image 11.png', alt: 'Wall saw cutting concrete structure' },
          { src: '/wall-saw-cutting-assets/image 12.png', alt: 'Wall saw cutting concrete structure' },
          { src: '/wall-saw-cutting-assets/image 13.png', alt: 'Wall saw cutting concrete structure' },
        ]}
      />
      <GetAQuote />
    </>
  );
}
