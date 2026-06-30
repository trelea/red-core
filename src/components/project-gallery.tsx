'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { oswald } from '@/lib/fonts';
import { ImageLightbox } from '@/components/image-lightbox';

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProjectGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="projects">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-[120px] 2xl:px-[160px]">
        <h2
          className={cn(
            oswald.className,
            'mb-10 text-[20px] font-bold text-[#1E2C32] sm:text-[24px]',
          )}
        >
          Project gallery:
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative h-[200px] cursor-zoom-in overflow-hidden sm:h-[250px] lg:h-[294px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}

          <div className="flex h-[200px] items-center justify-center gap-4 bg-[#E0E0E2] sm:h-[250px] lg:h-[294px]">
            <span
              className={cn(
                oswald.className,
                'text-[24px] font-bold text-[#1E2C32]',
              )}
            >
              More photos
            </span>
            <ChevronRight className="size-5 text-[#1E2C32]" />
          </div>
        </div>
      </div>

      <ImageLightbox
        images={images}
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
      />
    </section>
  );
}
