import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: '/icons/Quality is our priority icon.svg',
    title: 'Quality is\nour priority',
    description:
      'Our experience, professional-grade equipment and proven techniques.',
  },
  {
    icon: '/icons/Best price in our area icon.svg',
    title: 'Best price\nin our area',
    description: (
      <>
        We focus on <span className="font-bold">long-term relationships</span>,
        which is why we keep our prices reasonable and transparent.
      </>
    ),
  },
  {
    icon: '/icons/Always available icon.svg',
    title: 'Always\navailable',
    description: (
      <>
        Our phone line is open <span className="font-bold">24 hours</span> a
        day, <span className="font-bold">7 days</span> a week.
      </>
    ),
  },
  {
    icon: '/icons/Safety First Operations icon.svg',
    title: 'Safety-First\nOperations',
    description:
      'We perform every job with strict safety practices to protect people, property, and the job site at all times',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="rounded-[24px] bg-[#f3f3f3] py-8 sm:rounded-[32px] sm:py-10 lg:rounded-[45px] lg:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
          <span className="inline-flex items-center rounded-full bg-[#e7e7e7] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
            Why choose us?
          </span>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col gap-0 rounded-none border-0 bg-[#e1e1e1] p-7 shadow-none sm:p-10 lg:p-[55px]"
              >
                <div className="flex flex-row items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={70}
                    height={70}
                    className="size-16 shrink-0 lg:size-[70px]"
                  />
                  <CardTitle className="whitespace-pre-line text-[20px] font-bold leading-[1.15] text-[#1E2C32] sm:mt-7 sm:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px]">
                    {feature.title}
                  </CardTitle>
                </div>
                <CardDescription className="mt-4 text-[15px] leading-[1.55] text-[#5b5b5b] sm:mt-5 sm:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[17px]">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
