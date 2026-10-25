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
  title: 'Concrete Demolition & Removal Across Massachusetts',
  description:
    'Demolition across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
  keywords: [
    'concrete demolition',
    'concrete removal Springfield',
    'concrete demolition contractor',
    'demolition contractor',
    'concrete removal',
    'concrete removal near me',
    'concrete step removal near me',
    'concrete slab removal Massachusetts',
    'concrete demolition Massachusetts',
    'demolition services Western Massachusetts',
    'demolition contractors near me',
    'small structure demolition',
  ],
  alternates: {
    canonical: `${siteUrl}/demolition-cutting`,
  },
  openGraph: {
    title: 'Concrete Demolition & Removal Across Massachusetts | REDCORE',
    description:
      'Demolition across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    url: `${siteUrl}/demolition-cutting`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Controlled Demolition & Concrete Removal in Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Demolition & Removal in Springfield & MA | REDCORE',
    description:
      'Demolition across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    images: ['/opengraph-image'],
  },
};

const serviceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Demolition & Cutting',
    serviceType: 'Controlled Concrete Demolition & Removal',
    description:
      'Controlled removal of concrete sections, steps, slabs, and walls without damaging surrounding structures. Clean and safe process for renovations and repairs across Massachusetts.',
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
    areaServed: [
      'Agawam, MA',
      'Springfield, MA',
      'West Springfield, MA',
      'Lynnfield, MA',
      'East Taunton, MA',
      'Boston, MA',
      'Massachusetts',
    ],
    url: `${siteUrl}/demolition-cutting`,
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
        name: 'Demolition & Cutting',
        item: `${siteUrl}/demolition-cutting`,
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'What kind of demolition work do you handle?',
    icon: <Hammer />,
    answer:
      'We specialize in selective, small-to-mid scale concrete demolition and concrete removal: removing concrete walls and wall sections, concrete steps and stoops, small slabs, patios, chimneys, and interior masonry — the precise removal work that large wrecking companies are not set up for. Call (413) 666-2026 or email redcoreusa@gmail.com for a free estimate.',
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
      'Yes. We handle everything from a homeowner needing concrete step removal or slab removal in Springfield and Agawam to commercial renovations requiring wall and floor sections removed across Western Massachusetts, Lynnfield, and Greater Boston.',
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
            <span className="sr-only">
              {' '}
              and Concrete Removal Across Massachusetts
            </span>
          </>
        }
        description={
          <>
            <p>
              Controlled demolition and concrete removal for concrete, block,
              brick, and interior structures.
            </p>
            <p className="mt-3">
              We remove walls, openings, damaged concrete sections, slabs,
              concrete steps, stoops, and masonry areas safely and cleanly across Massachusetts (serving Springfield, Agawam, and beyond).
            </p>
            <p className="mt-3">
              For homeowners, contractors, property managers, remodelers, and
              commercial projects.
            </p>
          </>
        }
        image={{
          src: '/demolition-cutting-img.svg',
          alt: 'Controlled concrete demolition and concrete removal in Springfield MA',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <FaqSection items={faqItems} />
      <OurServices />
    </>
  );
}
