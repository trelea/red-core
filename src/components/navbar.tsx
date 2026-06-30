'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dock } from '@/components/ui/dock';
import { NavbarMobileMenu } from '@/components/navbar-menu';
import { scrollToSection } from '@/lib/scroll-to-section';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
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
    <header className="pointer-events-none fixed left-0 top-0 z-50 w-full">
      {/* blurred underlay — keeps the nav legible over any section/color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 w-full backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,black_15%,transparent)] lg:h-40"
      />
      <div className="container relative mx-auto flex items-center justify-between gap-4 px-[30px] pb-4 pt-[30px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12 lg:pb-5 lg:pt-8 xl:px-[120px] 2xl:px-[160px]">
        {/* top left the logo */}
        <Link
          href="/"
          className="pointer-events-auto shrink-0 justify-self-start"
        >
          <Image
            src="/logo.svg"
            alt="Red Core Inc."
            width={280}
            height={39}
            priority
            className="h-[28px] w-auto sm:h-[32px] lg:h-[39px] xl:h-[41px] min-[1440px]:h-[46px]"
          />
        </Link>

        {/* middle top dock nav items */}
        <Dock
          disableMagnification
          className="pointer-events-auto mt-0 hidden h-auto gap-0 justify-self-center rounded-full border-0 bg-white/80 p-0 shadow-sm backdrop-blur-sm lg:flex shadow-md"
        >
          {navItems.map((item, i) => (
            <span key={item.id} className="flex items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-1 h-4 w-px bg-black/15 xl:mx-2"
                />
              )}
              <button
                type="button"
                onClick={(e) =>
                  item.id === 'quote'
                    ? openQuote()
                    : scrollToSection(e, item.id)
                }
                className={cn(
                  'whitespace-nowrap rounded-full px-[30px] py-[11px] text-[13px] font-normal uppercase tracking-normal transition-colors',
                  'text-black hover:text-[#c70017]',
                )}
              >
                {item.label}
              </button>
            </span>
          ))}
        </Dock>

        {/* mobile menu */}
        <div className="pointer-events-auto lg:hidden">
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
