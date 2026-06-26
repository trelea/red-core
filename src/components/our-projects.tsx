'use client';

/**
 * Our Projects Component
 * Displays a list of projects with name, location, price, description and images.
 * Built from shadcn/ui primitives (Badge, Card, Button).
 */
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { cn } from '@/lib/utils';
import { inter, urbanist, orbitron } from '@/lib/fonts';

interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  project_name: string;
  /** Text for the "Service" pill. Defaults to project_name when omitted. */
  project_service?: string;
  project_location: string;
  project_price: number;
  project_description: string;
  /** 2 images required */
  project_images: ProjectImage[];
  /** When true the details card sits on the left and the images on the right. Default false. */
  cols_reversed?: boolean;
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

function ProjectImageCell({ image }: { image: ProjectImage }) {
  return (
    <div className="relative h-[320px] overflow-hidden sm:h-[400px] lg:h-auto lg:min-h-[460px]">
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

function ProjectRow({ project }: { project: Project }) {
  const reversed = project.cols_reversed ?? false;
  const [first, second] = project.project_images;

  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
      {/* left side: 2 images */}
      <div className="grid grid-cols-2 gap-5">
        {first && <ProjectImageCell image={first} />}
        {second && <ProjectImageCell image={second} />}
      </div>

      {/* right side content card (moves to the left when reversed) */}
      <Card
        className={cn(
          'gap-0 rounded-none border-0 bg-[#f5f5f5] py-0 shadow-none',
          reversed && 'lg:order-first',
        )}
      >
        <CardContent className="flex flex-col gap-6 px-6 py-8 sm:px-8">
          <h3
            className={cn(
              orbitron.variable,
              'text-[24px] font-bold uppercase leading-[1.1] tracking-[0] text-[#141414] [font-family:var(--font-orbitron),sans-serif] sm:text-[30.64px] sm:leading-[33px]',
            )}
          >
            {project.project_name}
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
                  {project.project_service ?? project.project_name}
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
      className={cn(orbitron.variable, 'bg-white py-12 sm:py-16 lg:py-20')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
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
              key={`${project.project_name}-${i}`}
              project={project}
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
