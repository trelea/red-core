import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  title: 'Slab Cutting Services in Agawam & Springfield MA',
  description:
    'Professional concrete slab cutting services in Agawam, Springfield, and Western Massachusetts. Cutting concrete slabs and floors for plumbing repairs, drain replacement, and basement modifications.',
  alternates: {
    canonical: `${siteUrl}/slab-cutting`,
  },
  openGraph: {
    title: 'Slab Cutting Services | Red Core',
    description:
      'Cutting concrete slabs and floors to access underground pipes or utilities. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/slab-cutting`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Slab Cutting',
  description:
    'Cutting concrete slabs and floors to access underground pipes or utilities. Ideal for plumbing repairs, drain replacement, and basement modifications.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/slab-cutting`,
};

export default function SlabCuttingPage() {
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
            <span className="font-bold">Slab</span>
            <br />
            <span className="font-bold">cutting</span>
          </>
        }
        description={
          <>
            <p>
              Cutting concrete slabs and floors to access underground pipes or
              utilities. Ideal for{' '}
              <strong>plumbing repairs, drain replacement</strong>, and{' '}
              <strong>basement modifications</strong>.
            </p>
            <p className="mt-6">
              <strong>Includes:</strong> trench cutting, pipe access openings,
              and floor removal sections.
            </p>
          </>
        }
        image={{
          src: '/slab-cutting-img.png',
          alt: 'Slab cutting with walk-behind concrete saw',
        }}
      />
      <ProjectGallery
        images={[
          { src: '/slab-cutting-assets/image 9.png', alt: 'Slab cutting with walk-behind concrete saw' },
          { src: '/slab-cutting-assets/image 10.png', alt: 'Slab cutting with walk-behind concrete saw' },
          { src: '/slab-cutting-assets/image 11.png', alt: 'Slab cutting with walk-behind concrete saw' },
          { src: '/slab-cutting-assets/image 12.png', alt: 'Slab cutting with walk-behind concrete saw' },
          { src: '/slab-cutting-assets/image 13.png', alt: 'Slab cutting with walk-behind concrete saw' },
        ]}
      />
      <GetAQuote />
    </>
  );
}
