import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { AppRoute } from '../../router/routes';
import gdgLogo from '../../assets/gdg logo.png';
import './Navbar.css';

interface NavbarProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  onJoinClick?: () => void;
}

interface NavItem {
  path: AppRoute;
  label: string;
  pillClass: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home', pillClass: 'pill-home' },
  { path: '/team', label: 'Team', pillClass: 'pill-team' },
  { path: '/events', label: 'Events', pillClass: 'pill-events' },
  { path: '/gallery', label: 'Gallery', pillClass: 'pill-gallery' },
  { path: '/portfolio', label: 'Portfolio', pillClass: 'pill-portfolio' },
  { path: '/more', label: 'More', pillClass: 'pill-more' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onJoinClick }) => {
  const scrollDirection = useScrollDirection({ threshold: 10, topOffset: 80 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: AppRoute) => {
      e.preventDefault();
      closeMobileMenu();
      onNavigate(path);
    },
    [closeMobileMenu, onNavigate]
  );

  const handleJoin = useCallback(() => {
    closeMobileMenu();
    onJoinClick?.();
  }, [closeMobileMenu, onJoinClick]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    // If focus moves outside the navbar element, clear focus state
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  }, []);

  // Navbar hides only when scrolling down, mobile drawer is closed, and no inner element is focused
  const isHidden = scrollDirection === 'down' && !isMobileMenuOpen && !isFocused;

  return (
    <header
      className={`navbar-header ${isHidden ? 'navbar--hidden' : 'navbar--visible'} ${isFocused ? 'is-focused' : ''}`}
      role="banner"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="navbar-container">
        {/* Left: GDG Brand Logo */}
        <a
          href="/"
          className="navbar-brand"
          aria-label="GDG RBU Homepage"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <img
            src={gdgLogo}
            alt="Google Developer Groups Logo"
            className="navbar-logo-img"
          />
        </a>

        {/* Desktop Center: Navigation Pills with Exact Reference Colors */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-pill-list">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`nav-pill ${item.pillClass} ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Right: Official "Join Us" CTA */}
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
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className={`nav-pill ${item.pillClass} ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      tabIndex={isMobileMenuOpen ? 0 : -1}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
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

export default Navbar;
