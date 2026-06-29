'use client';

/**
 * Our Projects Component
 * Displays a list of projects with name, location, price, description and images.
 * Built from shadcn/ui primitives (Badge, Card, Button).
 */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { cn } from '@/lib/utils';
import { inter, urbanist, microgramma } from '@/lib/fonts';

interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  /** Rendered as the heading and the "Service" pill label. */
  project_title: string;
  project_location: string;
  project_price: number;
  project_description: string;
  /** 1 or more images. 2+ renders a slider (2 per view, advance by one). */
  project_images: ProjectImage[];
}

interface OurProjectsProps {
  projects: Project[];
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const detailPillClass =
  'w-full justify-center gap-2 rounded-[74px] bg-[#e2e2e2] px-[30px] py-3 text-[15px] font-normal uppercase leading-none tracking-normal text-[#1E2C32]';

function ProjectImageCell({
  image,
  className,
}: {
  image: ProjectImage;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative h-[320px] overflow-hidden sm:h-[400px] lg:h-auto lg:min-h-[460px]',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Image area for a project. A single image fills the whole side; 2+ images
 * become a slider showing 2 at a time, advancing one image per arrow, with
 * smaller indicator dots below (mirrors the Offers section).
 */
function ProjectImagesCarousel({ images }: { images: ProjectImage[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    // @ts-ignore
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

  // A single image (or none) fills the entire image side — no slider chrome.
  if (images.length <= 1) {
    return images[0] ? <ProjectImageCell image={images[0]} /> : null;
  }

  return (
    // Images keep their full height; the dots sit in the strip below them. The
    // row uses items-start (see ProjectRow), so this taller column does not
    // stretch the details card alongside it.
    <div>
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', slidesToScroll: 1, containScroll: 'trimSnaps' }}
      >
        <CarouselContent className="-ml-5">
          {images.map((image, i) => (
            <CarouselItem key={`${image.src}-${i}`} className="basis-1/2 pl-5">
              <ProjectImageCell image={image} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            'left-3 size-10 rounded-none border-0 bg-white/40 text-[#1E2C32] shadow-sm backdrop-blur-sm transition-colors hover:bg-white/60',
            selected === 0 && 'hidden',
          )}
        />
        <CarouselNext
          className={cn(
            'right-3 size-10 rounded-none border-0 bg-white/40 text-[#1E2C32] shadow-sm backdrop-blur-sm transition-colors hover:bg-white/60',
            selected >= count - 1 && 'hidden',
          )}
        />
      </Carousel>

      {/* dots — one per scroll position (snap), not per image. The slider shows
          2 images per view and advances one at a time, so there are
          images.length - 1 snaps (this is `count` from scrollSnapList, the same
          value the arrows use). Only worth showing when there's more than one. */}
      {count > 1 && (
        <div className="mt-3 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f0f0] px-2.5 py-1.5 sm:gap-2 sm:px-3 sm:py-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === selected}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  'size-1.5 rounded-full transition-colors sm:size-2',
                  i === selected
                    ? 'bg-black/75'
                    : 'bg-[#c9c9c9] hover:bg-[#a0a0a0]',
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  // Alternate the layout by position: odd rows (2nd, 4th, …) flip so the
  // details card sits on the left and the images on the right.
  const reversed = index % 2 === 1;

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
      {/* image side: single image fills the area, 2+ become a slider */}
      <ProjectImagesCarousel images={project.project_images} />

      {/* right side content card (moves to the left on alternating rows). The
          min-h keeps it the original height (it no longer stretches to the image
          column, which can be taller when slider dots are shown). */}
      <Card
        className={cn(
          'gap-0 rounded-none border-0 bg-[#f5f5f5] py-0 shadow-none lg:min-h-[460px]',
          reversed && 'lg:order-first',
        )}
      >
        <CardContent className="flex flex-col gap-6 px-6 py-8 sm:px-8">
          <h3
            className={cn(
              microgramma.variable,
              'text-[24px] font-bold uppercase leading-[1.1] tracking-[0] text-[#141414] [font-family:var(--font-microgramma),sans-serif] sm:text-[30.64px] sm:leading-[33px]',
            )}
          >
            {project.project_title}
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {/* description */}
            <p
              className={cn(
                urbanist.className,
                'text-[15px] font-normal leading-[1.4] tracking-[0.02em] text-black/90 sm:text-[18px] sm:leading-[25.2px]',
              )}
            >
              {project.project_description}
            </p>

            {/* service / location / price */}
            <ul className={cn(inter.className, 'flex flex-col gap-4')}>
              <li className="flex flex-col gap-2">
                <span className="text-[16px] font-normal leading-none tracking-normal text-[#1E2C32]">
                  Service:
                </span>
                <Badge
                  variant="secondary"
                  className={cn(inter.className, detailPillClass)}
                >
                  {project.project_title}
                </Badge>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-[16px] font-normal leading-none tracking-normal text-[#1E2C32]">
                  Location:
                </span>
                <Badge
                  variant="secondary"
                  className={cn(inter.className, detailPillClass)}
                >
                  {project.project_location}
                </Badge>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-[16px] font-normal leading-none tracking-normal text-[#1E2C32]">
                  Total price:
                </span>
                <Badge
                  className={cn(
                    inter.className,
                    'w-1/2 justify-center gap-2 rounded-[74px] bg-[#C70017] px-[30px] py-3 text-[15px] font-bold text-white',
                  )}
                >
                  <span>
                    {priceFormatter
                      .formatToParts(project.project_price)
                      .map((part, idx) =>
                        part.type === 'currency' ? (
                          <span key={idx} className="text-[#14AD00]">
                            {part.value}
                          </span>
                        ) : (
                          part.value
                        ),
                      )}
                  </span>
                </Badge>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function OurProjects({ projects }: OurProjectsProps) {
  const { openQuote } = useQuoteDialog();

  return (
    <section
      id="projects"
      className={cn(microgramma.variable, 'bg-white py-12 sm:py-16 lg:py-20')}
    >
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        {/* head text */}
        <Badge
          variant="secondary"
          className="rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black"
        >
          Our Projects
        </Badge>

        {/* projects */}
        <div className="mt-8 flex flex-col gap-[50px] sm:mt-10">
          {projects.map((project, i) => (
            <ProjectRow
              key={`${project.project_title}-${i}`}
              project={project}
              index={i}
            />
          ))}
        </div>

        {/* start your project button */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <Button
            type="button"
            onClick={openQuote}
            className="h-auto rounded-full bg-[#C70017] px-10 py-4 text-[13px] font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#a80014] lg:text-sm"
          >
            Start your project
          </Button>
        </div>
      </div>
    </section>
  );
}
