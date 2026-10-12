import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down';

interface UseScrollDirectionOptions {
  /** Minimum scroll delta (px) before direction changes. Prevents jitter. Default: 10 */
  threshold?: number;
  /** Scroll position (px) below which the navbar is always shown. Default: 80 */
  topOffset?: number;
}

/**
 * Tracks vertical scroll direction with a deadzone threshold.
 * Returns 'up' when scrolling up or near the top, 'down' when scrolling down.
 *
 * Uses requestAnimationFrame to coalesce scroll events and avoid forced reflows.
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollDirection {
  const { threshold = 10, topOffset = 80 } = options;

  const [direction, setDirection] = useState<ScrollDirection>('up');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateDirection = () => {
      const currentY = window.scrollY;

      // Always show navbar near the top of the page
      if (currentY < topOffset) {
        setDirection('up');
        lastScrollY.current = currentY;
        ticking.current = false;
        return;
      }

      const delta = currentY - lastScrollY.current;

      // Only update if scroll delta exceeds the deadzone threshold
      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? 'down' : 'up');
        lastScrollY.current = currentY;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateDirection);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, topOffset]);

  return direction;
}
