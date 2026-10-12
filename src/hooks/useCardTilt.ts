import { useRef, useCallback, useEffect } from 'react';

export interface CardTiltOptions {
  /** Maximum rotation angle around X axis (tilting up/down) in degrees */
  maxTiltX?: number;
  /** Maximum rotation angle around Y axis (tilting left/right) in degrees */
  maxTiltY?: number;
  /** CSS perspective distance in pixels */
  perspective?: number;
  /** Whether to compute normalized pointer coordinates for specular glare */
  glare?: boolean;
  /** Elevation offset on hover in pixels */
  lift?: { x: number; y: number };
}

/**
 * useCardTilt
 * High-performance, lightweight pointer-tracking 3D tilt hook inspired by studio-grade
 * interaction design (Lusion). Translates cursor position into CSS variables (--tilt-x, --tilt-y,
 * --mouse-x, --mouse-y, --lift-x, --lift-y) with zero external dependencies and smooth
 * spring-damped recovery on pointer leave.
 */
export function useCardTilt<T extends HTMLElement = HTMLDivElement>(
  options: CardTiltOptions = {}
) {
  const {
    maxTiltX = 4.5,
    maxTiltY = 5.0,
    perspective = 1000,
    glare = true,
    lift = { x: -2, y: -2 },
  } = options;

  const elementRef = useRef<T | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      // Ignore touch devices to preserve standard touch scrolling
      if (e.pointerType === 'touch') return;

      // Respect prefers-reduced-motion preference
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const el = elementRef.current;
      if (!el) return;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Normalized relative coordinates from center: -1 (left/top) to +1 (right/bottom)
        const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        const clampedX = Math.max(-1, Math.min(1, px));
        const clampedY = Math.max(-1, Math.min(1, py));

        // Pitch (rotateX) tilts backwards when cursor is at bottom, so negate clampedY
        const tiltX = -(clampedY * maxTiltX).toFixed(2);
        // Yaw (rotateY) tilts backwards when cursor is at right
        const tiltY = (clampedX * maxTiltY).toFixed(2);

        el.style.setProperty('--tilt-x', `${tiltX}deg`);
        el.style.setProperty('--tilt-y', `${tiltY}deg`);
        el.style.setProperty('--lift-x', `${lift.x}px`);
        el.style.setProperty('--lift-y', `${lift.y}px`);

        if (glare) {
          const mouseX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)).toFixed(1);
          const mouseY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)).toFixed(1);
          el.style.setProperty('--mouse-x', `${mouseX}%`);
          el.style.setProperty('--mouse-y', `${mouseY}%`);
        }
      });
    },
    [maxTiltX, maxTiltY, glare, lift.x, lift.y]
  );

  const handlePointerEnter = useCallback((e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    el.setAttribute('data-tilting', 'true');
    // Fast tracking transition while pointer is moving inside the card
    el.style.setProperty('--card-transition-speed', '60ms');
  }, []);

  const handlePointerLeave = useCallback((e: PointerEvent) => {
    if (e.pointerType === 'touch') return;

    const el = elementRef.current;
    if (!el) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    el.removeAttribute('data-tilting');
    // Silky spring-like inertial recovery on mouse leave
    el.style.setProperty('--card-transition-speed', '350ms');
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--lift-x', '0px');
    el.style.setProperty('--lift-y', '0px');
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.setProperty('--perspective', `${perspective}px`);
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--lift-x', '0px');
    el.style.setProperty('--lift-y', '0px');
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');

    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [handlePointerEnter, handlePointerMove, handlePointerLeave, perspective]);

  return elementRef;
}
