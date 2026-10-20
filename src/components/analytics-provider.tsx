'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import {
  initClientTrackingContext,
  trackButtonClick,
  trackPageTimeSpent,
  trackPageView,
  trackScrollDepth,
  trackSectionTimeSpent,
  trackSectionView,
  trackViewService,
} from '@/lib/tracking';

const META_TRACKING_ENABLED =
  process.env.META_TRACKING_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_META_TRACKING_ENABLED === 'true';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

const SERVICE_PAGE_NAMES: Record<string, string> = {
  '/core-drilling': 'Core Drilling',
  '/slab-cutting': 'Slab Cutting',
  '/demolition-cutting': 'Demolition & Cutting',
  '/wall-saw-cutting': 'Wall Saw Cutting',
  '/concrete-restoration': 'Concrete Restoration',
};

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];
const TIME_MILESTONES_SECONDS = [15, 30, 60, 120, 300];

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const maxScrollRef = useRef(0);
  const firedScrollMilestonesRef = useRef<Set<number>>(new Set());

  // 1. PageView, Service View, Scroll Depth, Page Time & Section Dwell Time per route
  useEffect(() => {
    const currentPath = pathname || '/';
    maxScrollRef.current = 0;
    firedScrollMilestonesRef.current = new Set();

    // Ensure client IP / geo context is loaded before firing initial page_view
    initClientTrackingContext().finally(() => {
      trackPageView(currentPath);

      // Fire ViewService if on one of the 5 service pages
      const serviceName = SERVICE_PAGE_NAMES[currentPath];
      if (serviceName) {
        trackViewService(serviceName, currentPath);
      }
    });

    // --- Scroll Depth Tracking ---
    const computeScrollPercent = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return 100;
      return Math.min(
        100,
        Math.max(0, Math.round((scrollTop / scrollableHeight) * 100)),
      );
    };

    const handleScroll = () => {
      const pct = computeScrollPercent();
      if (pct > maxScrollRef.current) {
        maxScrollRef.current = pct;
      }
      for (const milestone of SCROLL_MILESTONES) {
        if (
          pct >= milestone &&
          !firedScrollMilestonesRef.current.has(milestone)
        ) {
          firedScrollMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Active Time on Page Tracking ---
    let activeSeconds = 0;
    let pageLeaveFlushed = false;
    const firedTimeMilestones = new Set<number>();

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        activeSeconds += 1;
        if (
          TIME_MILESTONES_SECONDS.includes(activeSeconds) &&
          !firedTimeMilestones.has(activeSeconds)
        ) {
          firedTimeMilestones.add(activeSeconds);
          trackPageTimeSpent({
            durationSeconds: activeSeconds,
            maxScrollPercent: maxScrollRef.current,
            triggerType: 'milestone',
          });
        }
      }
    }, 1000);

    // --- Section Visibility & Dwell Time Tracking (IntersectionObserver) ---
    const activeSectionTimers = new Map<string, number>();
    const viewedSectionsOnPage = new Set<string>();

    const flushSectionTimer = (sectionId: string, useBeacon = false) => {
      const startTime = activeSectionTimers.get(sectionId);
      if (startTime !== undefined) {
        activeSectionTimers.delete(sectionId);
        const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
        if (elapsedSeconds >= 1) {
          trackSectionTimeSpent(sectionId, elapsedSeconds, useBeacon);
        }
      }
    };

    const flushAllSections = (useBeacon = false) => {
      for (const sectionId of Array.from(activeSectionTimers.keys())) {
        flushSectionTimer(sectionId, useBeacon);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.id;
          if (!sectionId) continue;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (!activeSectionTimers.has(sectionId)) {
              activeSectionTimers.set(sectionId, Date.now());
            }
            if (!viewedSectionsOnPage.has(sectionId)) {
              viewedSectionsOnPage.add(sectionId);
              trackSectionView(sectionId);
            }
          } else {
            flushSectionTimer(sectionId, false);
          }
        }
      },
      { threshold: [0, 0.35] },
    );

    // Observe all sections with an ID and the footer
    const sectionElements = document.querySelectorAll(
      'section[id], footer[id]',
    );
    sectionElements.forEach((el) => observer.observe(el));

    const flushPageLeave = (useBeacon: boolean) => {
      if (pageLeaveFlushed) return;
      pageLeaveFlushed = true;
      flushAllSections(useBeacon);
      if (activeSeconds >= 1) {
        trackPageTimeSpent({
          durationSeconds: activeSeconds,
          maxScrollPercent: maxScrollRef.current,
          triggerType: 'page_leave',
          useBeacon,
        });
      }
    };

    const handlePageHide = () => {
      flushPageLeave(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushAllSections(true);
      } else if (document.visibilityState === 'visible') {
        // Restart timers for currently visible sections
        sectionElements.forEach((el) => {
          if (!el.id) return;
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const visiblePx =
            Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
          if (visiblePx > 0 && visiblePx / Math.max(rect.height, 1) >= 0.35) {
            activeSectionTimers.set(el.id, Date.now());
          }
        });
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.clearInterval(intervalId);
      observer.disconnect();
      flushPageLeave(false);
    };
  }, [pathname]);

  // 2. Global Button & Link Click Listener
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a') as
        | HTMLButtonElement
        | HTMLAnchorElement
        | null;
      if (!clickable) return;

      const rawText =
        clickable.getAttribute('aria-label') ||
        clickable.textContent?.replace(/\s+/g, ' ').trim() ||
        'icon_button';
      const buttonText = rawText.slice(0, 80);

      // Determine section context
      const dialogEl = clickable.closest('[role="dialog"]');
      const sectionEl = clickable.closest('section[id], footer[id], header');
      let sectionId = 'page';
      if (dialogEl) {
        sectionId = 'dialog';
      } else if (sectionEl) {
        sectionId =
          sectionEl.id || sectionEl.tagName.toLowerCase();
      }

      const href =
        clickable instanceof HTMLAnchorElement
          ? clickable.getAttribute('href') || undefined
          : undefined;

      trackButtonClick({
        buttonText,
        sectionId,
        destinationUrl: href,
      });
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, {
        capture: true,
      });
    };
  }, []);

  if (!META_TRACKING_ENABLED || !META_PIXEL_ID) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
      `}
    </Script>
  );
}
