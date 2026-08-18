import Image from 'next/image';
import { cn } from '@/lib/utils';
import { inter, microgramma } from '@/lib/fonts';

/**
 * "Our Offers" slide for the Concrete Restoration promotion.
 *
 * The other offers are pre-rendered PNG banners (photo on the left, brand-red
 * panel with a diagonal edge on the right, Microgramma title + Inter body).
 * This one is built in markup so the copy stays editable and stays crisp at
 * every size. The parent (`offers.tsx`) gives it the same aspect box as the
 * image slides (3/2 on phones, 2/1 from md), so it must fill its container.
 */
export default function ConcreteRestorationPromo() {
  return (
    <div
      className={cn(
        microgramma.variable,
        inter.className,
        'relative h-full w-full overflow-hidden bg-[#c70017] text-white',
      )}
    >
      {/* Photo — left side, diagonal right edge like the PNG banners. The copy
          panel below starts at the photo's top-right corner (its widest point),
          so no text can land on the photo anywhere down the diagonal. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[38%] [clip-path:polygon(0_0,100%_0,78%_100%,0_100%)] md:w-[52%] md:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]"
      >
        <Image
          src="/concrete-restoration-img.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 38vw"
          className="object-cover object-[35%_center]"
        />
      </div>

      {/* Price pills — bottom-left over the photo (same idiom as banner_1). */}
      <div className="absolute bottom-[6%] left-[4%] flex flex-col items-start gap-[3%] md:bottom-[8%] md:left-[5%]">
        <span className="rounded-full bg-black px-[0.9em] py-[0.35em] text-[clamp(8.5px,1.7vw,15px)] font-semibold uppercase tracking-wide text-white md:text-[clamp(11px,1.15vw,16px)]">
          + free sealer
        </span>
        <span className="rounded-full bg-white px-[0.9em] py-[0.3em] text-[clamp(14px,3.6vw,30px)] font-bold uppercase leading-none tracking-tight text-[#c70017] [font-family:var(--font-microgramma),sans-serif] md:text-[clamp(20px,2.4vw,34px)]">
          <span className="text-[#14ad00]">25%</span> off
        </span>
      </div>

      {/* Copy — right panel. Below md the fixed 60px right padding keeps the
          text clear of the carousel's floating "next" arrow (right-4 + size-11). */}
      <div className="absolute inset-y-0 left-[40%] right-0 flex flex-col justify-center py-[3%] pl-[3%] pr-[60px] md:left-[54%] md:py-[5%] md:pl-[2%] md:pr-[5%]">
        <h3 className="break-words [text-wrap:pretty] text-[clamp(10.5px,2.8vw,22px)] font-bold uppercase leading-[1.12] tracking-normal [font-family:var(--font-microgramma),sans-serif] md:text-[clamp(16px,2.2vw,32px)]">
          🔥 Get <span className="text-[#14ad00]">25% OFF</span> concrete step
          polishing!
        </h3>
        <p className="mt-[3%] [text-wrap:pretty] text-[clamp(8.5px,2.2vw,15px)] font-normal leading-[1.3] md:mt-[5%] md:text-[clamp(12px,1.5vw,21px)] md:leading-[1.35]">
          Our polishing process removes the old, dirty, and deteriorated
          surface layer, revealing fresh, solid concrete underneath. Your steps
          will look cleaner, smoother, and be easier to maintain.
        </p>
        <p className="mt-[3%] [text-wrap:pretty] text-[clamp(9px,2.3vw,16px)] font-semibold leading-[1.3] md:mt-[5%] md:text-[clamp(12.5px,1.55vw,22px)]">
          🎁 Plus, we&apos;ll apply a protective sealer for FREE!
        </p>
      </div>
    </div>
  );
}
