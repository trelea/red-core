'use client';

import Image from 'next/image';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inter, orbitron } from '@/lib/fonts';
import { scrollToSection } from '@/lib/scroll-to-section';
import { trackPhoneClick } from '@/lib/gtag';
import { useQuoteDialog } from '@/components/quote-dialog-provider';

interface HeroProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };

  // Optional props to control what is rendered
  render_desc?: boolean;
  render_buttons?: boolean;
}

function ContactButtons({ small = false }: { small?: boolean }) {
  return (
    <>
      <a
        href="mailto:redcoreusa@gmail.com"
        aria-label="Email us"
        className={cn(
          'group flex items-center overflow-hidden rounded-l-full bg-[#FFFFFF73] text-black shadow-lg backdrop-blur-sm transition-colors hover:bg-white/60',
          small ? 'h-[54px]' : 'h-[64px]',
        )}
      >
        <span
          className={cn(
            'flex shrink-0 items-center justify-center',
            small ? 'w-[72px]' : 'w-[93px]',
          )}
        >
          <MailIcon className={small ? 'size-6' : 'size-[26px]'} />
        </span>
        {/* Email slides out to the right of the icon on hover */}
        <span
          className={cn(
            'max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-[max-width,padding] duration-300 ease-out group-hover:max-w-[280px]',
            small ? 'text-[13px] group-hover:pr-5' : 'text-sm group-hover:pr-7',
          )}
        >
          redcoreusa@gmail.com
        </span>
      </a>
      <a
        href="tel:+14136662026"
        onClick={trackPhoneClick}
        className={cn(
          'flex items-center rounded-l-full bg-[#FFFFFF73] text-black shadow-lg backdrop-blur-sm transition-colors hover:bg-white/60',
          small
            ? 'h-[54px] gap-2.5 pl-5 pr-5'
            : 'h-[65px] gap-4 pl-[37px] pr-[38px]',
        )}
      >
        <PhoneIcon className={cn('text-black', small ? 'size-6' : 'size-7')} />
        <span
          className={cn('font-semibold', small ? 'text-[13px]' : 'text-sm')}
        >
          (413)-666-2026
        </span>
      </a>
    </>
  );
}

export default function Hero({
  title = (
    <>
      Concrete
      <br />
      cutting
      <br />
      experts
    </>
  ),
  description = 'Professional concrete cutting, core drilling, slab sawing, and controlled demolition with clean results, precise work, and reliable scheduling.',
  image,
  render_desc = true,
  render_buttons = true,
}: HeroProps) {
  const { openQuote } = useQuoteDialog();
  // On phones we use the undistorted full-res PNG (sharper, no SVG stretch);
  // on larger screens we use the SVG framing. A passed `image` (service pages)
  // overrides both.
  const desktopImage = image ?? {
    src: '/hero-img.png',
    alt: 'Modern concrete building',
  };
  const mobileImage = image ?? {
    src: '/hero-building.png',
    alt: 'Modern concrete building',
  };
  // Title-only mode (used by the service pages) — nudge the band a touch less.
  const compact = !render_desc && !render_buttons;
  return (
    <section
      className={cn(
        orbitron.variable,
        'relative isolate w-screen overflow-hidden bg-[#d9d9d9] sm:h-auto sm:w-auto lg:min-h-0 lg:max-h-screen',
        // Phones: full-screen for the full hero, half-screen for title-only.
        compact ? 'h-[50vh] sm:min-h-[420px]' : 'h-screen sm:min-h-[700px]',
      )}
    >
      {/* Mobile (below lg): the FULL image is rendered in the lower band of the
          section — from 20% to 100% of the height (Oy). The top 20% stays gray
          for the text. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-[20%] -z-10 lg:hidden"
      >
        <Image
          src={mobileImage.src}
          alt={mobileImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Soft-blend the top of the image into the gray text band */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[#d9d9d9] from-30% via-[#d9d9d9]/55 via-70% to-transparent" />
      </div>

      {/* Desktop (lg+): the image sits in the right half, in flow so it defines
          the section height. Hidden on mobile (the background layer is used). */}
      <div className="relative hidden lg:ml-auto lg:block lg:w-1/2">
        <Image
          src={desktopImage.src}
          alt={desktopImage.alt}
          width={722}
          height={754}
          priority
          quality={100}
          sizes="50vw"
          className="h-auto w-full object-contain object-right"
        />
        {/* Soft-blend the image's left edge into the gray panel */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#d9d9d9] from-5% via-[#d9d9d9]/50 via-15% to-transparent to-30%"
        />
      </div>

      {/* Content + contacts. Under lg it's a normal in-flow block anchored at the
          top (text sits in the gray band); at lg+ it becomes the absolute,
          vertically-balanced overlay band. */}
      <div
        className={cn(
          'relative w-full pb-12 sm:pt-36 lg:absolute lg:inset-0 lg:flex lg:items-start lg:pb-0 lg:pt-32 xl:items-center xl:pt-0',
          compact ? 'pt-28' : 'pt-52',
        )}
      >
        <div
          className={cn(
            'relative w-full',
            compact ? 'xl:translate-y-20' : 'xl:translate-y-10',
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
            <div className="flex max-w-[600px] flex-col 2xl:max-w-[760px]">
              <h1 className="text-[36px] font-bold uppercase leading-[0.95] tracking-tight text-[#141414] [font-family:var(--font-orbitron),sans-serif] sm:text-[40px] lg:text-[54px] 2xl:text-[70px]">
                {title}
              </h1>
              {render_desc && (
                <div
                  className={cn(
                    inter.className,
                    'mt-4 max-w-[460px] text-[16px] font-normal leading-snug tracking-normal text-[#3a3a3a] sm:text-[18px] sm:leading-none lg:mt-8 lg:text-[24px] 2xl:mt-10 2xl:max-w-[580px] 2xl:text-[30px]',
                  )}
                >
                  {description}
                </div>
              )}
              {render_buttons && (
                <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-9 lg:mt-16 2xl:mt-20 2xl:gap-3.5">
                  <button
                    type="button"
                    onClick={openQuote}
                    className="rounded-full bg-[#c70017] px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white shadow-sm transition-colors lg:px-10 lg:py-5 lg:text-sm 2xl:px-12 2xl:py-6 2xl:text-base hover:bg-[#9a0012]"
                  >
                    Get a quote
                  </button>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection(e, 'projects')}
                    className="rounded-full bg-[#4F4F4F] px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white shadow-sm transition-colors lg:px-10 lg:py-5 lg:text-sm 2xl:px-12 2xl:py-6 2xl:text-base hover:bg-[#3f3f3f]"
                  >
                    Our projects
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contacts (desktop, lg+) — flush right, bottom-aligned to the text */}
          <div className="absolute bottom-0 right-0 z-10 hidden flex-col items-end gap-[5px] lg:flex">
            <ContactButtons />
          </div>
        </div>
      </div>

      {/* Contacts (mobile, below lg) — smaller, pinned to the bottom-right of the
          image where the hero stacks vertically. */}
      <div className="absolute bottom-5 right-0 z-10 flex flex-col items-end gap-[5px] lg:hidden">
        <ContactButtons small />
      </div>
    </section>
  );
}
