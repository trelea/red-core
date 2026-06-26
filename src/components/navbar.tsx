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
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full backdrop-blur-xs [mask-image:linear-gradient(to_bottom,black_25%,transparent)] lg:h-48"
      />
      <div className="container relative mx-auto flex items-center justify-between gap-4 px-4 pb-4 pt-6 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12 lg:pb-5 lg:pt-8 xl:px-[120px] 2xl:px-[160px]">
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
            className="h-[26px] w-auto sm:h-[30px] lg:h-[34px]"
          />
        </Link>

        {/* middle top dock nav items */}
        <Dock
          disableMagnification
          className="pointer-events-auto mt-0 hidden h-auto gap-0 justify-self-center rounded-full border-0 bg-white/75 p-0 shadow-sm backdrop-blur-sm lg:flex shadow-md"
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
                  'whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-normal uppercase tracking-normal transition-colors xl:px-[30px] xl:py-[13px] xl:text-[15px]',
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
