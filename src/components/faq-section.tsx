import type { ReactNode } from 'react';
import FaqAccordion from '@/components/faq-accordion';

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
    <section id="faq" className="bg-white py-12 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="rounded-[24px] bg-[#f3f3f3] py-8 sm:rounded-[32px] sm:py-10 lg:rounded-[45px] lg:py-14">
        <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
          <h2 className="inline-flex items-center rounded-full bg-[#e7e7e7] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
            <span className="sm:hidden">FAQ</span>
            <span className="hidden sm:inline">Frequently asked questions</span>
          </h2>

          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}