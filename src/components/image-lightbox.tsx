'use client';

/**
 * Reusable full-screen image lightbox built on the shadcn Dialog.
 *
 * Controlled by `index`: pass a number to open on that image, or `null` to
 * close. Supports prev/next arrows, keyboard arrows, touch swipe and a
 * thumbnail strip. Shared by the projects carousel and the project gallery.
 */
import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { BlurImage } from '@/components/blur-image';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or `null` when closed. */
  index: number | null;
  /** Receives the new index, or `null` to close. */
  onIndexChange: (index: number | null) => void;
}

export function ImageLightbox({
  images,
  index,
  onIndexChange,
}: ImageLightboxProps) {
  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToPrevious = useCallback(() => {
    if (index === null) return;
    onIndexChange(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, onIndexChange]);

  const goToNext = useCallback(() => {
    if (index === null) return;
    onIndexChange(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length, onIndexChange]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    if (diff > minSwipe) {
      goToNext();
    } else if (diff < -minSwipe) {
      goToPrevious();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNext, goToPrevious]);

  const hasMultiple = images.length > 1;

  return (
    <Dialog
      open={index !== null}
      onOpenChange={(open) => {
        if (!open) onIndexChange(null);
      }}
    >
      <DialogContent
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') goToPrevious();
          if (e.key === 'ArrowRight') goToNext();
        }}
        className="!inset-0 !h-full !w-full !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-none !bg-black/80 !p-0 !gap-0"
      >
        <DialogTitle className="sr-only">
          {index !== null ? images[index].alt : 'Image preview'}
        </DialogTitle>

        <DialogClose className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40">
          <X className="size-6" />
        </DialogClose>

        {index !== null && (
          <div
            className="relative flex h-full flex-col"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative flex flex-1 items-center justify-center">
              {hasMultiple && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 z-10 size-12 rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <ChevronLeft className="size-7" />
                </Button>
              )}

              <div className="relative h-[calc(100vh-140px)] w-full">
                <BlurImage
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  // Media is already a <=1024px WebP in R2; serve it directly
                  // instead of paying an on-demand full-screen AVIF encode.
                  unoptimized
                  className="object-contain"
                />
              </div>

              {hasMultiple && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 z-10 size-12 rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <ChevronRight className="size-7" />
                </Button>
              )}
            </div>

            {hasMultiple && (
              <div className="flex justify-center gap-2 py-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onIndexChange(i)}
                    className={cn(
                      'relative h-12 w-16 overflow-hidden rounded-sm border-2 transition-opacity sm:h-16 sm:w-24',
                      index === i
                        ? 'border-white opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80',
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
