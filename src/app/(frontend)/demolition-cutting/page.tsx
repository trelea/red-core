import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  Building2,
  Hammer,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
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

const faqItems: FaqItem[] = [
  {
    question: 'What kind of demolition work do you handle?',
    icon: <Hammer />,
    answer:
      'We specialize in selective, small-to-mid scale demolition: removing concrete walls and wall sections, steps, stoops, small slabs, patios, chimneys, and interior masonry — the precise removal work that large wrecking companies are not set up for.',
  },
  {
    question: 'Will demolition damage the surrounding structure?',
    icon: <ShieldCheck />,
    answer:
      'No. We use controlled methods — saw cutting the boundaries first, then breaking out only the section inside the cuts — so adjacent walls, slabs, and finishes stay untouched.',
  },
  {
    question: 'Do you haul away the debris?',
    icon: <Truck />,
    answer:
      'Yes. We break the removed concrete and masonry into manageable pieces and can haul the debris away, leaving the site clean and ready for the next phase of your project.',
  },
  {
    question: 'Do you work on both residential and commercial projects?',
    icon: <Building2 />,
    answer:
      'Yes. We handle everything from a homeowner removing old concrete steps to commercial renovations that need sections of slab or wall removed, across Agawam, Springfield, and Western Massachusetts.',
  },
  {
    question: 'How do I get a demolition quote?',
    icon: <Phone />,
    answer:
      'Call 413-666-2026 or use the quote form on this site. Describe what needs to be removed — photos help — and we will give you a free, transparent estimate. Our phone line is open 24/7.',
  },
];

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
      {/* <FaqSection items={faqItems} /> */}
      <OurServices />
    </>
  );
}
