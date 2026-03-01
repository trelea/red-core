"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { oswald } from "@/lib/fonts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProjectGallery({ images }: Props) {
  const displayImages = images.slice(0, 5);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  function goToPrevious() {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }

  function goToNext() {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }

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
  }, [selectedIndex]);

  return (
    <section>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-[120px] lg:py-20 xl:px-[160px]">
        <h2
          className={cn(
            oswald.className,
            "mb-10 text-[20px] font-bold text-[#1E2C32] sm:text-[24px]"
          )}
        >
          Project gallery:
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="relative h-[200px] cursor-pointer overflow-hidden sm:h-[250px] lg:h-[294px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}

          <div className="flex h-[200px] items-center justify-center gap-4 bg-[#E0E0E2] sm:h-[250px] lg:h-[294px]">
            <span
              className={cn(
                oswald.className,
                "text-[24px] font-bold text-[#1E2C32]"
              )}
            >
              More photos
            </span>
            <ChevronRight className="size-5 text-[#1E2C32]" />
          </div>
        </div>
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="!inset-0 !h-full !w-full !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-none !bg-black/80 !p-0 !gap-0"
        >
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? images[selectedIndex].alt : "Image preview"}
          </DialogTitle>

          <DialogClose className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40">
            <X className="size-6" />
          </DialogClose>

          {selectedIndex !== null && (
            <div
              className="relative flex h-full flex-col"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative flex flex-1 items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 z-10 size-12 rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <ChevronLeft className="size-7" />
                </Button>

                <div className="relative h-[calc(100vh-140px)] w-full">
                  <Image
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 z-10 size-12 rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <ChevronRight className="size-7" />
                </Button>
              </div>

              <div className="flex justify-center gap-2 py-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "relative h-12 w-16 overflow-hidden rounded-sm border-2 transition-opacity sm:h-16 sm:w-24",
                      selectedIndex === index
                        ? "border-white opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
