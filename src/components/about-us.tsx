import Image from 'next/image';
import {
  FocusIcon,
  SquarePlusIcon,
  MapPinIcon,
  TruckIcon,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { inter, microgramma } from '@/lib/fonts';

type InfoItem = {
  Icon: LucideIcon;
  title?: string;
  text: string;
};

const items: InfoItem[] = [
  {
    Icon: FocusIcon,
    text: 'We respond quickly, work cleanly, and provide fair pricing for residential and commercial projects.',
  },
  {
    Icon: SquarePlusIcon,
    text: 'Our mission is to deliver precise results and make every project smooth and stress-free for our clients.',
  },
  {
    Icon: MapPinIcon,
    title: 'Our Location',
    text: '321 Springfield St Agawam, MA 01001',
  },
  {
    Icon: TruckIcon,
    title: 'Service Area',
    text: 'New England — including MA, CT, RI, NH, VT, and ME.',
  },
];

function InfoCell({ Icon, title, text }: InfoItem) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-[#c70017] 2xl:size-6" />
      <div className="text-[16px] font-normal leading-[1.5] text-[#5b5b5b] 2xl:text-[18px]">
        {title && <p className="font-bold text-[#1E2C32]">{title}</p>}
        <p className={title ? 'mt-1' : undefined}>{text}</p>
      </div>
    </div>
  );
}

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 45vw"
        className="object-cover"
      />
    </div>
  );
}

const IMG_1 = {
  src: '/aboutus-1.png',
  alt: 'RedCore technician hand-sawing a concrete wall',
};
const IMG_2 = {
  src: '/aboutus-2.png',
  alt: 'RedCore technician core drilling on site',
};

function Header() {
  return (
    <>
      <span className="inline-flex items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
        About Us
      </span>
      <h2
        className={cn(
          inter.className,
          'mt-7 max-w-[520px] text-[24px] font-normal leading-[1.3] tracking-tight text-[#1E2C32] 2xl:max-w-[640px] 2xl:text-[30px]',
        )}
      >
        REDCORE Concrete Services is a reliable team specializing in professional
        concrete cutting and core drilling across New England.
      </h2>
    </>
  );
}

export default function AboutUs() {
  return (
    <section
      id="about"
      className={cn(microgramma.variable, 'bg-white py-12 sm:py-16 lg:py-20')}
    >
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        {/* Desktop (lg+): images left, content right */}
        <div className="hidden items-stretch gap-16 lg:grid lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-5">
            <Photo {...IMG_1} className="aspect-[1296/2188] lg:aspect-auto" />
            <Photo {...IMG_2} className="aspect-[1296/2188] lg:aspect-auto" />
          </div>

          <div className={inter.className}>
            <Header />
            <div className="my-10 border-t border-[#e0e0e0] 2xl:my-14" />
            <div className="grid grid-cols-2 gap-8 2xl:gap-12">
              {items.map((item) => (
                <InfoCell key={item.text} {...item} />
              ))}
            </div>
            <div className="mt-10 border-t border-[#e0e0e0] 2xl:mt-14" />
          </div>
        </div>

        {/* Phone / small screens (below lg): images woven into the sections.
            Row 1: [photo 1] [respond + mission]
            Row 2: [location + service area] [photo 2] */}
        <div className={cn(inter.className, 'mt-10 lg:hidden')}>
          <Header />
          <div className="mt-10 grid grid-cols-2 items-stretch gap-x-4 gap-y-8 sm:gap-x-5">
            <Photo {...IMG_1} className="min-h-[420px] rounded-none" />
            <div className="flex flex-col justify-evenly border-y border-[#e0e0e0] py-2">
              <InfoCell {...items[0]} />
              <InfoCell {...items[1]} />
            </div>
            <div className="flex flex-col justify-evenly border-y border-[#e0e0e0] py-2">
              <InfoCell {...items[2]} />
              <InfoCell {...items[3]} />
            </div>
            <Photo {...IMG_2} className="min-h-[420px] rounded-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
