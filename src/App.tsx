import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { LoadingTransition } from './components/LoadingTransition/LoadingTransition';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { TeamPage } from './pages/TeamPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { MorePage } from './pages/MorePage';
import { AppRoute, ROUTES, normalizePath } from './router/routes';

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
  // Navigation & Page Routing State
  const [currentPath, setCurrentPath] = useState<AppRoute>(() =>
    normalizePath(window.location.pathname)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState<string>('');

  // Toast Notification & Animation States (Preserved)
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
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set initial document title based on starting route and sync unknown URLs
  useEffect(() => {
    document.title = ROUTES[currentPath]?.documentTitle || 'GDG RBU — Google Developer Groups On Campus';
    const cleanPath = normalizePath(window.location.pathname);
    if (window.location.pathname !== cleanPath) {
      window.history.replaceState(null, '', cleanPath);
    }
  }, [currentPath]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname);
      setCurrentPath(path);
      document.title = ROUTES[path]?.documentTitle || 'GDG RBU — Google Developer Groups On Campus';
      setIsTransitioning(false);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Multi-Page Navigation Handler with Branded Loading Transition
  const handleNavigate = useCallback(
    (targetPath: AppRoute) => {
      if (targetPath === currentPath && !isTransitioning) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Clear any pending transition timer (handles rapid clicks safely)
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      const targetMeta = ROUTES[targetPath];
      setTransitionLabel(targetMeta.loadingLabel);
      setIsTransitioning(true);

      // Update URL in browser history
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }

      // Target approximately one second (800ms) for brief, responsive branded feedback
      const transitionDuration = 800;

      transitionTimerRef.current = setTimeout(() => {
        setCurrentPath(targetPath);
        setIsTransitioning(false);
        transitionTimerRef.current = null;
        document.title = targetMeta.documentTitle;
        window.scrollTo(0, 0);
      }, transitionDuration);
    },
    [currentPath, isTransitioning]
  );

  // Common dismissal handler for notification toast
  const triggerDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

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
    const pieceSize = 20;
    const cols = Math.max(8, Math.min(26, Math.round(rect.width / pieceSize)));
    const rows = Math.max(2, Math.min(5, Math.round(rect.height / pieceSize)));
    const pieceWidth = rect.width / cols;
    const pieceHeight = rect.height / rows;

    const pieces: ShatterPiece[] = [];
    let id = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const minUpward = -(rect.top + pieceHeight + 60);
        const targetY = minUpward - Math.random() * 240;
        const targetX = (Math.random() - 0.5) * 60;
        const rotate = (Math.random() - 0.5) * 60;
        const duration = 520 + Math.random() * 200;
        const delay = (rows - 1 - r) * 30 + Math.random() * 50;

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

  const showNotice = useCallback(
    (message: string) => {
      if (shatterTimerRef.current) {
        clearTimeout(shatterTimerRef.current);
        shatterTimerRef.current = null;
      }
      setIsShattering(false);
      setShatterPieces([]);
      isDismissingRef.current = false;

      setNotice(message);
      openTimestampRef.current = Date.now();

      setIsAssembling(true);
      if (assemblyTimerRef.current) {
        clearTimeout(assemblyTimerRef.current);
      }
      assemblyTimerRef.current = setTimeout(() => {
        setIsAssembling(false);
      }, 650);

      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
      autoDismissTimerRef.current = setTimeout(() => {
        triggerDismiss();
      }, 4500);
    },
    [triggerDismiss]
  );

  const handleJoinClick = useCallback(() => {
    showNotice('Official chapter registration is currently pending announcement.');
  }, [showNotice]);

  const handleRegisterClick = useCallback(() => {
    showNotice('Event registration details are currently pending official announcement.');
  }, [showNotice]);

  // Click-outside-to-dismiss handler
  useEffect(() => {
    if (!notice || isShattering) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (Date.now() - openTimestampRef.current < 150) return;
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
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Helper to render the active page
  const renderActivePage = () => {
    switch (currentPath) {
      case '/events':
        return <EventsPage onRegisterClick={handleRegisterClick} />;
      case '/gallery':
        return <GalleryPage />;
      case '/team':
        return <TeamPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/more':
        return <MorePage />;
      case '/':
      default:
        return (
          <HomePage
            onJoinClick={handleJoinClick}
            onRegisterClick={handleRegisterClick}
          />
        );
    }
  };

  return (
    <div className="app-root">
      {/* Toast Notification (Preserved) */}
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

      {/* Upward Square Shatter Exit Container */}
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

      {/* Shared Navigation Bar across all destinations */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onJoinClick={handleJoinClick}
      />

      {/* Branded Page Transition Screen */}
      {isTransitioning && <LoadingTransition label={transitionLabel} />}

      {/* Active Page View */}
      <main className="app-main">{renderActivePage()}</main>
    </div>
  );
};

export default App;
