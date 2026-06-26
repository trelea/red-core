import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

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
          src: '/slab-cutting-img.svg',
          alt: 'Slab cutting with walk-behind concrete saw',
        }}
        render_desc={false}
        render_buttons={false}
      />
      <OurProjects
        projects={[
          {
            project_name: 'Slab Cutting',
            project_location: 'Pittsfield, MA',
            project_price: 3300,
            project_description:
              'Completed two concrete trenches for electrical cable installation, including saw cutting, concrete removal, and trench preparation for utility routing.',
            project_images: [
              {
                src: '/slab-cutting-assets/img1.png',
                alt: 'Saw cutting a concrete slab',
              },
              {
                src: '/slab-cutting-assets/img2.png',
                alt: 'Concrete trench cut for cable installation',
              },
            ],
          },
          {
            project_name: 'Slab Cutting',
            project_location: 'Holyoke, MA',
            project_price: 2500,
            project_description:
              'Concrete slab cutting for drain line installation. Trenches excavated approx. 2 ft deep. Debris removed from basement to exterior per client request. Clean, precise work completed and site left ready for plumbing installation.',
            cols_reversed: true,
            project_images: [
              {
                src: '/slab-cutting-assets/img3.png',
                alt: 'Slab cutting for a drain line trench',
              },
              {
                src: '/slab-cutting-assets/img4.png',
                alt: 'Excavated trench after slab cutting',
              },
            ],
          },
          {
            project_name: 'Slab Cutting',
            project_location: 'Springfield, MA',
            project_price: 1000,
            project_description:
              'Completed a concrete slab opening for underground utility/plumbing access. The work included precise saw cutting, concrete removal, and exposing the area below for the next stage of repair or installation.',
            project_images: [
              {
                src: '/slab-cutting-assets/img5.png',
                alt: 'Concrete slab opening for utility access',
              },
              {
                src: '/slab-cutting-assets/img6.png',
                alt: 'Exposed area below a cut concrete slab',
              },
            ],
          },
        ]}
      />
      <OurServices />
    </>
  );
}
