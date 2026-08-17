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
  title: 'Concrete Restoration Services in Agawam & Springfield MA',
  description:
    'Professional concrete restoration in Agawam, Springfield, and Western Massachusetts. Repair, resurfacing, and refinishing of cracked, chipped, and worn concrete steps, walkways, floors, and patios.',
  alternates: {
    canonical: `${siteUrl}/concrete-restoration`,
  },
  openGraph: {
    title: 'Concrete Restoration Services | Red Core',
    description:
      'Repair, resurfacing, and refinishing of cracked, chipped, and worn concrete. Serving Agawam, Springfield, and Western MA.',
    url: `${siteUrl}/concrete-restoration`,
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Concrete Restoration',
  description:
    'Repair, resurfacing, and refinishing of cracked, chipped, and worn concrete. Restores steps, walkways, floors, and patios without full replacement.',
  provider: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#business` },
  areaServed: 'Agawam, Springfield, Western Massachusetts',
  url: `${siteUrl}/concrete-restoration`,
};

const faqItems: FaqItem[] = [
  {
    question: 'Can cracked or chipped concrete be repaired instead of replaced?',
    icon: <Hammer />,
    answer:
      'In most cases, yes. Surface cracks, spalling, chipped step edges, and worn patches can be repaired and resurfaced at a fraction of the cost of tearing out and repouring. We recommend replacement only when the slab is structurally failing.',
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
      'Properly prepared and bonded repairs last for years. We address the cause of the damage — drainage, movement, or surface wear — not just the symptom, so the restored concrete holds up.',
  },
  {
    question: 'Do you restore both indoor and outdoor concrete?',
    icon: <Sun />,
    answer:
      'Yes. We restore exterior steps, walkways, driveways, and patios as well as interior floors in basements, garages, and commercial spaces. Dust-controlled grinding keeps interior work clean.',
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
          </>
        }
        description={
          <>
            <p>
              For safe, smooth, and professionally restored concrete steps.
            </p>
            <p className="mt-3">
              We repair cracks, chips, worn edges, and damaged surfaces, then
              grind, polish, and seal the concrete for a clean, durable finish.
            </p>
            <p className="mt-3">
              For homeowners, contractors, builders, local businesses, and
              property managers.
            </p>
          </>
        }
        image={{
          src: '/concrete-restoration-img.jpg',
          alt: 'Restored concrete entrance steps with exposed-aggregate treads',
        }}
        imageStyle="photo"
        render_buttons={false}
      />
      <OurProjects projects={projects} />
      {/* <FaqSection items={faqItems} /> */}
      <OurServices />
    </>
  );
}
