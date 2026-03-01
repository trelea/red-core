import Link from 'next/link';
import {
  CrosshairIcon,
  ScanLineIcon,
  ConstructionIcon,
  WrenchIcon,
  HammerIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: CrosshairIcon,
    title: 'Core Drilling',
    href: '/core-drilling',
    description:
      'Precision drilling of perfectly round holes in concrete, brick, and stone.',
  },
  {
    icon: ScanLineIcon,
    title: 'Slab Cutting',
    href: '/slab-cutting',
    description:
      'Cutting concrete slabs and floors to access underground pipes or utilities.',
  },
  {
    icon: ConstructionIcon,
    title: 'Wall Saw Cutting',
    href: '/wall-saw-cutting',
    description:
      'Heavy-duty cutting for doorways, windows, and large structural openings.',
  },
  {
    icon: WrenchIcon,
    title: 'Hand Saw Cutting',
    href: '/hand-saw-cutting',
    description:
      'Compact precision cutting for tight or indoor areas where large machines cannot fit.',
  },
  {
    icon: HammerIcon,
    title: 'Small Demolition',
    href: '/small-demolition',
    description:
      'Controlled removal of concrete sections without damaging surrounding structures.',
  },
];

export default function OurServices() {
  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] xl:px-[160px]">
        <h2 className="mb-10 text-[20px] font-bold text-[#1E2C32] sm:text-[24px]">
          Our Services:
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={index === services.length - 1 ? 'sm:col-span-2' : ''}
            >
              <Card className="group h-auto min-h-[140px] cursor-pointer rounded-[8px] border-0 bg-[#F5F5F5] text-[#1E2C32] shadow-xs transition-colors duration-300 hover:bg-[#1E2C32] hover:text-white sm:min-h-[180px] lg:min-h-[200px]">
                <CardContent className="flex h-full flex-col justify-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 lg:px-10 lg:py-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <service.icon className="size-8 shrink-0 stroke-[1.5] text-[#C70017] transition-colors duration-300 sm:size-10 lg:size-[50px]" />
                    <h3 className="flex-1 text-[20px] font-bold leading-none sm:text-[24px] lg:text-[32px]">
                      {service.title}
                    </h3>
                    <ChevronRightIcon className="size-8 shrink-0 stroke-[2.5] text-[#1E2C32] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <p className="pl-12 text-[14px] font-normal leading-normal sm:pl-16 sm:text-[16px] lg:pl-[74px]">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
