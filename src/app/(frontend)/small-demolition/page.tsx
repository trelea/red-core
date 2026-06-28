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

export default async function SmallDemolitionPage() {
  const projects = await getProjects('small-demolition-projects');
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
              Controlled demolition for concrete, block, brick, and interior
              structures.
            </p>
            <p className="mt-3">
              We remove walls, openings, damaged concrete sections, small slabs,
              steps, and masonry areas safely and cleanly.
            </p>
            <p className="mt-3">
              For homeowners, contractors, property managers, remodelers, and
              commercial projects.
            </p>
          </>
        }
        image={{
          src: '/small-demolition-img.svg',
          alt: 'Small demolition of concrete structure',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <OurServices />
    </>
  );
}
