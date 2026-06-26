'use client';

import { scrollToSection } from '@/lib/scroll-to-section';
import { useQuoteDialog } from '@/components/quote-dialog-provider';

/**
 * The hero's primary action buttons. Client-only because they open the quote
 * dialog and smooth-scroll to the projects section.
 */
export default function HeroActions() {
  const { openQuote } = useQuoteDialog();

  return (
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
  );
}
