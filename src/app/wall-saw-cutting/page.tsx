import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

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
              <strong>Used for:</strong> door openings, window enlargements,
              wall removals, and structural modifications.
            </p>
          </>
        }
        image={{
          src: '/wall-saw-cutting.svg',
          alt: 'Wall saw cutting concrete structure',
        }}
        render_desc={false}
        render_buttons={false}
      />
      <OurProjects
        projects={[
          {
            project_name: 'Wall Saw Cutting',
            project_service: 'Concrete Cutting',
            project_location: 'Enfield, CT',
            project_price: 750,
            project_description:
              'Performed precise concrete foundation corner cutting for structural framing access and future opening prep. Controlled saw cutting minimized vibration and maintained clean edges while keeping the structure properly supported during construction work.',
            project_images: [
              {
                src: '/wall-saw-cutting-assets/img1.png',
                alt: 'Wall saw cutting a concrete foundation corner',
              },
              {
                src: '/wall-saw-cutting-assets/img2.png',
                alt: 'Concrete opening prepped after saw cutting',
              },
            ],
          },
          {
            project_name: 'Wall Saw Cutting',
            project_service: 'Concrete Cutting',
            project_location: 'Agawam, MA',
            project_price: 1000,
            project_description:
              'Completed a 40”x40” door opening in a concrete wall for a partner concrete company. Precise cutting with clean edges, ready for installation.',
            cols_reversed: true,
            project_images: [
              {
                src: '/wall-saw-cutting-assets/img3.png',
                alt: 'Wall saw cutting a door opening in concrete',
              },
              {
                src: '/wall-saw-cutting-assets/img4.png',
                alt: 'Finished concrete door opening',
              },
            ],
          },
          {
            project_name: 'Wall Saw Cutting',
            project_service: 'Concrete Cutting',
            project_location: 'Northampton, MA',
            project_price: 1000,
            project_description:
              'We completed a 7 ft × 3 ft door opening cut through an 8-inch-thick concrete foundation wall in Northampton, Massachusetts. The work included accurate layout, professional wall sawing, and clean preparation of the opening for the next step of installation.',
            project_images: [
              {
                src: '/wall-saw-cutting-assets/img5.png',
                alt: 'Door opening cut through a concrete foundation wall',
              },
              {
                src: '/wall-saw-cutting-assets/img6.png',
                alt: 'Prepared concrete door opening exterior',
              },
            ],
          },
        ]}
      />
      <OurServices />
    </>
  );
}
