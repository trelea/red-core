'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import FeedbackCard from '@/components/feedback-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const feedbacks = [
  {
    name: 'Kelly G.',
    feedback:
      'Would highly recommend. Great service and value.\n\nTheir communication was amazing and I\u2019m very grateful they were willing to help me out. Thank you!',
  },
  {
    name: 'Mark T.',
    feedback:
      'Excellent work on our basement project. The team was professional, on time, and left the site spotless.\n\nWill definitely use again!',
  },
  {
    name: 'Sarah L.',
    feedback:
      'Fast response and great pricing. They handled our commercial project with care and precision.\n\nHighly recommend to anyone needing concrete services.',
  },
  {
    name: 'James R.',
    feedback:
      'Top-notch core drilling service. Clean cuts, no mess, and very reasonable rates.\n\nThe crew was friendly and knew exactly what they were doing.',
  },
  {
    name: 'Anna P.',
    feedback:
      'Called on short notice and they showed up the next day. Professional from start to finish.\n\nGreat communication throughout the entire process.',
  },
  {
    name: 'David M.',
    feedback:
      'Best concrete cutting service in the area. Fair pricing and outstanding quality.\n\nThey went above and beyond to make sure we were satisfied.',
  },
];

export default function Feedbacks() {
  const autoplayPlugin = useRef(Autoplay({ delay: 5000 }));

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] xl:px-[160px]">
        <h2 className="mb-10 text-[20px] font-bold text-[#1E2C32] sm:text-[24px]">
          Feedbacks:
        </h2>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {feedbacks.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
              >
                <FeedbackCard name={item.name} feedback={item.feedback} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-y-0 size-10 border-0 bg-transparent text-[#1E2C32] shadow-none hover:bg-transparent hover:text-[#C70017] sm:size-14 [&_svg]:size-7 [&_svg]:stroke-[3.5] sm:[&_svg]:size-11" />
            <CarouselNext className="static translate-y-0 size-10 border-0 bg-transparent text-[#1E2C32] shadow-none hover:bg-transparent hover:text-[#C70017] sm:size-14 [&_svg]:size-7 [&_svg]:stroke-[3.5] sm:[&_svg]:size-11" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
