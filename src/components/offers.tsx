'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const offers = [
  {
    src: '/offers/banner_1.png',
    alt: 'Concrete door or window opening — $1,000 flat rate',
  },
  { src: '/offers/banner_2.png', alt: 'Core drilling offer' },
  { src: '/offers/banner_3.png', alt: 'Concrete cutting offer' },
  { src: '/offers/banner_4.png', alt: 'Wall sawing offer' },
  { src: '/offers/banner_5.png', alt: 'Slab cutting offer' },
];

export default function Offers() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(offers.length);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on('select', onSelect);
    api.on('reInit', () => {
      setCount(api.scrollSnapList().length);
      onSelect();
    });
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section
      id="offers"
      className="overflow-x-clip bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        {/* head left side top */}
        <span className="inline-flex items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
          Our Offers
        </span>

        {/* carousel with 5 images + dots below */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Carousel
            setApi={setApi}
            opts={{ loop: false, align: 'start' }}
            plugins={[autoplay.current]}
            className="w-full md:w-[calc(50%+50vw)]"
          >
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem
                  key={offer.src}
                  className="basis-full md:basis-[72%]"
                >
                  <Image
                    src={offer.src}
                    alt={offer.alt}
                    width={1740}
                    height={870}
                    priority={offer.src === offers[0].src}
                    className="aspect-[3/2] w-full object-cover object-right md:aspect-[2/1] md:object-center"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className={cn(
                'left-4 size-11 rounded-none border-0 bg-white/40 text-[#1E2C32] shadow-sm backdrop-blur-sm transition-colors hover:bg-white/60 lg:left-6',
                selected === 0 && 'hidden',
              )}
            />
            <CarouselNext
              className={cn(
                'right-4 size-11 rounded-none border-0 bg-white/40 text-[#1E2C32] shadow-sm backdrop-blur-sm transition-colors hover:bg-white/60 lg:right-6',
                selected >= count - 1 && 'hidden',
              )}
            />
          </Carousel>

          {/* dots */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0f0f0] px-3 py-2 sm:gap-2.5 sm:px-3.5 sm:py-2.5">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selected}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    'size-2 rounded-full transition-colors sm:size-3',
                    i === selected
                      ? 'bg-black/75'
                      : 'bg-[#c9c9c9] hover:bg-[#a0a0a0]',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
