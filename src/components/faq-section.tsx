import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type FaqItem = {
  question: string;
  answer: string;
  icon?: ReactNode;
};

// FAQ accordion paired with FAQPage structured data. Answers are kept in the
// server-rendered HTML via forceMount (Radix unmounts closed content by
// default) so Google can crawl them; the in-data-[state=closed]:hidden class
// takes over hiding collapsed answers instead.
export default function FaqSection({ items }: { items: FaqItem[] }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="rounded-[24px] bg-[#f3f3f3] py-8 sm:rounded-[32px] sm:py-10 lg:rounded-[45px] lg:py-14">
        <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
          <span className="inline-flex items-center rounded-full bg-[#e7e7e7] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
            <span className="sm:hidden">FAQ</span>
            <span className="hidden sm:inline">Frequently asked questions</span>
          </span>

          <Accordion type="single" collapsible className="mt-8 sm:mt-10">
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
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
