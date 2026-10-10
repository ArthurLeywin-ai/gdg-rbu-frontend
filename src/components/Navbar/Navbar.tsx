import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Navbar.css';

interface NavbarProps {
  onJoinClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close mobile menu when resizing to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleJoin = useCallback(() => {
    closeMobileMenu();
    onJoinClick?.();
  }, [closeMobileMenu, onJoinClick]);

  return (
    <header className="navbar-header" role="banner">
      <div className="navbar-container">
        {/* Left: GDG Brand Logo */}
        <a href="#hero" className="navbar-brand" aria-label="GDG RBU Homepage">
          <img
            src="/figma%20images/gdg%20logo.png"
            alt="Google Developer Groups Logo"
            className="navbar-logo-img"
          />
        </a>

        {/* Desktop Center: Navigation Pills with Exact Reference Colors */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-pill-list">
            <li>
              <a href="#hero" className="nav-pill pill-home active" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#team" className="nav-pill pill-team">
                Team
              </a>
            </li>
            <li>
              <a href="#events" className="nav-pill pill-events">
                Events
              </a>
            </li>
            <li>
              <a href="#gallery" className="nav-pill pill-gallery">
                Gallery
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-pill pill-portfolio">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#more" className="nav-pill pill-more">
                More
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Right: Official "Join Us" CTA (Replaces Saptanshu profile chip) */}
        <button
          type="button"
          className="nav-cta-join desktop-join"
          onClick={handleJoin}
          aria-label="Join Google Developer Groups RBU community"
        >
          Join Us
        </button>

        {/* Mobile Hamburger Toggle Button */}
        <button
          ref={toggleBtnRef}
          type="button"
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={menuRef}
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-nav-inner">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-pill-list">
              <li>
                <a
                  href="#hero"
                  className="nav-pill pill-home active"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="nav-pill pill-team"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="nav-pill pill-events"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="nav-pill pill-gallery"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="nav-pill pill-portfolio"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#more"
                  className="nav-pill pill-more"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  More
                </a>
              </li>
            </ul>
          </nav>

          <div className="mobile-join-container">
            <button
              type="button"
              className="nav-cta-join mobile-join-btn"
              onClick={handleJoin}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              aria-label="Join Google Developer Groups RBU community"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
