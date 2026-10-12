import React, { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import gdgLogo from '../../assets/gdg logo.png';
import geometricBaseline from '../../assets/image 123.png';
import './Footer.css';

export const Footer: React.FC = () => {
  const [footerRef, isInView] = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });
  const [isObserverReady, setIsObserverReady] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTargetHash = window.location.hash === '#footer';
      if (!prefersReduced && !isTargetHash) {
        setIsObserverReady(true);
      }
    }
  }, []);

  const revealClasses = isObserverReady
    ? `reveal-ready ${isInView ? 'is-revealed' : ''}`
    : '';

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={`footer-section ${revealClasses}`}
      role="contentinfo"
    >
      <div className="footer-container">
        {/* Framed Neo-Brutalist Main Card matching Figma image 6.png */}
        <div className="footer-main-card">
          {/* Brand Header */}
          <div className="footer-brand-header">
            <img
              src={gdgLogo}
              alt="Google Developer Groups Emblem"
              className="footer-brand-logo"
            />
            <h2 className="footer-brand-title">Google Developer Groups</h2>
            <p className="footer-brand-subtitle">On Campus • Ramdeobaba University</p>
          </div>

          {/* Dashed Horizontal Divider */}
          <div className="footer-dashed-divider" aria-hidden="true" />

          {/* Content Row: Address + Email vs Social Channels */}
          <div className="footer-cards-grid">
            <div className="footer-contact-column">
              {/* Address Card (Blue Container) */}
              <div className="footer-info-pill pill-blue">
                <span className="pill-icon" aria-hidden="true">
                  📍
                </span>
                <div className="pill-text">
                  <span className="pill-primary">Ramdeobaba University</span>
                  <span className="pill-secondary">
                    Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013
                  </span>
                </div>
              </div>

              {/* Email Card (Yellow Container) */}
              <div className="footer-info-pill pill-yellow">
                <span className="pill-icon" aria-hidden="true">
                  ✉
                </span>
                <div className="pill-text">
                  <span className="pill-primary">gdsc@rknec.edu</span>
                </div>
              </div>
            </div>

            {/* Social Media Card (Purple Container) */}
            <div className="footer-social-card">
              <span className="social-label">Follow Us:</span>
              <div className="social-icons-row">
                <button
                  type="button"
                  className="social-btn social-insta"
                  aria-label="Instagram page (Details pending)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  className="social-btn social-linkedin"
                  aria-label="LinkedIn profile (Details pending)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="social-btn social-x"
                  aria-label="X / Twitter page (Details pending)"
                >
                  <span className="x-letter-glyph" aria-hidden="true">𝕏</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Baseline: Decorative Geometric Footer Banner */}
      <div className="footer-geometric-baseline" aria-hidden="true">
        <img
          src={geometricBaseline}
          alt=""
          className="footer-geometric-img"
          loading="lazy"
        />
      </div>
    </footer>
  );
};

export default Footer;
