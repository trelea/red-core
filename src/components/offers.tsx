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
import ConcreteRestorationPromo from '@/components/offers/concrete-restoration-promo';

// To reorder the carousel, change each card's `order` value (lowest shows
// first). Filenames and alt text stay exactly as they are — only the numbers
// decide the display sequence.
type Offer = {
  alt: string;
  order: number;
} & (
  | {
      src: string;
      /** Optional dedicated image shown only on small screens (below md). */
      smSrc?: string;
    }
  | {
      /** Slide built in markup instead of a pre-rendered banner image. */
      content: React.ReactNode;
    }
);

const offers: Offer[] = [
  {
    content: <ConcreteRestorationPromo />,
    alt: 'Concrete step polishing — 25% off plus a free protective sealer',
    order: 6,
  },
  {
    src: '/offers/banner_1.png',
    alt: 'Concrete door or window opening — $1,000 flat rate',
    order: 1,
  },
  { src: '/offers/banner_2.png', alt: 'Core drilling offer', order: 4 },
  {
    src: '/offers/banner_3.png',
    alt: 'Concrete cutting offer',
    order: 2,
    smSrc: '/offers/banner_3_sm_screens.png',
  },
  { src: '/offers/banner_4.png', alt: 'Wall sawing offer', order: 3 },
  { src: '/offers/banner_5.png', alt: 'Slab cutting offer', order: 5 },
].sort((a, b) => a.order - b.order);

export default function Offers() {
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));
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
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
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
                  key={offer.alt}
                  className="basis-full md:basis-[72%]"
                >
                  {'content' in offer ? (
                    <div
                      role="img"
                      aria-label={offer.alt}
                      className="aspect-[3/2] w-full md:aspect-[2/1]"
                    >
                      {offer.content}
                    </div>
                  ) : offer.smSrc ? (
                    <>
                      {/* Small screens (below md): dedicated banner, same
                          aspect/height as the other slides. */}
                      <Image
                        src={offer.smSrc}
                        alt={offer.alt}
                        width={3098}
                        height={1751}
                        className="block aspect-[3/2] w-full object-cover object-right md:hidden"
                      />
                      {/* md+ : standard wide banner. */}
                      <Image
                        src={offer.src}
                        alt={offer.alt}
                        width={1740}
                        height={870}
                        className="hidden aspect-[2/1] w-full object-cover object-center md:block"
                      />
                    </>
                  ) : (
                    <Image
                      src={offer.src}
                      alt={offer.alt}
                      width={1740}
                      height={870}
                      priority={offer === offers[0]}
                      className="aspect-[3/2] w-full object-cover object-right md:aspect-[2/1] md:object-center"
                    />
                  )}
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
