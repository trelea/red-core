import AboutUs from "@/components/about-us";
import Feedbacks from "@/components/feedbacks";
import GetAQuote from "@/components/get-a-quote";
import Hero from "@/components/hero";
import OurServices from "@/components/our-services";
import WhyChooseUs from "@/components/why-choose-us";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <OurServices />
      <GetAQuote />
      <Feedbacks />
    </>
  );
}
