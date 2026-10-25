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
  title: 'Concrete Slab & Asphalt Cutting Across Massachusetts',
  description:
    'Slab cutting across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
  keywords: [
    'slab cutting',
    'concrete slab cutting',
    'asphalt cutting',
    'asphalt saw cutting',
    'concrete & asphalt cutting',
    'asphalt slab cutting',
    'asphalt trenching',
    'concrete saw cutting',
    'concrete slab',
    'concrete slab removal Massachusetts',
    'concrete saw cutting near me',
    'concrete cutting for plumbing',
    'trench cutting concrete',
    'flat sawing MA',
    'HVAC concrete pad installation',
    'slab cutting Springfield MA',
    'slab cutting Agawam MA',
  ],
  alternates: {
    canonical: `${siteUrl}/slab-cutting`,
  },
  openGraph: {
    title: 'Concrete Slab & Asphalt Cutting Across Massachusetts | REDCORE',
    description:
      'Slab cutting across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    url: `${siteUrl}/slab-cutting`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Slab Cutting & Flat Sawing in Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Slab & Asphalt Cutting in Springfield, Agawam & MA | REDCORE',
    description:
      'Slab cutting across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
    images: ['/opengraph-image'],
  },
};

const serviceJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Slab / Asphalt Cutting',
    serviceType: 'Concrete Slab Cutting, Asphalt Saw Cutting & Flat Sawing',
    description:
      'Cutting concrete slabs and asphalt surfaces to access underground pipes or utilities. Ideal for plumbing repairs, drain replacement, HVAC pads, basement modifications, and asphalt driveway or parking lot modifications across Massachusetts.',
    provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
    areaServed: [
      'Agawam, MA',
      'Springfield, MA',
      'Holyoke, MA',
      'Pittsfield, MA',
      'Boston, MA',
      'Massachusetts',
    ],
    url: `${siteUrl}/slab-cutting`,
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
        name: 'Slab / Asphalt Cutting',
        item: `${siteUrl}/slab-cutting`,
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'How deep can you cut a concrete slab or asphalt surface?',
    icon: <ArrowDownToLine />,
    answer:
      'Our walk-behind and hand saws cut through typical residential and commercial slabs — usually 4 to 8 inches thick — and can reach deeper when a project calls for it, such as thickened footings or industrial floors. For asphalt, we cut through standard pavement depths with the same precision.',
  },
  {
    question: 'Can you cut a slab or asphalt inside a basement or occupied building?',
    icon: <Home />,
    answer:
      'Yes. We use electric saws and wet-cutting indoors, so there are no exhaust fumes and very little dust. This is the standard approach for basement bathroom rough-ins, drain repairs, and interior remodels in occupied homes and businesses.',
  },
  {
    question: 'When is slab or asphalt cutting needed?',
    icon: <Wrench />,
    answer:
      'The most common jobs are trenching for new plumbing or drain lines, repairing broken sewer pipes under a floor, adding a basement bathroom, cutting HVAC concrete pad openings or utility access trenches, removing damaged sections of a concrete slab in Springfield and Agawam, and cutting asphalt for driveway repairs, utility access, or parking lot modifications. Call (413) 666-2026 or email redcoreusa@gmail.com for a free quote.',
  },
  {
    question: 'Do you remove the cut concrete or asphalt afterwards?',
    icon: <Truck />,
    answer:
      'Yes. Alongside concrete saw cutting, we offer concrete slab removal and controlled demolition — breaking out and hauling away the cut concrete or asphalt sections so the trench or opening is ready for the next trade.',
  },
  {
    question: 'Will cutting crack or damage the rest of the slab or asphalt?',
    icon: <ShieldCheck />,
    answer:
      'No. Diamond saw cutting produces straight, clean edges with controlled depth, so the surrounding slab or asphalt stays intact — unlike jackhammering, which can crack concrete well beyond the work area.',
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
            <span className="font-bold">Slab / Asphalt</span>
            <br />
            <span className="font-bold">cutting</span>
            <span className="sr-only">
              {' '}
              &amp; Concrete Saw Cutting Across Massachusetts
            </span>
          </>
        }
        description={
          <>
            <p>
              For clean openings, trenches, and utility access in concrete
              slabs and asphalt surfaces.
            </p>
            <p className="mt-3">
              We saw cut concrete floors and slabs, and asphalt for electrical
              lines, plumbing trenches, drainage, HVAC pads, slab removal,
              interior remodeling, driveway and parking lot repairs, and
              commercial build-outs across Massachusetts (serving Agawam, Springfield, and beyond).
            </p>
            <p className="mt-3">
              For homeowners, contractors, builders, electricians, plumbers, and
              property managers.
            </p>
          </>
        }
        image={{
          src: '/slab-cutting-img.svg',
          alt: 'Concrete slab cutting with walk-behind diamond saw in Massachusetts',
        }}
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      <FaqSection items={faqItems} />
      <OurServices />
    </>
  );
}
