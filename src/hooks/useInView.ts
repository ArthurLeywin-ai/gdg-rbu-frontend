import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseInViewOptions<T extends HTMLElement = HTMLElement> {
  /** IntersectionObserver threshold (0–1) or array of thresholds. Default: 0.1 */
  threshold?: number | number[];
  /** Root margin for early/late triggering. Default: '0px' */
  rootMargin?: string;
  /**
   * If true, observer permanently disconnects after first entrance.
   * If false (default), replays entrance animation when re-entering while scrolling down or up.
   * Default: false
   */
  triggerOnce?: boolean;
  /**
   * Optional external RefObject to observe instead of creating an internal ref.
   * Allows sharing refs with other hooks (e.g. useCardTilt) without wrapper DOM elements.
   */
  targetRef?: RefObject<T | null>;
}

type PlacementState = 'offscreen_below' | 'offscreen_above' | 'in_view';

/**
 * Tracks whether a section element is visible in the viewport using IntersectionObserver.
 *
 * Implements a robust bi-directional reveal state machine:
 * 1. Scrolling down into a section triggers its entrance animation.
 * 2. Scrolling up into the same section triggers its entrance animation again.
 * 3. Once a section completely exits the viewport in EITHER direction (above or below),
 *    it re-arms for the next genuine entry when triggerOnce is false.
 * 4. Content never repeatedly restarts animations while remaining visible on-screen.
 * 5. Uses a dual-metric entry criterion (intersection ratio OR minimum visible pixel overlap)
 *    so tall sections reliably trigger even if they cannot reach a fixed 15% ratio.
 * 6. Uses strict boundary hysteresis (entry >= 48px/ratio, exit strictly outside rootBounds)
 *    to prevent boundary flicker or trackpad micro-jitter.
 * 7. Sections visible on initial load smoothly play their entrance animation without flash.
 * 8. Hash navigation, popstate/history, keyboard focusin, prefers-reduced-motion,
 *    and observer failure fail open to visible content immediately.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions<T> = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false, targetRef } = options;

  const internalRef = useRef<T | null>(null);
  const ref = targetRef ?? internalRef;
  const [isInView, setIsInView] = useState(false);
  const placementRef = useRef<PlacementState>('offscreen_below');
  const hasBeenRevealed = useRef(false);
  const isInitialNotification = useRef(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let initialRafId: number | null = null;
    let observer: IntersectionObserver | null = null;

    // 1. Fail-open fallback: if IntersectionObserver is unsupported, reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      placementRef.current = 'in_view';
      hasBeenRevealed.current = true;
      setIsInView(true);
      return;
    }

    // 2. Reduced motion check: reveal immediately without animation
    let mediaQuery: MediaQueryList | null = null;
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        placementRef.current = 'in_view';
        hasBeenRevealed.current = true;
        setIsInView(true);
      }
    };

    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
          placementRef.current = 'in_view';
          hasBeenRevealed.current = true;
          setIsInView(true);
          return;
        }
        if (typeof mediaQuery.addEventListener === 'function') {
          mediaQuery.addEventListener('change', handleMotionChange);
        } else if (typeof (mediaQuery as any).addListener === 'function') {
          (mediaQuery as any).addListener(handleMotionChange);
        }
      }
    } catch {
      // Ignore matchMedia error if unsupported
    }

    // 3. Direct fragment & history target check on mount and URL changes
    const syncHashAndTarget = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        let rawTargetId = hash.slice(1);
        try {
          rawTargetId = decodeURIComponent(rawTargetId);
        } catch {
          // Fall back to un-decoded rawTargetId if malformed URI component (URIError)
        }

        // Check if section itself is targeted
        if (element.id === rawTargetId) {
          placementRef.current = 'in_view';
          hasBeenRevealed.current = true;
          setIsInView(true);
          return;
        }

        // Check if a descendant element inside this section is targeted
        const targetElement = document.getElementById(rawTargetId);
        if (targetElement && element.contains(targetElement)) {
          placementRef.current = 'in_view';
          hasBeenRevealed.current = true;
          setIsInView(true);
        }
      }
    };
    syncHashAndTarget();

    window.addEventListener('hashchange', syncHashAndTarget);
    window.addEventListener('popstate', syncHashAndTarget);

    // 4. Keyboard focus listener: when focus enters section, immediately reveal
    const handleFocusIn = () => {
      placementRef.current = 'in_view';
      hasBeenRevealed.current = true;
      setIsInView(true);
    };
    element.addEventListener('focusin', handleFocusIn);

    // Normalize thresholds into an array including 0, fine progressive steps, and the target ratios.
    // Progressive steps allow tall mobile elements to trigger the pixel overlap metric (>= 48px)
    // without waiting for an oversized ratio threshold.
    const targetThresholds: number[] = Array.isArray(threshold) ? threshold : [threshold];
    const maxThreshold = Math.max(...targetThresholds, 0.1);
    const baseSteps = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.15, 0.2, 0.25, 0.3];
    const progressiveSteps = baseSteps.filter((s) => s <= maxThreshold);
    const normalizedThresholds = Array.from(
      new Set([...progressiveSteps, ...targetThresholds, 0])
    ).sort((a, b) => a - b);
    const entryThreshold = Array.isArray(threshold) ? (threshold[0] ?? 0.1) : threshold;

    try {
      observer = new IntersectionObserver(
        ([entry], obs) => {
          if (!entry) return;

          const rootTop = entry.rootBounds ? entry.rootBounds.top : 0;
          const rootBottom = entry.rootBounds
            ? entry.rootBounds.bottom
            : (typeof window !== 'undefined' ? window.innerHeight : 0);
          const rect = entry.boundingClientRect;
          const intersectionHeight = entry.intersectionRect ? entry.intersectionRect.height : 0;

          // Dual-metric entry criterion:
          // 1. Ratio metric: intersectionRatio >= target threshold
          // 2. Pixel overlap metric: tall sections trigger once 48px (or 25% of height) is visible
          // 3. Viewport-spanning guard: element top is above root and bottom is below root
          const isRatioMet = entry.intersectionRatio >= entryThreshold;
          const isPixelOverlapMet = intersectionHeight >= Math.min(48, Math.max(rect.height * 0.25, 1));
          const isSpanningViewport = rect.top <= rootTop && rect.bottom >= rootBottom;
          const isEntryQualified = entry.isIntersecting && (isRatioMet || isPixelOverlapMet || isSpanningViewport);

          // Case A: Initial Notification upon observing element
          if (isInitialNotification.current) {
            isInitialNotification.current = false;

            // Section is visible on initial load
            if (entry.isIntersecting) {
              placementRef.current = 'in_view';
              hasBeenRevealed.current = true;

              // Defer state update by one animation frame so that the component renders
              // its initial pre-entrance pose before is-revealed is applied. This allows
              // the CSS entrance transition to play smoothly rather than skipping.
              initialRafId = requestAnimationFrame(() => {
                setIsInView(true);
                if (triggerOnce) {
                  obs.unobserve(element);
                }
              });
              return;
            }

            // Section is above the viewport on initial load (e.g. refreshed partway down)
            if (rect.bottom <= rootTop) {
              if (triggerOnce) {
                placementRef.current = 'in_view';
                hasBeenRevealed.current = true;
                setIsInView(true);
                obs.unobserve(element);
                return;
              }
              // Armed for upward scroll re-entry
              placementRef.current = 'offscreen_above';
              hasBeenRevealed.current = true;
              setIsInView(false);
              return;
            }

            // Section is below the fold: remain in pre-entrance state off-screen
            placementRef.current = 'offscreen_below';
            setIsInView(false);
            return;
          }

          // Case B: Element Enters Viewport (from below OR from above)
          if (isEntryQualified) {
            if (placementRef.current !== 'in_view') {
              placementRef.current = 'in_view';
              hasBeenRevealed.current = true;
              setIsInView(true);

              if (triggerOnce) {
                obs.unobserve(element);
              }
            }
            return;
          }

          // Case C: Element Exits Viewport completely
          if (!entry.isIntersecting) {
            // Subcase C1: Exited Above the Viewport (user scrolled down past it)
            if (rect.bottom <= rootTop) {
              if (placementRef.current !== 'offscreen_above') {
                placementRef.current = 'offscreen_above';
                if (!triggerOnce) {
                  // Re-arm for replay when scrolling back up into this section
                  setIsInView(false);
                }
              }
              return;
            }

            // Subcase C2: Exited Below the Viewport (user scrolled up past it)
            if (rect.top >= rootBottom) {
              if (placementRef.current !== 'offscreen_below') {
                placementRef.current = 'offscreen_below';
                if (!triggerOnce) {
                  // Re-arm for replay when scrolling back down into this section
                  setIsInView(false);
                }
              }
              return;
            }
          }
        },
        { threshold: normalizedThresholds, rootMargin }
      );

      observer.observe(element);
    } catch {
      // Fail open to visible content if observer initialization throws
      placementRef.current = 'in_view';
      hasBeenRevealed.current = true;
      setIsInView(true);
      return () => {
        window.removeEventListener('hashchange', syncHashAndTarget);
        window.removeEventListener('popstate', syncHashAndTarget);
        element.removeEventListener('focusin', handleFocusIn);
        if (mediaQuery) {
          if (typeof mediaQuery.removeEventListener === 'function') {
            mediaQuery.removeEventListener('change', handleMotionChange);
          } else if (typeof (mediaQuery as any).removeListener === 'function') {
            (mediaQuery as any).removeListener(handleMotionChange);
          }
        }
      };
    }

    return () => {
      if (initialRafId !== null) {
        cancelAnimationFrame(initialRafId);
      }
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('hashchange', syncHashAndTarget);
      window.removeEventListener('popstate', syncHashAndTarget);
      element.removeEventListener('focusin', handleFocusIn);
      if (mediaQuery) {
        if (typeof mediaQuery.removeEventListener === 'function') {
          mediaQuery.removeEventListener('change', handleMotionChange);
        } else if (typeof (mediaQuery as any).removeListener === 'function') {
          (mediaQuery as any).removeListener(handleMotionChange);
        }
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}
