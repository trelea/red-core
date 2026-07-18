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

const faqItems: FaqItem[] = [
  {
    question: 'What hole diameters can you core drill?',
    icon: <Ruler />,
    answer:
      'We drill perfectly round holes from about 1 inch up to 14 inches in diameter through concrete, brick, CMU block, and stone. Common sizes cover plumbing pipes, electrical conduit, HVAC vents, dryer vents, and anchor holes. If your project needs a size outside that range, call us and we will confirm what our rigs can handle.',
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
      'We are based in Agawam, MA and serve Springfield, West Springfield, Westfield, Chicopee, Holyoke, and the rest of Western Massachusetts, as well as nearby northern Connecticut. Call 413-666-2026 for a free estimate.',
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
      {/* <FaqSection items={faqItems} /> */}
      <OurServices />
    </>
  );
}
