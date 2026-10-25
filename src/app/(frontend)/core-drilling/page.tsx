import type { Metadata } from 'next';
import Hero from '@/components/hero';
import OurServices from '@/components/our-services';
import { OurProjects } from '@/components/our-projects';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  ArrowDownToLine,
  Droplets,
  MapPin,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { getProjects } from '@/lib/projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

// Revalidate so CMS edits to projects appear without a redeploy (ISR).
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Core Drilling Services Across Massachusetts',
  description:
    'Core drilling across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
  keywords: [
    'core drilling',
    'core drilling services near me',
    'core drilling near me',
    'concrete core drilling',
    'concrete coring',
    'core drill',
    'concrete core drill',
    'core drilling company near me',
    'core drilling contractors',
    'concrete drilling Northampton',
    'core drilling Springfield MA',
    'core drilling Agawam MA',
    'core drilling Worcester MA',
    'core drilling Massachusetts',
  ],
  alternates: {
    canonical: `${siteUrl}/core-drilling`,
  },
  openGraph: {
    title: 'Core Drilling Services Across Massachusetts | REDCORE',
    description:
      'Core drilling across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    url: `${siteUrl}/core-drilling`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Core Drilling Services in Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Drilling Services in Springfield, Agawam & MA | REDCORE',
    description:
      'Core drilling across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    images: ['/opengraph-image'],
  },
};

const serviceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Core Drilling',
    serviceType: 'Concrete Core Drilling & Coring',
    description:
      'Precision diamond core drilling of perfectly round holes in concrete, brick, CMU block, and stone for pipes, cables, HVAC ventilation, and utility lines across Massachusetts.',
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
    areaServed: [
      'Agawam, MA',
      'Springfield, MA',
      'Northampton, MA',
      'Worcester, MA',
      'Boston, MA',
      'Massachusetts',
    ],
    url: `${siteUrl}/core-drilling`,
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
        name: 'Core Drilling',
        item: `${siteUrl}/core-drilling`,
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'What hole diameters can you core drill?',
    icon: <Ruler />,
    answer:
      'We drill perfectly round holes from about 1 inch up to 14 inches in diameter through concrete, brick, CMU block, and stone. Common sizes cover plumbing pipes, electrical conduit, HVAC vents, dryer vents, and anchor holes. If your project needs a size outside that range, call us at (413) 666-2026 or email redcoreusa@gmail.com and we will confirm what our rigs can handle.',
  },
  {
    question: 'Can you drill through reinforced concrete with rebar?',
    icon: <ShieldCheck />,
    answer:
      'Yes. Our diamond core bits cut cleanly through rebar and steel-reinforced concrete without cracking or spalling the surrounding material, so the hole edges stay smooth and structurally sound.',
  },
  {
    question: 'Is core drilling dusty or messy indoors?',
    icon: <Droplets />,
    answer:
      'No. We typically drill wet, which suppresses dust almost entirely, and we contain and clean up the slurry before we leave. That makes core drilling safe for finished basements, occupied homes, and operating commercial buildings.',
  },
  {
    question: 'How deep can you core drill?',
    icon: <ArrowDownToLine />,
    answer:
      'Standard core bits handle typical foundation and slab thicknesses, and barrel extensions let us drill through several feet of concrete when needed — for example through thick foundation walls or footings.',
  },
  {
    question: 'What areas do you serve for core drilling?',
    icon: <MapPin />,
    answer:
      'We serve all of Massachusetts (headquartered in Agawam, MA), including Springfield, West Springfield, Westfield, Chicopee, Holyoke, Northampton, Easthampton, Pittsfield, Worcester, and Greater Boston, plus northern Connecticut. Call 413-666-2026 for a free estimate.',
  },
];

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
            <span className="sr-only">
              {' '}
              Services Across Massachusetts
            </span>
          </>
        }
        description={
          <>
            <p>
              Accurate holes for utilities, pipes, vents, anchors, and
              structural openings.
            </p>
            <p className="mt-3">
              We provide clean diamond core drilling through concrete, CMU
              block, brick, and masonry walls or floors for residential,
              commercial, and industrial projects across Massachusetts (serving Agawam, Springfield, Worcester, and beyond).
            </p>
            <p className="mt-3">
              For contractors, plumbers, electricians, HVAC installers,
              builders, and property managers.
            </p>
          </>
        }
        image={{
          src: '/core-drilling-img.svg',
          alt: 'Diamond core drilling into concrete foundation wall in Massachusetts',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <FaqSection items={faqItems} />
      <OurServices />
    </>
  );
}
