'use client';

import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { cn } from '@/lib/utils';
import { inter } from '@/lib/fonts';

// Mobile spec: stacked 203×59 pills, 50px radius, 40px side padding, Inter
// Medium 16px uppercase. Desktop (lg+) keeps the original auto-width row.
const btnBase =
  'inline-flex h-[59px] w-[203px] items-center justify-center rounded-[50px] px-[40px] text-[16px] font-medium uppercase leading-none tracking-normal text-white shadow-sm transition-colors lg:h-auto lg:w-auto lg:rounded-full lg:px-10 lg:py-5 lg:text-sm lg:font-semibold 2xl:px-12 2xl:py-6 2xl:text-base';

/**
 * The hero's primary action buttons. Client-only because they open the quote
 * dialog and smooth-scroll to the projects section.
 */
export default function HeroActions() {
  const { openQuote } = useQuoteDialog();

  return (
    <div
      className={cn(
        inter.className,
        'mt-[35px] flex flex-col items-start gap-[15px] sm:mt-9 lg:mt-16 lg:flex-row lg:items-center lg:gap-2.5 2xl:mt-20 2xl:gap-3.5',
      )}
    >
      <button
        type="button"
        onClick={openQuote}
        className={cn(btnBase, 'bg-[#c70017] hover:bg-[#9a0012]')}
      >
        Get a quote
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.href = '/demolition-cutting#projects';
        }}
        className={cn(btnBase, 'bg-[#4F4F4F] hover:bg-[#3f3f3f]')}
      >
        Our projects
      </button>
    </div>
  );
}
