import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  ArrowDownToLine,
  Home,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
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

const faqItems: FaqItem[] = [
  {
    question: 'How deep can you cut a concrete slab?',
    icon: <ArrowDownToLine />,
    answer:
      'Our walk-behind and hand saws cut through typical residential and commercial slabs — usually 4 to 8 inches thick — and can reach deeper when a project calls for it, such as thickened footings or industrial floors.',
  },
  {
    question: 'Can you cut a slab inside a basement or occupied building?',
    icon: <Home />,
    answer:
      'Yes. We use electric saws and wet-cutting indoors, so there are no exhaust fumes and very little dust. This is the standard approach for basement bathroom rough-ins, drain repairs, and interior remodels in occupied homes and businesses.',
  },
  {
    question: 'When is slab cutting needed?',
    icon: <Wrench />,
    answer:
      'The most common jobs are trenching for new plumbing or drain lines, repairing broken sewer pipes under a floor, adding a basement bathroom, cutting utility access openings, and removing damaged sections of a slab before repouring.',
  },
  {
    question: 'Do you remove the cut concrete afterwards?',
    icon: <Truck />,
    answer:
      'Yes. Alongside cutting, we offer controlled demolition and can break out and remove the cut concrete sections, leaving the area ready for the next trade.',
  },
  {
    question: 'Will cutting crack or damage the rest of the slab?',
    icon: <ShieldCheck />,
    answer:
      'No. Diamond saw cutting produces straight, clean edges with controlled depth, so the surrounding slab stays intact — unlike jackhammering, which can crack concrete well beyond the work area.',
  },
];

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
      {/* <FaqSection items={faqItems} /> */}
      <OurServices />
    </>
  );
}
