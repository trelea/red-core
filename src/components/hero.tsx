'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { oswald, inter } from '@/lib/fonts';
import { scrollToSection } from '@/lib/scroll-to-section';

interface HeroProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  variant?: 'background' | 'simple';
  className?: string;
}

export default function Hero({
  title = (
    <>
      <span className="font-normal">Professional</span>
      <br />
      <span className="font-bold">Concrete Cutting</span>
      <br />
      <span className="font-normal">& </span>
      <span className="font-bold">Core Drilling</span>
    </>
  ),
  description = 'We help residential and commercial clients solve concrete-related tasks quickly, cleanly, and professionally.',
  image = {
    src: '/hero-img.png',
    alt: 'Redcore concrete cutting service in action',
  },
  variant = 'background',
  className,
}: HeroProps) {
  if (variant === 'simple') {
    return (
      <section className={cn('relative overflow-hidden bg-white', className)}>
        <div className="container mx-auto flex flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-[120px] xl:px-[160px]">
          <div className="flex w-full flex-col gap-10 text-[#1E2C32] lg:w-1/2 lg:shrink-0 lg:gap-16">
            <div className="flex flex-col gap-10">
              <h1 className={cn(oswald.className, 'text-[36px] uppercase leading-[1.18] tracking-tight sm:text-[38px] md:text-[42px] lg:text-[61px]')}>
                {title}
              </h1>
              <div className={cn(inter.className, 'max-w-[488px] text-[16px] font-normal leading-normal sm:text-[18px] md:text-[20px] lg:text-[24px]')}>
                {description}
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'contacts')}
                className={cn(inter.className, 'inline-flex items-center justify-center rounded-sm bg-[#C70017] px-8 py-3 text-[16px] font-bold uppercase leading-[27px] text-white shadow-sm transition-colors hover:bg-[#a80014] sm:px-[50px] sm:py-[15px]')}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'quote')}
                className={cn(inter.className, 'inline-flex items-center justify-center rounded-sm bg-[#1E2C32] px-8 py-3 text-[16px] font-bold uppercase leading-[27px] text-white shadow-sm transition-colors hover:bg-[#1E2C32]/90 sm:px-[50px] sm:py-[15px]')}
              >
                Get a Quote
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 650}
              height={image.height ?? 500}
              className="h-auto w-full rounded-lg object-contain shadow-md"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#E0E0E2]', className)}>
      {/* Text content — above everything */}
      <div className="relative z-10 lg:flex lg:h-[740px] lg:items-center">
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-[120px] lg:py-0 xl:px-[160px]">
          <div className="flex flex-col gap-10 text-[#1E2C32] lg:w-[668px] lg:gap-16">
            <div className="flex flex-col gap-5 lg:gap-10">
              <h1 className={cn(oswald.className, 'text-[36px] uppercase leading-[1.18] tracking-tight sm:text-[38px] md:text-[42px] lg:text-[61px] xl:text-[68px]')}>
                {title}
              </h1>
              <div className={cn(inter.className, 'max-w-[488px] text-[16px] font-normal leading-normal sm:text-[18px] md:text-[20px] lg:text-[24px]')}>
                {description}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'contacts')}
                className={cn(inter.className, 'inline-flex items-center justify-center rounded-sm bg-[#C70017] px-8 py-3 text-[14px] font-bold uppercase leading-[27px] text-white shadow-sm transition-colors hover:bg-[#a80014] lg:px-[50px] lg:py-[15px] lg:text-[16px]')}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'quote')}
                className={cn(inter.className, 'inline-flex items-center justify-center rounded-sm bg-[#1E2C32] px-8 py-3 text-[14px] font-bold uppercase leading-[27px] text-white shadow-sm transition-colors hover:bg-[#1E2C32]/90 lg:px-[50px] lg:py-[15px] lg:text-[16px]')}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — mobile: pulled up under buttons, desktop: right 61% of section */}
      <div className="-mt-40 h-[250px] sm:-mt-44 sm:h-[350px] md:h-[400px] lg:absolute lg:inset-y-0 lg:left-[39%] lg:right-0 lg:mt-0 lg:h-full">
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center lg:object-left"
            sizes="(min-width: 1024px) 61vw, 100vw"
            priority
            unoptimized
          />
          {/* Mobile: top-to-bottom fade into gray background */}
          <div
            className="absolute inset-x-0 top-0 h-[70%] lg:hidden"
            style={{
              background:
                'linear-gradient(to bottom, #E0E0E2 0%, rgba(224, 224, 226, 0) 100%)',
            }}
          />
          {/* Desktop: left-to-right fade into gray background */}
          <div
            className="hidden lg:absolute lg:inset-y-0 lg:left-0 lg:block lg:w-[37%]"
            style={{
              background:
                'linear-gradient(to right, #E0E0E2 2.5%, rgba(224, 224, 226, 0) 95%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

