import Image from 'next/image';
import { cn } from '@/lib/utils';
import { inter, microgramma } from '@/lib/fonts';
import ContactButtons from '@/components/contact-buttons';
import HeroActions from '@/components/hero-actions';

interface HeroProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  /**
   * How the passed `image` is treated on phones (below lg):
   * - 'illustration' (default): a transparent SVG drawing layered behind the
   *   text, scaled up and faded in.
   * - 'photo': an opaque photograph rendered as its own full-width band below
   *   the text (never overlapping it), edge-to-edge with a soft fade from the
   *   gray text band. Desktop layout is identical for both.
   */
  imageStyle?: 'illustration' | 'photo';

  // Optional props to control what is rendered
  render_desc?: boolean;
  render_buttons?: boolean;
}

export default function Hero({
  title = (
    <>
      Concrete
      <br />
      cutting
      <br />
      experts
    </>
  ),
  description = 'Professional concrete cutting, core drilling, slab sawing, and controlled demolition with clean results, precise work, and reliable scheduling.',
  image,
  imageStyle = 'illustration',
  render_desc = true,
  render_buttons = true,
}: HeroProps) {
  // The same image is used on phones (covered background) and desktop (right
  // half). A passed `image` (service pages) overrides the default.
  const desktopImage = image ?? {
    src: '/hero-img-flipped.jpg',
    alt: 'Modern concrete building',
  };
  // Service pages pass a wide (rectangular) image; the default home image is
  // square. On phones the rectangle is scaled up ~50% so it reads as large as
  // the square, and the gray fade overlay is sized to match.
  const hasImage = !!image;
  // Title-only mode (used by the service pages) — nudge the band a touch less.
  const compact = !render_desc && !render_buttons;
  // Service-page layout: a description but no CTA buttons. These pages use short,
  // wide (rectangular) illustrations, so instead of the home page's full-height
  // centered band we size the hero to its content and pin it just under the
  // navbar, with the image absolutely centered in the right half.
  const service = render_desc && !render_buttons;
  // Opaque photo on phones: stack text over an in-flow image band instead of
  // layering the image behind the text.
  const photo = hasImage && imageStyle === 'photo';
  return (
    <section
      className={cn(
        microgramma.variable,
        'relative isolate w-screen overflow-hidden bg-[#d9d9d9] sm:h-auto sm:w-auto lg:min-h-0 lg:max-h-screen',
        // Phones: full-screen for the full hero, half-screen for title-only.
        compact ? 'h-[50vh] sm:min-h-[420px]' : 'h-screen sm:min-h-[700px]',
        // Photo band: column layout that grows past the viewport if the text
        // needs the room, so the photo is never overlapped by the copy.
        photo && 'flex h-auto min-h-screen flex-col lg:block',
      )}
    >
      {/* Mobile (below lg): the FULL image fills the section from the top edge
          down. The gradient overlay below keeps the upper area legible for the
          navbar/title without leaving a gray strip above the image. */}
      <div
        aria-hidden
        className={cn('absolute inset-0 -z-10 lg:hidden', photo && 'hidden')}
      >
        <Image
          src={desktopImage.src}
          alt={desktopImage.alt}
          fill
          priority
          sizes="100vw"
          className={cn(
            'object-contain object-right-bottom',
            // Service rectangle: scale up ~50% so it reads as large as the
            // square home image (extra width is clipped by the section).
            hasImage && 'scale-[1.5] origin-bottom',
          )}
        />
        {/* Fade the image's top edge into the gray section. Bottom-anchored, with
            a height matching the image so the overlay's top lines up with the
            image's top edge: ~100vw for the square, ~85vw for the scaled rectangle. */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#d9d9d9] from-0% via-[#d9d9d9]/60 via-12% to-transparent to-30%',
            hasImage ? 'h-[85vw]' : 'h-[100vw]',
          )}
        />
      </div>

      {/* Desktop (lg+): the image occupies the right half, vertically centered.
          Home: in flow with a 50vw min-height (square photo defines a full-height
          hero). Service: absolute, filling the content-sized section so the
          rectangular illustration is centered without forcing extra height.
          Hidden on mobile (the background layer is used). */}
      <div
        className={cn(
          'hidden lg:flex lg:w-1/2 lg:items-center',
          service
            ? 'absolute inset-y-0 right-0'
            : 'relative lg:ml-auto lg:min-h-[50vw] lg:max-h-screen',
        )}
      >
        <Image
          src={desktopImage.src}
          alt={desktopImage.alt}
          width={722}
          height={754}
          priority
          quality={100}
          sizes="50vw"
          className={cn(
            // Fill the right-half column (cover) and overdraw ~2% vertically only
            // (scale-y). Under fractional display scaling the column can sit a few
            // px below the section top, exposing a strip of the section bg above
            // the image; the vertical overdraw covers it and the section's
            // overflow-hidden clips the excess. scale-y avoids horizontal overflow
            // that would otherwise push the image's left edge past the gradient
            // blend and show as a vertical seam down the middle.
            'h-full w-full scale-y-[1.02] object-cover object-right -z-10',
          )}
        />
        {/* Soft-blend the image's left edge into the gray panel */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#d9d9d9] from-0% via-[#d9d9d9]/50 via-8% to-transparent to-16%"
        />
      </div>

      {/* Content + contacts. Under lg it's a normal in-flow block anchored at the
          top (text sits in the gray band); at lg+ it becomes the absolute,
          vertically-balanced overlay band. */}
      <div
        className={cn(
          'relative w-full pb-12 lg:flex lg:items-start',
          // Phones/small: anchor the content high under the navbar (~15% of the
          // viewport) instead of the middle.
          compact ? 'pt-28' : 'pt-[15vh]',
          service
            ? // In flow: defines the section height; pinned under the navbar.
              'lg:pb-24 lg:pt-32 xl:pb-28 xl:pt-36'
            : // Absolute overlay, vertically centered over the tall image.
              'lg:absolute lg:inset-0 lg:pb-0 lg:pt-32 xl:items-center xl:pt-0',
        )}
      >
        <div
          className={cn(
            'relative w-full',
            service ? '' : compact ? 'xl:translate-y-20' : 'xl:translate-y-10',
          )}
        >
          <div className="container mx-auto px-[30px] lg:px-12 xl:px-[120px] 2xl:px-[160px]">
            <div className="flex max-w-[600px] flex-col 2xl:max-w-[760px]">
              <h1 className="text-[32.48px] font-bold uppercase leading-[1.18] tracking-normal text-[#141414] [font-family:var(--font-microgramma),sans-serif] sm:text-[40px] lg:text-[61px]">
                {title}
              </h1>
              {render_desc && (
                <div
                  className={cn(
                    inter.className,
                    'mt-[25px] max-w-[460px] text-[18px] font-normal leading-none tracking-normal text-[#3a3a3a] lg:mt-8 lg:text-[24px] 2xl:mt-10 2xl:max-w-[580px] 2xl:text-[30px]',
                  )}
                >
                  {description}
                </div>
              )}
              {render_buttons && <HeroActions />}
            </div>
          </div>

          {/* Contacts (desktop, lg+) — flush right, bottom-aligned to the text */}
          <div className="absolute bottom-0 right-0 z-10 hidden flex-col items-end gap-[5px] lg:flex">
            <ContactButtons />
          </div>
        </div>
      </div>

      {/* Photo band (mobile, below lg, photo mode only): fills the remaining
          viewport under the text; the top edge fades in from the gray band. */}
      {photo && (
        <div className="relative w-full flex-1 min-h-[260px] lg:hidden">
          <Image
            src={desktopImage.src}
            alt={desktopImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#d9d9d9] to-transparent"
          />
        </div>
      )}

      {/* Contacts (mobile, below lg) — smaller, pinned to the bottom-right of the
          image where the hero stacks vertically. */}
      <div className="absolute bottom-5 right-0 z-10 flex flex-col items-end gap-[5px] lg:hidden">
        <ContactButtons small />
      </div>
    </section>
  );
}
