import type { Metadata } from 'next';
import AboutUs from '@/components/about-us';
import Feedbacks from '@/components/feedbacks';
import Hero from '@/components/hero';
import OurServices from '@/components/our-services';
import WhyChooseUs from '@/components/why-choose-us';
import Offers from '@/components/offers';
import FaqSection, { type FaqItem } from '@/components/faq-section';
import {
  Building2,
  Hammer,
  MapPin,
  Phone,
  Wrench,
} from 'lucide-react';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

const homeFaqItems: FaqItem[] = [
  {
    question:
      'What concrete cutting and core drilling services do you offer in Massachusetts?',
    icon: <Wrench />,
    answer:
      'REDCORE provides diamond core drilling (1" to 14"+ holes), concrete slab cutting and flat sawing, track wall saw cutting for doors and egress windows, controlled concrete demolition and removal, and concrete step and crack restoration for residential, commercial, and industrial projects.',
  },
  {
    question: 'What areas in Massachusetts and New England do you serve?',
    icon: <MapPin />,
    answer:
      'We are headquartered at 321 Springfield St in Agawam, MA and serve Springfield, West Springfield, Westfield, Chicopee, Holyoke, Northampton, Pittsfield, Worcester, Greater Boston, Lynnfield, and all of Massachusetts, as well as Connecticut, Rhode Island, New Hampshire, Vermont, and Maine. Call (413) 666-2026 or email redcoreusa@gmail.com for a free estimate.',
  },
  {
    question:
      'Can you cut concrete and drill cores indoors in occupied homes or commercial buildings?',
    icon: <Building2 />,
    answer:
      'Yes. We use electric and hydraulic concrete saws and wet-cutting methods indoors, producing zero exhaust fumes and keeping dust to an absolute minimum. We contain and clean up slurry so finished basements, occupied homes, and active commercial facilities stay clean.',
  },
  {
    question:
      'Do you handle concrete step removal, egress window openings, and HVAC pad cutting?',
    icon: <Hammer />,
    answer:
      'Yes. We regularly cut foundation walls for egress windows and basement doors, cut and trench concrete slabs for plumbing and HVAC pad installations, and perform selective concrete step removal, slab removal, and crack or step repair.',
  },
  {
    question:
      'How fast can I get a free estimate or schedule a concrete cutting job?',
    icon: <Phone />,
    answer:
      'Our phone line is open 24/7 at (413) 666-2026, or you can request a quote online anytime. We respond quickly with transparent, flat-rate or project-based pricing and flexible scheduling across Massachusetts and New England.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <WhyChooseUs />
      <AboutUs />
      <Offers />
      <FaqSection items={homeFaqItems} />
      <Feedbacks />
    </>
  );
}
