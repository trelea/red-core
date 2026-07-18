import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  Building2,
  DoorOpen,
  Ruler,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
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

const faqItems: FaqItem[] = [
  {
    question: 'Can you cut a doorway or window opening in a concrete wall?',
    icon: <DoorOpen />,
    answer:
      'Yes — this is our most common wall sawing job. We cut precise door, window, and access openings in poured concrete and foundation walls with straight, smooth edges that are ready for framing.',
  },
  {
    question: 'How thick a wall can you cut?',
    icon: <Ruler />,
    answer:
      'Track-mounted wall saws cut through standard 8–12 inch foundation walls with ease and can handle much thicker structural walls, including heavily reinforced concrete with rebar.',
  },
  {
    question: 'Is it safe to cut an opening in a load-bearing wall?',
    icon: <ShieldCheck />,
    answer:
      'Yes, when done correctly. For structural openings we work to the specifications set by your engineer or contractor, and the wall saw itself cuts with minimal vibration so the surrounding structure is not stressed or cracked.',
  },
  {
    question: 'Can wall sawing be done inside a finished or occupied building?',
    icon: <Building2 />,
    answer:
      'Yes. Our saws are electric or hydraulic — no engine exhaust — and wet cutting keeps dust to a minimum, so we routinely cut in finished basements, occupied commercial buildings, and active job sites.',
  },
  {
    question: 'What is the difference between wall sawing and demolition?',
    icon: <Scissors />,
    answer:
      'Wall sawing removes exactly the section you need with clean, straight edges, while general demolition breaks material out less precisely. When a project needs both, we cut the opening first and then remove the cut section as part of our demolition service.',
  },
];

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
      {/* <FaqSection items={faqItems} /> */}
      <OurServices />
    </>
  );
}
