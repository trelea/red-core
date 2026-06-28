import type { Metadata } from 'next';
import Hero from '@/components/hero';
import OurServices from '@/components/our-services';
import { OurProjects } from '@/components/our-projects';
import { getProjects } from '@/lib/projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

// Revalidate so CMS edits to projects appear without a redeploy (ISR).
export const revalidate = 60;

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

export default async function CoreDrillingPage() {
  const projects = await getProjects('core-drilling-projects');
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
        description={
          <>
            <p>
              Accurate holes for utilities, pipes, vents, anchors, and
              structural openings.
            </p>
            <p className="mt-3">
              We provide clean core drilling through concrete, CMU block, brick,
              and masonry walls or floors for residential, commercial, and
              industrial projects.
            </p>
            <p className="mt-3">
              For contractors, plumbers, electricians, HVAC installers,
              builders, and property managers.
            </p>
          </>
        }
        image={{
          src: '/core-drilling-img.svg',
          alt: 'Core drilling into concrete wall',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <OurServices />
    </>
  );
}
