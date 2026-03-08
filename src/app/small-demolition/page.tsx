import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  title: 'Small Demolition Services in Agawam & Springfield MA',
  description:
    'Professional small demolition services in Agawam, Springfield, and Western Massachusetts. Controlled removal of concrete sections without damaging surrounding structures for renovations and repairs.',
  alternates: {
    canonical: `${siteUrl}/small-demolition`,
  },
  openGraph: {
    title: 'Small Demolition Services | Red Core',
    description:
      'Controlled removal of concrete sections without damaging surrounding structures. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/small-demolition`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Small Demolition',
  description:
    'Controlled removal of concrete sections without damaging surrounding structures. Clean and safe process for renovations and repairs.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/small-demolition`,
};

export default function SmallDemolitionPage() {
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
