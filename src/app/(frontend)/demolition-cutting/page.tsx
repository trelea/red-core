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
  title: 'Demolition & Cutting Services in Agawam & Springfield MA',
  description:
    'Professional demolition and cutting services in Agawam, Springfield, and Western Massachusetts. Controlled removal of concrete sections without damaging surrounding structures for renovations and repairs.',
  alternates: {
    canonical: `${siteUrl}/demolition-cutting`,
  },
  openGraph: {
    title: 'Demolition & Cutting Services | Red Core',
    description:
      'Controlled removal of concrete sections without damaging surrounding structures. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/demolition-cutting`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Demolition & Cutting',
  description:
    'Controlled removal of concrete sections without damaging surrounding structures. Clean and safe process for renovations and repairs.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/demolition-cutting`,
};

export default async function DemolitionCuttingPage() {
  const projects = await getProjects('demolition-cutting-projects');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Hero
        title={
          <>
            <span className="font-bold">Demolition</span>
            <br />
            <span className="font-bold">&amp; cutting</span>
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
          src: '/demolition-cutting-img.svg',
          alt: 'Demolition and cutting of concrete structure',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <OurServices />
    </>
  );
}
