'use client';

import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackFaqOpen } from '@/lib/gtag';
import type { FaqItem } from '@/components/faq-section';

function linkifyText(text: string): ReactNode[] {
  const pattern = /(redcoreusa@gmail\.com|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const isEmail = /@/.test(part);
    const href = isEmail
      ? `mailto:${part}`
      : `tel:+1${part.replace(/\D/g, '')}`;
    return (
      <a
        key={i}
        href={href}
        className="text-[#C70017] underline-offset-2 hover:underline"
      >
        {part}
      </a>
    );
  });
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-8 sm:mt-10"
      onValueChange={(value) => {
        if (!value) return;
        const index = Number(value.replace('faq-', ''));
        const question = items[index]?.question;
        if (question) trackFaqOpen(question);
      }}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index}`}
          className="border-[#1E2C32]/10"
        >
          <AccordionTrigger className="items-center gap-4 rounded-none py-5 text-base font-semibold text-[#1E2C32] hover:no-underline sm:gap-7 sm:py-9 sm:text-xl lg:text-2xl [&>svg]:size-5 [&>svg]:text-[#C70017] sm:[&>svg]:size-6">
            {item.icon && (
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center bg-[#C70017] text-white sm:size-14 [&_svg]:size-5 sm:[&_svg]:size-6"
              >
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent
            forceMount
            className="in-data-[state=closed]:hidden pb-6 pl-0 pr-4 sm:pb-8 sm:pl-[84px] sm:pr-20"
          >
            <p className="text-[15px] leading-relaxed text-[#5b5b5b] sm:text-lg">
              {linkifyText(item.answer)}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}