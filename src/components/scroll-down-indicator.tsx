'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Experimental animated "scroll down" cue, pinned center-bottom. Visible only
 * while the user is in the hero view (near the top); fades out as soon as they
 * begin scrolling. Clicking it smooth-scrolls one 90vh step down.
 */
export default function ScrollDownIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hidden once the user scrolls past a small threshold (left the hero view).
    const onScroll = () => setVisible(window.scrollY < 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll down"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-opacity duration-500 ease-out',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-white/50 text-[#c70017]/75 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/70 motion-safe:animate-[soft-bounce_1.8s_ease-in-out_infinite]">
        <ChevronDown className="size-6" />
      </span>
    </button>
  );
}
