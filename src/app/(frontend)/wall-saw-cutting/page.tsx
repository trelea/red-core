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

export default async function WallSawCuttingPage() {
  const projects = await getProjects('wall-saw-cutting-projects');
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
              Precise vertical cutting for concrete walls, foundations, and
              structural openings.
            </p>
            <p className="mt-3">
              We cut clean openings for doors, windows, access points, vents,
              utilities, and remodeling work with controlled saw cutting and
              minimal vibration.
            </p>
            <p className="mt-3">
              For contractors, builders, homeowners, engineers, and commercial
              projects.
            </p>
          </>
        }
        image={{
          src: '/wall-saw-cutting.svg',
          alt: 'Wall saw cutting concrete structure',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <OurServices />
    </>
  );
}
