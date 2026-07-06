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
    icon: '/icons/Small-Demolition-icon.png',
    title: 'Small Demolition',
    href: '/small-demolition',
    description:
      'Controlled concrete removal with minimal damage to surrounding areas.',
  },
  {
    icon: '/icons/Wall-Saw-Cutting-icon.png',
    title: 'Wall Saw Cutting',
    href: '/wall-saw-cutting',
    description:
      'Precise vertical concrete cutting for walls, doors, windows, and structural openings.',
  },
];

export default function OurServices() {
  return (
    <section
      id="services"
      className={cn(microgramma.variable, 'bg-white py-12 sm:py-16 lg:py-20')}
    >
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        <span className="inline-flex items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
          Our Services
        </span>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex items-center gap-3 bg-[#f5f5f5] p-4 sm:gap-8 sm:p-10 lg:gap-10 lg:p-[52px] "
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={214}
                height={214}
                className="size-[88px] shrink-0 object-contain sm:size-[150px] lg:size-[184px] 2xl:size-[220px]"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                {/* >1440px (laptops/PCs): Microgramma D Extended 700, 26px/28px,
                    uppercase, 0 letter-spacing, vertically centered — per design spec. */}
                <h3 className="text-[21px] font-bold uppercase leading-[23px] tracking-normal text-[#141414] sm:text-[26px] sm:leading-[28px] min-[1440px]:text-[26px] min-[1440px]:font-bold min-[1440px]:uppercase min-[1440px]:leading-[28px] min-[1440px]:tracking-[0] min-[1440px]:align-middle [font-family:var(--font-microgramma),sans-serif]">
                  {service.title}
                </h3>
                <p
                  className={cn(
                    inter.className,
                    'mt-2 text-[13.5px] font-normal leading-snug tracking-normal text-[#5b5b5b] sm:mt-5 sm:text-[15px] lg:text-[16px] lg:leading-none xl:text-[17px] 2xl:text-[18px]',
                  )}
                >
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex h-[36px] w-[150px] items-center justify-center gap-[6px] rounded-full border-[0.93px] border-[#1E2C32]/30 px-[18px] text-[10px] sm:mt-10 font-semibold uppercase tracking-wide text-[#1E2C32] transition-colors hover:bg-[#1E2C32] hover:text-white sm:h-[47px] sm:w-[196px] sm:gap-[7.47px] sm:px-[28px] sm:text-[12px] xl:h-[52px] xl:w-[216px] xl:text-[13px] 2xl:h-[58px] 2xl:w-[240px] 2xl:text-[14px]"
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
