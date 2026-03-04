function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(target: number, duration = 800) {
  const start = window.scrollY;
  const distance = target - start;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function scrollToId(id: string, align: 'center' | 'top' = 'center') {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const elementTop = window.scrollY + rect.top;

  if (align === 'top') {
    const navbarHeight = 80;
    smoothScrollTo(Math.max(0, elementTop - navbarHeight));
  } else {
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;
    const scrollTarget = elementTop - (windowHeight / 2) + (elementHeight / 2);
    smoothScrollTo(Math.max(0, scrollTarget));
  }
}

export function scrollToSection(e: React.MouseEvent, id: string, align: 'center' | 'top' = 'center') {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    scrollToId(id, align);
  } else {
    window.location.href = `/#${id}`;
  }
}
