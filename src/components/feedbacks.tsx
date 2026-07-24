import FeedbackCard from '@/components/feedback-card';
import { Marquee } from '@/components/ui/marquee';

const feedbacks = [
  {
    name: 'Michael B.',
    feedback:
      'Excellent demolition work. Everything was completed safely, the cuts were clean, and the site was left ready for the next phase of construction.',
  },
  {
    name: 'Sarah L.',
    feedback:
      'The new basement window opening came out perfectly. Everything was straight, clean, and ready for installation. Great experience from start to finish.',
  },
  {
    name: 'Daniel S.',
    feedback:
      'Excellent core drilling service. Every hole was drilled accurately, and the crew kept the work area clean and organized.',
  },
  {
    name: 'Brian T.',
    feedback:
      'Perfect slab cutting for our plumbing installation. The cuts were accurate, cleanup was excellent, and everything stayed on schedule.',
  },
  {
    name: 'Robert K.',
    feedback:
      'Very impressed with the quality of work. The crew completed the concrete cutting exactly as planned and left the area clean before leaving.',
  },
  {
    name: 'Christopher W.',
    feedback:
      'The foundation opening was completed with great precision. The crew arrived on time, worked efficiently, and communicated throughout the project.',
  },
  {
    name: 'Anthony C.',
    feedback:
      'We hired REDCORE for several core holes, and everything was completed exactly as requested. Fast, clean, and professional service.',
  },
  {
    name: 'James R.',
    feedback:
      'The team handled our project professionally from beginning to end. They kept the work area organized and finished on schedule.',
  },
  {
    name: 'Andrew P.',
    feedback:
      'The trench cutting was done with excellent precision. Everything was prepared perfectly for the plumbing contractor.',
  },
  {
    name: 'Mark G.',
    feedback:
      'The wall opening was exactly what we needed. Clean edges, accurate measurements, and no unnecessary damage to the surrounding concrete.',
  },
  {
    name: 'Kevin H.',
    feedback:
      'The slab cutting was completed quickly and professionally. Everything was ready for the next stage without any issues.',
  },
  {
    name: 'Steven L.',
    feedback:
      'The crew used professional equipment and completed the drilling with impressive accuracy. I would definitely use their services again.',
  },
];

export default function Feedbacks() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28 lg:py-36">
      {/* container — keeps the heading aligned with navbar / footer width */}
      <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        {/* head */}
        <span className="inline-flex items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[15px] font-normal uppercase tracking-[0.18em] text-black">
          Feedbacks
        </span>
      </div>

      {/* full-width marquee with white edge fades */}
      <div className="relative mt-8 sm:mt-10 lg:mt-12">
        <Marquee pauseOnHover className="[--duration:140s] [--gap:1.25rem]">
          {feedbacks.map((item) => (
            <FeedbackCard
              key={item.name}
              name={item.name}
              feedback={item.feedback}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden bg-gradient-to-r from-white via-white/70 to-transparent sm:block sm:w-24 md:w-40 lg:w-[240px] lg:via-white/90 xl:w-[320px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden bg-gradient-to-l from-white via-white/70 to-transparent sm:block sm:w-24 md:w-40 lg:w-[240px] lg:via-white/90 xl:w-[320px]" />
      </div>
    </section>
  );
}
