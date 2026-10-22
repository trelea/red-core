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
  title: 'Wall Saw Cutting, Door & Egress Openings in MA',
  description:
    'Precision track wall saw cutting in Agawam, Springfield, West Springfield, Northampton & across Massachusetts. Clean reinforced concrete foundation cuts for egress windows, doorways, structural openings & wall removal.',
  keywords: [
    'wall saw cutting',
    'wall saw',
    'egress window cutting',
    'concrete door opening',
    'concrete window opening',
    'wall removal services in West Springfield',
    'foundation wall cutting MA',
    'structural concrete openings',
    'wall sawing Massachusetts',
    'wall saw cutting Springfield MA',
    'wall saw cutting Agawam MA',
  ],
  alternates: {
    canonical: `${siteUrl}/wall-saw-cutting`,
  },
  openGraph: {
    title: 'Wall Saw Cutting, Door & Egress Openings in MA | REDCORE',
    description:
      'Heavy-duty concrete wall sawing for doorways, egress windows, and large structural openings across Agawam, Springfield, and Massachusetts.',
    url: `${siteUrl}/wall-saw-cutting`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Wall Saw Cutting & Egress Window Openings in MA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wall Saw Cutting, Door & Egress Openings in MA | REDCORE',
    description:
      'Precision concrete wall saw cutting for doorways, egress windows, and structural openings across Massachusetts.',
    images: ['/opengraph-image'],
  },
};

const serviceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Wall Saw Cutting',
    serviceType: 'Concrete Wall Sawing, Door & Egress Window Cutting',
    description:
      'Heavy-duty track wall saw cutting for doorways, egress windows, and large structural openings in poured concrete and foundation walls across Massachusetts.',
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
    areaServed: [
      'Agawam, MA',
      'Springfield, MA',
      'West Springfield, MA',
      'Northampton, MA',
      'Enfield, CT',
      'Boston, MA',
      'Massachusetts',
    ],
    url: `${siteUrl}/wall-saw-cutting`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Wall Saw Cutting',
        item: `${siteUrl}/wall-saw-cutting`,
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Can you cut a doorway or egress window opening in a concrete wall?',
    icon: <DoorOpen />,
    answer:
      'Yes — doorway and egress window cutting is our most common wall sawing job. We cut precise basement door, egress window, and utility access openings in poured concrete and foundation walls with straight, smooth edges that are ready for framing.',
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
      'Yes, when done correctly. For structural openings and wall removal services in Agawam, Springfield, West Springfield, and across Massachusetts, we work to the specifications set by your engineer or contractor, and the wall saw cuts with minimal vibration so the surrounding structure is not stressed or cracked.',
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
      'Wall sawing removes exactly the section you need with clean, straight edges, while general demolition breaks material out less precisely. When a project needs both, we cut the opening first and then remove the cut section as part of our demolition service. Call (413) 666-2026 or email redcoreusa@gmail.com for a free estimate.',
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
            <span className="sr-only">
              {' '}
              for Concrete Door &amp; Egress Window Openings in Massachusetts
            </span>
          </>
        }
        description={
          <>
            <p>
              Precise vertical cutting for concrete walls, foundations, and
              structural openings.
            </p>
            <p className="mt-3">
              We cut clean openings for doors, egress windows, access points,
              vents, utilities, and wall removal with controlled saw cutting and
              minimal vibration across Agawam, Springfield, West Springfield,
              Northampton, and Massachusetts.
            </p>
            <p className="mt-3">
              For contractors, builders, homeowners, engineers, and commercial
              projects.
            </p>
          </>
        }
        image={{
          src: '/wall-saw-cutting.svg',
          alt: 'Track wall saw cutting concrete foundation doorway and egress window in MA',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <FaqSection items={faqItems} />
      <OurServices />
    </>
  );
}
