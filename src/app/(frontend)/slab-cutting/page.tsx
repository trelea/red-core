import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';
import { getProjects } from '@/lib/projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

// Revalidate so CMS edits to projects appear without a redeploy (ISR).
export const revalidate = 60;

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

export default async function SlabCuttingPage() {
  const projects = await getProjects('slab-cutting-projects');
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
              For clean openings, trenches, and utility access in concrete
              slabs.
            </p>
            <p className="mt-3">
              We cut concrete floors for electrical lines, plumbing, drainage,
              HVAC, interior remodeling, and commercial build-outs.
            </p>
            <p className="mt-3">
              For homeowners, contractors, builders, electricians, plumbers, and
              property managers.
            </p>
          </>
        }
        image={{
          src: '/slab-cutting-img.svg',
          alt: 'Slab cutting with walk-behind concrete saw',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <OurServices />
    </>
  );
}
