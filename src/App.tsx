import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';

export const App: React.FC = () => {
  const [notice, setNotice] = useState<string | null>(null);

  const handleJoinClick = useCallback(() => {
    setNotice('Official chapter registration is currently pending announcement.');
  }, []);

  const dismissNotice = useCallback(() => {
    setNotice(null);
  }, []);

  // Auto-dismiss status toast after 4.5 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => {
      setNotice(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <div className="app-root">
      {notice && (
        <aside className="app-notice-toast" role="status" aria-live="polite">
          <span className="notice-icon" aria-hidden="true">ℹ️</span>
          <span className="notice-text">{notice}</span>
          <button
            type="button"
            className="notice-dismiss-btn"
            onClick={dismissNotice}
            aria-label="Dismiss notice"
          >
            ✕
          </button>
        </aside>
      )}
      <Navbar onJoinClick={handleJoinClick} />
      <main id="hero" className="app-main">
        <Hero onJoinClick={handleJoinClick} />
      </main>
    </div>
  );
};

export default App;
