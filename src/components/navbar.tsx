'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dock } from '@/components/ui/dock';
import { NavbarMobileMenu } from '@/components/navbar-menu';
import { scrollToSection } from '@/lib/scroll-to-section';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Get a quote', id: 'quote', emphasized: true },
  { label: 'Special offers', id: 'offers' },
];

export default function Navbar() {
  const { openQuote } = useQuoteDialog();
  return (
    <header
      className={cn(
        inter.className,
        'pointer-events-none fixed left-0 top-0 z-50 w-full antialiased',
      )}
    >
      {/* blurred underlay — keeps the nav legible over any section/color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)] lg:h-32"
      />
      <div className="container relative mx-auto flex items-center justify-between gap-4 px-[30px] pb-4 pt-[24px] lg:block lg:items-center lg:gap-6 lg:px-12 lg:pb-5 lg:pt-5 xl:gap-8 xl:px-[120px] xl:pt-6 2xl:px-[160px]">
        {/* top left the logo */}
        <Link
          href="/"
          className="pointer-events-auto shrink-0 lg:absolute lg:left-[30px] lg:top-1/2 lg:-translate-y-1/2 xl:left-[120px] 2xl:left-[160px]"
        >
          <Image
            src="/logo.svg"
            alt="REDCORE"
            width={344}
            height={57}
            priority
            unoptimized
            className="h-[28px] w-auto max-w-none sm:h-[32px] lg:h-[34px] xl:h-[38px] min-[1440px]:h-[42px] 2xl:h-[45px]"
          />
        </Link>

        {/* middle top dock nav items — centered exactly in the screen middle */}
        <Dock
          disableMagnification
          className="pointer-events-auto mt-0 hidden h-auto gap-0 rounded-full border-0 bg-white/75 p-0 shadow-md backdrop-blur-md lg:mx-auto lg:flex"
        >
          {navItems.map((item, i) => {
            const itemClass = cn(
              'inline-flex w-[132px] items-center justify-center whitespace-nowrap rounded-full py-[10px] text-center text-[12.5px] font-medium uppercase tracking-[0.02em] antialiased transition-colors xl:w-[156px] xl:py-[12px] xl:text-[13.5px] 2xl:w-[168px] 2xl:py-[13px]',
              'text-[#141414] hover:text-[#c70017]',
            );
            return (
              <span key={item.id} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-5 w-px shrink-0 bg-black/20"
                  />
                )}
                {item.id === 'quote' ? (
                  <button
                    type="button"
                    onClick={() => openQuote('navbar')}
                    className={itemClass}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={itemClass}
                  >
                    {item.label}
                  </a>
                )}
              </span>
            );
          })}
        </Dock>

        {/* mobile menu */}
        <div className="pointer-events-auto lg:hidden">
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
