import type { Metadata } from 'next';
import Hero from '@/components/hero';
import { OurProjects } from '@/components/our-projects';
import OurServices from '@/components/our-services';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  Clock,
  Hammer,
  Layers,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import { getProjects } from '@/lib/projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

// Revalidate so CMS edits to projects appear without a redeploy (ISR).
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Concrete Restoration & Crack Repair Across Massachusetts',
  description:
    'Concrete restoration across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
  keywords: [
    'concrete restoration',
    'concrete restoration MA',
    'concrete restoration Massachusetts',
    'concrete crack repair',
    'concrete crack repair Lynnfield',
    'concrete repairs near me',
    'concrete repair near me',
    'concrete resurfacing near me',
    'concrete step repair',
    'concrete step polishing',
    'small concrete repairs',
    'concrete repair Springfield MA',
    'concrete restoration Agawam MA',
  ],
  alternates: {
    canonical: `${siteUrl}/concrete-restoration`,
  },
  openGraph: {
    title: 'Concrete Restoration & Crack Repair Across Massachusetts | REDCORE',
    description:
      'Concrete restoration across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    url: `${siteUrl}/concrete-restoration`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Concrete Restoration, Step & Crack Repair in Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Restoration & Crack Repair in Springfield & MA | REDCORE',
    description:
      'Concrete restoration across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    images: ['/opengraph-image'],
  },
};

const serviceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Concrete Restoration',
    serviceType: 'Concrete Restoration, Crack Repair & Resurfacing',
    description:
      'Repair, crack repair, resurfacing, and refinishing of cracked, chipped, and worn concrete. Restores steps, walkways, floors, and patios across Massachusetts without full replacement.',
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
    areaServed: [
      'Agawam, MA',
      'Springfield, MA',
      'Lynnfield, MA',
      'Boston, MA',
      'Massachusetts',
    ],
    url: `${siteUrl}/concrete-restoration`,
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
        name: 'Concrete Restoration',
        item: `${siteUrl}/concrete-restoration`,
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Can cracked or chipped concrete be repaired instead of replaced?',
    icon: <Hammer />,
    answer:
      'In most cases, yes. Surface cracks, spalling, chipped step edges, and worn patches can be repaired and resurfaced at a fraction of the cost of tearing out and repouring. We recommend replacement only when the slab is structurally failing. Call (413) 666-2026 or email redcoreusa@gmail.com for a free estimate.',
  },
  {
    question: 'What does concrete resurfacing involve?',
    icon: <Layers />,
    answer:
      'We grind the existing surface to remove loose material and open the pores, fill cracks and chips, then apply a bonded overlay that is finished to the texture and look you want — smooth, broomed, or exposed-aggregate.',
  },
  {
    question: 'How long until I can use the restored surface?',
    icon: <Clock />,
    answer:
      'Repaired areas typically take foot traffic within 24 hours and vehicle traffic after a few days, depending on the product and weather. We give you exact cure times before we start.',
  },
  {
    question: 'Will the repair last, or will the cracks come back?',
    icon: <ShieldCheck />,
    answer:
      'Properly prepared and bonded concrete crack repairs last for years. We address the cause of the damage — drainage, movement, or surface wear — not just the symptom, so the restored concrete holds up through New England winters.',
  },
  {
    question: 'Do you restore both indoor and outdoor concrete in Massachusetts?',
    icon: <Sun />,
    answer:
      'Yes. We restore exterior steps, walkways, driveways, and patios as well as interior floors in basements, garages, and commercial spaces across all of Massachusetts (including Agawam, Springfield, and Lynnfield). Dust-controlled grinding keeps interior work clean.',
  },
];

export default async function ConcreteRestorationPage() {
  const projects = await getProjects('concrete-restoration-projects');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Hero
        title={
          <>
            <span className="font-bold">Concrete</span>
            <br />
            <span className="font-bold">restoration</span>
            <span className="sr-only">
              {' '}
              and Concrete Crack &amp; Step Repair Across Massachusetts
            </span>
          </>
        }
        description={
          <>
            <p>
              For safe, smooth, and professionally restored concrete steps,
              walkways, patios, and floors.
            </p>
            <p className="mt-3">
              We perform concrete crack repair, fix chips, spalling, and worn
              edges, and grind, resurface, polish, and seal concrete for a
              clean, durable finish across Massachusetts (serving Agawam, Springfield, and beyond).
            </p>
            <p className="mt-3">
              For homeowners, contractors, builders, local businesses, and
              property managers.
            </p>
          </>
        }
        image={{
          src: '/concrete-restoration-img.jpg',
          alt: 'Restored concrete entrance steps and crack repair in Massachusetts',
        }}
        imageStyle="photo"
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <FaqSection items={faqItems} />
      <OurServices />
    </>
  );
}
