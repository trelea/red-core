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
    href: '/small-demolation',
    description:
      'Controlled removal of concrete sections without damaging surrounding structures.',
  },
];

export default function OurServices() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-[120px]">
        <h2 className="mb-10 text-[24px] font-bold text-[#1E2C32]">
          Our Services:
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={index === services.length - 1 ? 'sm:col-span-2' : ''}
            >
              <Card className="group h-[200px] cursor-pointer rounded-[8px] border-0 bg-[#F5F5F5] text-[#1E2C32] shadow-xs transition-colors duration-300 hover:bg-[#1E2C32] hover:text-white">
                <CardContent className="flex h-full items-center gap-6 px-10 py-0">
                  <service.icon className="size-[50px] shrink-0 stroke-[1.5] text-[#C70017] transition-colors duration-300" />
                  <div className="flex flex-1 flex-col gap-6">
                    <h3 className="text-[32px] font-bold leading-none">
                      {service.title}
                    </h3>
                    <p className="text-[16px] font-normal leading-normal">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRightIcon className="size-8 shrink-0 stroke-[2.5] text-[#1E2C32] transition-colors duration-300 group-hover:text-white" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
