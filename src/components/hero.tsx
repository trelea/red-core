'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { oswald, inter } from '@/lib/fonts';
import { scrollToSection } from '@/lib/scroll-to-section';
import { PhoneIcon, ClipboardListIcon, ArrowRightIcon } from 'lucide-react';

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'contacts')}
                style={{ animation: 'button-glow 4.5s ease-in-out infinite' }}
                className={cn(
                  inter.className,
                  'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#C70017] to-[#a80014] px-8 py-3 text-[16px] font-bold uppercase leading-[27px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-[#d80019] hover:to-[#b30017] active:translate-y-0 active:scale-[0.98] motion-reduce:animate-none sm:px-6 sm:py-[15px]',
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent motion-reduce:hidden"
                  style={{ animation: 'button-shine 5.5s ease-in-out infinite' }}
                />
                <PhoneIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Contact Us</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </button>
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'quote')}
                className={cn(
                  inter.className,
                  'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#1E2C32] to-[#2E4048] px-8 py-3 text-[16px] font-bold uppercase leading-[27px] text-white shadow-[0_4px_14px_0_rgba(30,44,50,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_0_rgba(30,44,50,0.45)] active:translate-y-0 active:scale-[0.98] sm:px-6 sm:py-[15px]',
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-reduce:hidden"
                  style={{ animation: 'button-shine 6.5s ease-in-out infinite' }}
                />
                <ClipboardListIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Get a Quote</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-6">
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'contacts')}
                style={{ animation: 'button-glow 4.5s ease-in-out infinite' }}
                className={cn(
                  inter.className,
                  'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#C70017] to-[#a80014] px-6 py-3 text-[14px] font-bold uppercase leading-[27px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-[#d80019] hover:to-[#b30017] active:translate-y-0 active:scale-[0.98] motion-reduce:animate-none lg:px-6 lg:py-[15px] lg:text-[16px]',
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent motion-reduce:hidden"
                  style={{ animation: 'button-shine 5.5s ease-in-out infinite' }}
                />
                <PhoneIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Contact Us</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </button>
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'quote')}
                className={cn(
                  inter.className,
                  'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#1E2C32] to-[#2E4048] px-6 py-3 text-[14px] font-bold uppercase leading-[27px] text-white shadow-[0_4px_14px_0_rgba(30,44,50,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_0_rgba(30,44,50,0.45)] active:translate-y-0 active:scale-[0.98] lg:px-6 lg:py-[15px] lg:text-[16px]',
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-reduce:hidden"
                  style={{ animation: 'button-shine 6.5s ease-in-out infinite' }}
                />
                <ClipboardListIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Get a Quote</span>
                <ArrowRightIcon className="relative z-10 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
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

