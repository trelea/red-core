import FeedbackCard from '@/components/feedback-card';
import { Marquee } from '@/components/ui/marquee';

const feedbacks = [
  {
    name: 'Ethan R.',
    feedback:
      'REDCORE did an amazing job rebuilding our back deck. The crew was professional, fast, and explained every step clearly. The new decking feels solid and looks beautiful. Pricing was fair and communication was excellent from start to finish.',
  },
  {
    name: 'Melissa T.',
    feedback:
      'We had several old windows replaced and the difference is incredible. Everything was installed cleanly and professionally, and they made sure the trim and sealing looked perfect. Very reliable company and easy to work with.',
  },
  {
    name: 'Jonathan K.',
    feedback:
      'Highly recommend REDCORE’s door installation services. They installed our new front entry quickly and made sure everything closed perfectly and sealed. Great attention to detail and a respectful team.',
  },
  {
    name: 'Kelly G.',
    feedback:
      'Would highly recommend. Great service and value. Their communication was amazing and I’m very grateful they were willing to help me out. Thank you!',
  },
  {
    name: 'James R.',
    feedback:
      'Top-notch core drilling service. Clean cuts, no mess, and very reasonable rates. The crew was friendly and knew exactly what they were doing.',
  },
  {
    name: 'Anna P.',
    feedback:
      'Called on short notice and they showed up the next day. Professional from start to finish. Great communication throughout the entire process.',
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
        <Marquee pauseOnHover className="[--duration:70s] [--gap:1.25rem]">
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
