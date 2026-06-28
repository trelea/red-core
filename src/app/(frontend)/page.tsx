import type { Metadata } from 'next';
import AboutUs from '@/components/about-us';
import Feedbacks from '@/components/feedbacks';
import Hero from '@/components/hero';
import OurServices from '@/components/our-services';
import WhyChooseUs from '@/components/why-choose-us';
import Offers from '@/components/offers';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <WhyChooseUs />
      <AboutUs />
      <Offers />
      <Feedbacks />
    </>
  );
}
