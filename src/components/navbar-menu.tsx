'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, PhoneIcon, MailIcon } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { scrollToSection, scrollToId } from '@/lib/scroll-to-section';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { trackEmailClick, trackPhoneClick } from '@/lib/gtag';
import { useEffect, useState } from 'react';

const mobileLinks = [
  { label: 'About us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Get a quote', id: 'quote' },
  { label: 'Special offers', id: 'offers' },
  { label: 'Contacts', id: 'contacts' },
];

const serviceSubLinks = [
  { label: 'Core Drilling', href: '/core-drilling' },
  { label: 'Slab Cutting', href: '/slab-cutting' },
  { label: 'Demolition & Cutting', href: '/demolition-cutting' },
  { label: 'Wall Saw Cutting', href: '/wall-saw-cutting' },
  { label: 'Concrete Restoration', href: '/concrete-restoration' },
];

const mobileRowClass =
  'flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-[15px] font-normal uppercase tracking-[0.04em] text-black transition-colors hover:bg-black/[0.03] hover:text-[#c70017]';

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuoteDialog();

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => scrollToId(hash), 100);
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Kick off the scroll, then close the sheet as soon as it starts.
  // The "quote" item opens the global quote dialog instead of scrolling.
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (id === 'quote') {
      openQuote('mobile_menu');
    } else {
      scrollToSection(e, id);
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full bg-[#D9D9D9] text-black shadow-sm hover:bg-[#cccccc]"
        >
          <MenuIcon className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[calc(100vw-40px)] flex-col gap-0 overflow-y-auto border-0 bg-white/95 p-0 text-black backdrop-blur-xl sm:w-[360px]"
      >
        {/* Header */}
        <SheetHeader className="border-b border-black/10 px-6 py-5">
          <SheetTitle>
            <Image
              src="/logo.svg"
              alt="REDCORE"
              width={344}
              height={57}
              unoptimized
              className="h-8 w-auto"
            />
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col px-3 py-4">
          {mobileLinks.map((link) => (
            <div key={link.id}>
              {link.id === 'quote' ? (
                <button
                  type="button"
                  className={mobileRowClass}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  href={`/#${link.id}`}
                  className={mobileRowClass}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              )}
              {link.id === 'services' && (
                <div className="mb-2 ml-3 flex flex-col border-l border-black/10 pl-3">
                  {serviceSubLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-2 text-[13px] font-normal uppercase tracking-[0.04em] text-black/70 transition-colors hover:bg-black/[0.03] hover:text-[#c70017]"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="mt-auto flex flex-col gap-3 border-t border-black/10 px-6 py-5">
          <SheetClose asChild>
            <a
              href="tel:+14136662026"
              onClick={() => trackPhoneClick('mobile_menu')}
              className="flex items-center justify-center gap-2 rounded-full bg-[#c70017] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.04em] text-white shadow-sm transition-colors hover:bg-[#9a0012]"
            >
              <PhoneIcon className="size-4" />
              (413)-666-2026
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href="mailto:redcoreusa@gmail.com"
              onClick={() => trackEmailClick('mobile_menu')}
              className="flex items-center justify-center gap-2 rounded-full bg-[#c70017] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.04em] text-white shadow-sm transition-colors hover:bg-[#9a0012]"
            >
              <MailIcon className="size-4" />
              redcoreusa@gmail.com
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
