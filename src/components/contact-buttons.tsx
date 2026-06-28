'use client';

import { useRef, useState } from 'react';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackPhoneClick } from '@/lib/gtag';

const MAX_WIDTH = 280; // px the value slides out to when fully open
const DRAG_GAIN = 1.8; // panel moves faster than the finger for a snappier feel
const COMMIT_PX = 24; // small drag distance that already snaps open/closed

interface ContactItemProps {
  small: boolean;
  icon: React.ReactNode;
  value: string;
  href: string;
  /** Accessible label for the toggle/icon button */
  toggleLabel: string;
  /** Accessible label for the value link */
  linkLabel: string;
  onLinkClick?: () => void;
  /** Extra props for the value <a> (e.g. rel) */
  linkRel?: string;
}

/**
 * A single hero contact CTA. Starts closed (icon only). The value slides open
 * by either dragging/swiping the icon left↔right (snaps open/closed on release)
 * or tapping the icon to toggle. Clicking the revealed value fires the action.
 */
function ContactItem({
  small,
  icon,
  value,
  href,
  toggleLabel,
  linkLabel,
  onLinkClick,
  linkRel,
}: ContactItemProps) {
  const [open, setOpen] = useState(false);
  // Live width (px) while dragging; null when resting (class-driven + animated).
  const [dragWidth, setDragWidth] = useState<number | null>(null);

  const startX = useRef(0);
  const lastDelta = useRef(0);
  const moved = useRef(false);
  // True when the gesture ended in a drag, so the trailing click is ignored.
  const suppressClick = useRef(false);

  const padTarget = small ? 20 : 28; // pr-5 / pr-7

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragWidth(open ? MAX_WIDTH : 0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    // Pills are right-anchored, so the value slides out to the LEFT of the
    // pointer — dragging left (negative delta) opens, dragging right closes.
    const delta = e.clientX - startX.current;
    lastDelta.current = delta;
    if (Math.abs(delta) > 4) moved.current = true;
    const base = open ? MAX_WIDTH : 0;
    const next = Math.max(0, Math.min(MAX_WIDTH, base - delta * DRAG_GAIN));
    setDragWidth(next);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (moved.current) {
      // A small drag in either direction already commits: left opens, right
      // closes. Tiny nudges fall back to whichever side we're closest to.
      if (lastDelta.current <= -COMMIT_PX) setOpen(true);
      else if (lastDelta.current >= COMMIT_PX) setOpen(false);
      else setOpen((dragWidth ?? 0) > MAX_WIDTH / 2);
      suppressClick.current = true;
    }
    setDragWidth(null);
  };

  const onClick = () => {
    // Ignore the synthetic click that follows a drag gesture.
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setOpen((v) => !v);
  };

  const dragging = dragWidth !== null;
  const valueStyle = dragging
    ? {
        maxWidth: `${dragWidth}px`,
        paddingRight: `${(dragWidth / MAX_WIDTH) * padTarget}px`,
      }
    : undefined;

  return (
    <div
      className={cn(
        'flex items-center overflow-hidden rounded-l-full bg-[#FFFFFF73] text-black shadow-lg backdrop-blur-sm',
        small ? 'h-[54px]' : 'h-[64px]',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label={toggleLabel}
        aria-expanded={open}
        className={cn(
          'flex shrink-0 cursor-pointer touch-pan-y select-none items-center justify-center transition-colors hover:bg-white/40',
          small ? 'h-[54px] w-[72px]' : 'h-[64px] w-[93px]',
        )}
      >
        {icon}
      </button>
      {/* Slides out to the right of the icon; click to perform the action */}
      <a
        href={href}
        onClick={onLinkClick}
        rel={linkRel}
        aria-label={linkLabel}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open && !dragging}
        style={valueStyle}
        className={cn(
          'overflow-hidden whitespace-nowrap font-semibold',
          !dragging && 'transition-[max-width,padding] duration-300 ease-out',
          !dragging &&
            (open
              ? small
                ? 'max-w-[280px] pr-5'
                : 'max-w-[280px] pr-7'
              : 'max-w-0'),
          small ? 'text-[13px]' : 'text-sm',
        )}
      >
        {value}
      </a>
    </div>
  );
}

/**
 * Phone / Mail CTAs used in the hero. Both start closed (icon only) and slide
 * open via drag/swipe or tap. The icons are always rendered.
 */
export default function ContactButtons({ small = false }: { small?: boolean }) {
  return (
    <>
      <ContactItem
        small={small}
        icon={<MailIcon className={small ? 'size-6' : 'size-[26px]'} />}
        value="redcoreusa@gmail.com"
        href="mailto:redcoreusa@gmail.com"
        toggleLabel="Toggle email address"
        linkLabel="Email us"
      />
      <ContactItem
        small={small}
        icon={
          <PhoneIcon
            className={cn('text-black', small ? 'size-6' : 'size-7')}
          />
        }
        value="(413)-666-2026"
        href="tel:+14136662026"
        toggleLabel="Toggle phone number"
        linkLabel="Call us"
        onLinkClick={trackPhoneClick}
      />
    </>
  );
}
