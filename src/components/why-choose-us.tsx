import {
  BadgeCheckIcon,
  BadgeDollarSignIcon,
  Clock4Icon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: BadgeCheckIcon,
    title: 'Quality is\nour priority',
    description:
      'Our experience, professional-grade equipment and proven techniques.',
  },
  {
    icon: BadgeDollarSignIcon,
    title: 'Best price\nin our area',
    description: (
      <>
        We focus on <span className="font-bold">long-term relationships</span>,
        which is why we keep our prices reasonable and transparent.
      </>
    ),
  },
  {
    icon: Clock4Icon,
    title: 'Always\navailable',
    description: (
      <>
        Our phone line is open <span className="font-bold">24 hours</span> a
        day, <span className="font-bold">7 days</span> a week.
      </>
    ),
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety-First\nOperations',
    description:
      'We perform every job with strict safety practices to protect people, property, and the job site at all times',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-[120px]">
        <h2 className="mb-10 text-[24px] font-bold text-[#1E2C32]">
          Why choose us?
        </h2>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-24">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-0 bg-transparent shadow-none"
            >
              <CardHeader className="flex flex-col items-center gap-6 p-0">
                <div className="flex size-[48px] items-center justify-center rounded-sm bg-[#C70017] shadow-md">
                  <feature.icon className="size-5 text-white" />
                </div>
                <CardTitle className="whitespace-pre-line text-center text-[24px] font-bold leading-[1.2] text-[#1E2C32]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <p className="text-center text-[14px] leading-[1.4] text-[#1E2C32]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
