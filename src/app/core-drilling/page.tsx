import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';
import ProjectGallery from '@/components/project-gallery';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  title: 'Core Drilling Services in Agawam & Springfield MA',
  description:
    'Professional core drilling services in Agawam, Springfield, and Western Massachusetts. Precision drilling of perfectly round holes in concrete, brick, and stone for pipes, cables, ventilation, and utility lines.',
  alternates: {
    canonical: `${siteUrl}/core-drilling`,
  },
  openGraph: {
    title: 'Core Drilling Services | Red Core',
    description:
      'Precision drilling of perfectly round holes in concrete, brick, and stone. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/core-drilling`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Core Drilling',
  description:
    'Precision drilling of perfectly round holes in concrete, brick, and stone. Used for pipes, cables, ventilation, and utility lines.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/core-drilling`,
};

export default function CoreDrillingPage() {
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
