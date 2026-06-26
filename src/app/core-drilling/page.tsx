import type { Metadata } from 'next';
import Hero from '@/components/hero';
import OurServices from '@/components/our-services';
import { OurProjects } from '@/components/our-projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

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
        title={
          <>
            <span className="font-bold">Core</span>
            <br />
            <span className="font-bold">drilling</span>
          </>
        }
        image={{
          src: '/core-drilling-img.svg',
          alt: 'Core drilling into concrete wall',
        }}
        render_desc={false}
        render_buttons={false}
      />
      <OurProjects
        projects={[
          {
            project_name: 'Core Drilling',
            project_location: 'Worcester, MA',
            project_price: 1800,
            project_description:
              'Performed core drilling of 16 holes in a 15-story apartment building, including one hole on each floor. Drilled 2” diameter openings through CMU/concrete walls for contractor utility and installation work.',
            project_images: [
              {
                src: '/core-drilling-assets/img1.png',
                alt: 'Core drilling into concrete wall',
              },
              {
                src: '/core-drilling-assets/img2.png',
                alt: 'Core drilled opening through concrete',
              },
            ],
          },
          {
            project_name: 'Core Drilling',
            project_location: 'Agawam',
            project_price: 750,
            project_description:
              'We completed one 6-inch core drilling hole through the concrete foundation wall for pipe/utility access. The hole was drilled from the exterior side using professional core drilling equipment. Work was completed cleanly, accurately, and safely, with cleanup after drilling.',
            cols_reversed: true,
            project_images: [
              {
                src: '/core-drilling-assets/img3.png',
                alt: 'Core drilling a concrete foundation wall',
              },
              {
                src: '/core-drilling-assets/img4.png',
                alt: 'Core drilled hole through concrete foundation',
              },
            ],
          },
          {
            project_name: 'Core Drilling',
            project_location: 'Easthampton, MA',
            project_price: 800,
            project_description:
              'Drilled two precise holes in the fireplace for the client. Clean, accurate core drilling performed with minimal dust, leaving the area ready for installation.',
            project_images: [
              {
                src: '/core-drilling-assets/img5.png',
                alt: 'Core drilling a fireplace',
              },
              {
                src: '/core-drilling-assets/img6.png',
                alt: 'Precise core drilled holes in a fireplace',
              },
            ],
          },
        ]}
      />
      <OurServices />
    </>
  );
}
