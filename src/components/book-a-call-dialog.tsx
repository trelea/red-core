'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cal, { getCalApi } from '@calcom/embed-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { oswald, inter } from '@/lib/fonts';

const NAMESPACE = 'book-a-call';
const DEFAULT_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'redcoreusa';

interface BookACallDialogProps {
  children: React.ReactNode;
  calLink?: string;
  title?: string;
  description?: string;
}

export default function BookACallDialog({
  children,
  calLink = DEFAULT_CAL_LINK,
  title = 'Book a Call',
  description = "Pick a time that works for you — we'll call and walk through your project.",
}: BookACallDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#C70017' },
          dark: { 'cal-brand': '#C70017' },
        },
      });
    })();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(92vh,820px)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden rounded-none border-0 bg-white p-0 shadow-2xl sm:w-[calc(100vw-2rem)] sm:max-w-[1100px] top-auto! left-auto! translate-x-0! translate-y-0! inset-0! m-auto! data-[state=open]:zoom-in-100! data-[state=closed]:zoom-out-100!"
      >
        <div className="relative flex shrink-0 items-center justify-between gap-4 bg-[#1E2C32] px-4 py-3 sm:px-6 sm:py-3.5">
          <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C70017]/60 to-transparent" />
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/logo.svg"
              alt="Red Core"
              width={204}
              height={39}
              priority
              className="h-7 w-auto sm:h-[34px]"
            />
            <span className="hidden h-7 w-px bg-white/15 sm:block" />
            <div className="flex flex-col leading-none">
              <DialogTitle
                className={cn(
                  oswald.className,
                  'text-lg font-bold uppercase tracking-[0.04em] text-white sm:text-xl',
                )}
              >
                {title}
              </DialogTitle>
              <DialogDescription
                className={cn(
                  inter.className,
                  'mt-1.5 hidden text-[13px] font-medium text-white/60 sm:block',
                )}
              >
                {description}
              </DialogDescription>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="shrink-0 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-white">
          {open && (
            <Cal
              namespace={NAMESPACE}
              calLink={calLink}
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
              config={{
                layout: 'month_view',
                theme: 'light',
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
