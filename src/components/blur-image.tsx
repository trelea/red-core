'use client';

/**
 * next/image wrapper with a branded loading state:
 *
 *  - while the image downloads, a small CENTERED SQUARE loader is shown — a soft
 *    red/white brand tile (derived from the logo icon) with a spinner on top.
 *    It is NOT full-bleed; it's a compact square, the same in the grid and the
 *    full-screen lightbox.
 *  - the real image fades in once it loads.
 *  - images the browser already has cached skip the loader entirely (no blur/
 *    spinner flash when re-viewing an image, e.g. paging back in the lightbox).
 *
 * Works with `fill` and `unoptimized`. The parent element must be `relative` so
 * the loader overlay positions over the image. Pair with a long-lived
 * Cache-Control on the media route (see next.config.ts) so cached detection and
 * instant repeat views actually work.
 */
import { useEffect, useRef, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// One hardcoded blur for all images — a small SQUARE tile derived from the brand
// icon (public/android-chrome-512x512.png): a soft red/white brand block.
export const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAABBQEBAQAAAAAAAAAAAAABAAQFERICFCL/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBv/EABkRAAEFAAAAAAAAAAAAAAAAAAAREyEjYf/aAAwDAQACEQMRAD8AnxzAvSRqgEkY/wARH1q0jpDxarnVpIPy9IvmqR4Qo7HMP//Z';

export function BlurImage({ className, onLoad, onError, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // When the src changes (incl. first mount), if the browser already has the
  // image decoded/cached, mark it loaded immediately — no loader flash for a
  // previously-viewed image.
  useEffect(() => {
    const img = ref.current;
    setLoaded(Boolean(img?.complete && img.naturalWidth > 0));
  }, [props.src]);

  return (
    <>
      <Image
        {...props}
        ref={ref}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(
          className,
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
      {!loaded && (
        <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <span className="relative flex aspect-square w-2/5 max-w-[140px] items-center justify-center overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BLUR_DATA_URL}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
            />
            <Loader2 className="relative size-6 animate-spin text-white" />
          </span>
        </span>
      )}
    </>
  );
}
