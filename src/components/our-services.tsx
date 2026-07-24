import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inter, microgramma } from '@/lib/fonts';

const services = [
  {
    icon: '/icons/Core-Drilling-icon.png',
    title: 'Core Drilling',
    href: '/core-drilling',
    description:
      'Precision holes for plumbing, electrical, HVAC, and structural openings.',
  },
  {
    icon: '/icons/Slab-Cutting-icon.png',
    title: 'Slab Cutting',
    href: '/slab-cutting',
    description:
      'Clean concrete slab cutting for trenches, openings, and utility access.',
  },
  {
    icon: '/icons/Demolition-Cutting-icon.png',
    title: 'Demolition & Cutting',
    href: '/demolition-cutting',
    description:
      'Controlled concrete removal with minimal damage to surrounding areas.',
  },
  {
    icon: '/icons/Wall-Saw-Cutting-icon.png',
    title: 'Wall Saw Cutting',
    href: '/wall-saw-cutting',
    description:
      'Precise vertical concrete cutting for walls, doors, windows, and structural openings.',
    // This artwork fills its frame edge-to-edge; inset it so it reads the
    // same visual size as the other icons.
    iconClassName: 'p-2.5 sm:p-2 lg:p-2.5',
  },
];

export default function OurServices() {
  return (
    <section
      id="services"
      className={cn(microgramma.variable, 'bg-white py-8 sm:py-16 lg:py-20')}
    >
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        <span className="inline-flex items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
          Our Services
        </span>

        <div
          id="services-cards"
          className="mt-6 grid auto-rows-fr grid-cols-1 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-2"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="flex gap-3 bg-[#f5f5f5] px-4 py-3 sm:gap-8 sm:p-10 lg:gap-10 lg:p-[52px] "
            >
              <div className="flex size-[108px] shrink-0 items-center justify-center self-center sm:size-[130px] lg:size-[160px] 2xl:size-[188px]">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={214}
                  height={214}
                  className={cn('size-full object-contain', service.iconClassName)}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                {/* >1440px (laptops/PCs): Microgramma D Extended 700, 26px/28px,
                    uppercase, 0 letter-spacing — per design spec. Column is
                    top-aligned with the button pinned to the card bottom so all
                    cards match. */}
                <h3 className="text-[15px] font-bold uppercase leading-[17px] tracking-normal text-[#141414] sm:text-[26px] sm:leading-[28px] min-[1440px]:text-[26px] min-[1440px]:font-bold min-[1440px]:uppercase min-[1440px]:leading-[28px] min-[1440px]:tracking-[0] min-[1440px]:align-middle [font-family:var(--font-microgramma),sans-serif]">
                  {service.title}
                </h3>
                <p
                  className={cn(
                    inter.className,
                    'mb-2 mt-1.5 text-[13.5px] font-normal leading-snug tracking-normal text-[#5b5b5b] sm:mb-10 sm:mt-5 sm:text-[15px] lg:text-[16px] lg:leading-none xl:text-[17px] 2xl:text-[18px]',
                  )}
                >
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-auto inline-flex h-[36px] w-[150px] items-center justify-center gap-[6px] rounded-full border-[0.93px] border-[#1E2C32]/30 px-[18px] text-[10px] font-semibold uppercase tracking-wide text-[#1E2C32] transition-colors hover:border-[#c70017] hover:bg-[#c70017] hover:text-white sm:h-[47px] sm:w-[196px] sm:gap-[7.47px] sm:px-[28px] sm:text-[12px] xl:h-[52px] xl:w-[216px] xl:text-[13px] 2xl:h-[58px] 2xl:w-[240px] 2xl:text-[14px]"
                >
                  View services
                  <ChevronRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
