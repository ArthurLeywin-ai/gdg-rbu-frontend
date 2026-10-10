import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';

interface ShatterPiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  targetY: number;
  targetX: number;
  rotate: number;
  duration: number;
  delay: number;
}

export const App: React.FC = () => {
  const [notice, setNotice] = useState<string | null>(null);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const [shatterPieces, setShatterPieces] = useState<ShatterPiece[]>([]);

  const toastRef = useRef<HTMLElement>(null);
  const isDismissingRef = useRef(false);
  const openTimestampRef = useRef<number>(0);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assemblyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shatterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Common dismissal handler used by: ✕ button, click-outside, and auto-dismiss timeout
  const triggerDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

    // Clear auto-dismiss timer
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }

    const toastEl = toastRef.current;
    if (!toastEl) {
      setNotice(null);
      setIsShattering(false);
      setShatterPieces([]);
      isDismissingRef.current = false;
      return;
    }

    const rect = toastEl.getBoundingClientRect();
    const pieceSize = 20; // ~20px square tiles
    const cols = Math.max(8, Math.min(26, Math.round(rect.width / pieceSize)));
    const rows = Math.max(2, Math.min(5, Math.round(rect.height / pieceSize)));
    const pieceWidth = rect.width / cols;
    const pieceHeight = rect.height / rows;

    const pieces: ShatterPiece[] = [];
    let id = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Upward velocity: strictly negative translateY so pieces never fall downward
        const minUpward = -(rect.top + pieceHeight + 60);
        const targetY = minUpward - (Math.random() * 240);
        const targetX = (Math.random() - 0.5) * 60;
        const rotate = (Math.random() - 0.5) * 60;
        const duration = 520 + Math.random() * 200; // 520ms - 720ms
        const delay = (rows - 1 - r) * 30 + Math.random() * 50; // layered upward stagger

        pieces.push({
          id: id++,
          x: rect.left + c * pieceWidth,
          y: rect.top + r * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          targetY,
          targetX,
          rotate,
          duration,
          delay,
        });
      }
    }

    setShatterPieces(pieces);
    setIsShattering(true);

    if (shatterTimerRef.current) {
      clearTimeout(shatterTimerRef.current);
    }

    shatterTimerRef.current = setTimeout(() => {
      setNotice(null);
      setIsShattering(false);
      setShatterPieces([]);
      isDismissingRef.current = false;
    }, 850);
  }, []);

  const handleJoinClick = useCallback(() => {
    // If a shatter animation is currently running, cancel it
    if (shatterTimerRef.current) {
      clearTimeout(shatterTimerRef.current);
      shatterTimerRef.current = null;
    }
    setIsShattering(false);
    setShatterPieces([]);
    isDismissingRef.current = false;

    setNotice('Official chapter registration is currently pending announcement.');
    openTimestampRef.current = Date.now();

    // Trigger visible column assembly
    setIsAssembling(true);
    if (assemblyTimerRef.current) {
      clearTimeout(assemblyTimerRef.current);
    }
    assemblyTimerRef.current = setTimeout(() => {
      setIsAssembling(false);
    }, 650);

    // Set 4.5 second auto-dismiss
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
    }
    autoDismissTimerRef.current = setTimeout(() => {
      triggerDismiss();
    }, 4500);
  }, [triggerDismiss]);

  // Click-outside-to-dismiss handler
  useEffect(() => {
    if (!notice || isShattering) return;

    const handlePointerDown = (e: MouseEvent) => {
      // Only dismiss on left-click
      if (e.button !== 0) return;
      // Guard against the trigger click that opened the notification
      if (Date.now() - openTimestampRef.current < 150) return;
      // Do not dismiss when clicking inside the notification
      if (toastRef.current && toastRef.current.contains(e.target as Node)) {
        return;
      }
      triggerDismiss();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [notice, isShattering, triggerDismiss]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
      if (assemblyTimerRef.current) clearTimeout(assemblyTimerRef.current);
      if (shatterTimerRef.current) clearTimeout(shatterTimerRef.current);
    };
  }, []);

  return (
    <div className="app-root">
      {notice && (
        <aside
          ref={toastRef}
          className={`app-notice-toast ${isAssembling ? 'is-assembling' : ''} ${isShattering ? 'is-shattering' : ''}`}
          role="status"
          aria-live="polite"
        >
          {isAssembling && (
            <div className="toast-columns-wrapper" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="toast-assembly-col"
                  style={{
                    left: `${(i * 100) / 10}%`,
                    width: `${100 / 10}%`,
                    animationDelay: `${i * 45}ms`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="toast-content-wrapper">
            <span className="notice-icon" aria-hidden="true">ℹ️</span>
            <span className="notice-text">{notice}</span>
            <button
              type="button"
              className="notice-dismiss-btn"
              onClick={triggerDismiss}
              aria-label="Dismiss notice"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {isShattering && shatterPieces.length > 0 && (
        <div className="toast-shatter-container" aria-hidden="true">
          {shatterPieces.map((p) => (
            <div
              key={p.id}
              className="toast-shatter-tile"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.width}px`,
                height: `${p.height}px`,
                '--target-x': `${p.targetX}px`,
                '--target-y': `${p.targetY}px`,
                '--target-rot': `${p.rotate}deg`,
                '--tile-duration': `${p.duration}ms`,
                '--tile-delay': `${p.delay}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <Navbar onJoinClick={handleJoinClick} />
      <main id="hero" className="app-main">
        <Hero onJoinClick={handleJoinClick} />
      </main>
    </div>
  );
};

export default App;
