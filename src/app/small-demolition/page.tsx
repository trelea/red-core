import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

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
          src: '/small-demolition-img.svg',
          alt: 'Small demolition of concrete structure',
        }}
        render_desc={false}
        render_buttons={false}
      />
      <OurProjects
        projects={[
          {
            project_name: 'Small Demolition',
            project_location: 'East Taunton, MA',
            project_price: 2500,
            project_description:
              'Work completed at Hood through our contractor: expanded existing concrete block door opening to 90” wide and 11’ high, followed by saw cutting, block removal, and manual debris removal due to limited interior access.',
            project_images: [
              {
                src: '/small-demolition-assets/img1.png',
                alt: 'Saw cutting a concrete block door opening',
              },
              {
                src: '/small-demolition-assets/img2.png',
                alt: 'Debris removal after small demolition',
              },
            ],
          },
        ]}
      />
      <OurServices />
    </>
  );
}
