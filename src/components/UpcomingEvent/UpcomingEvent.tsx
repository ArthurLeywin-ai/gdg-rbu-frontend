import React, { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { useCardTilt } from '../../hooks/useCardTilt';
import './UpcomingEvent.css';

interface UpcomingEventProps {
  onRegisterClick?: () => void;
}

export const UpcomingEvent: React.FC<UpcomingEventProps> = ({ onRegisterClick }) => {
  const [sectionRef, isInView] = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });
  const [isObserverReady, setIsObserverReady] = useState(false);

  // Studio-grade 3D pointer tilt tracking (Lusion-inspired, restrained to 4.5deg)
  const overviewTiltRef = useCardTilt<HTMLElement>({
    maxTiltX: 4.5,
    maxTiltY: 5.0,
    perspective: 1000,
    glare: true,
  });

  const ticketTiltRef = useCardTilt<HTMLElement>({
    maxTiltX: 4.5,
    maxTiltY: 5.0,
    perspective: 1000,
    glare: true,
  });

  // Dedicated card-level observers:
  // On desktop, both cards enter simultaneously with the section.
  // On mobile (stacked layout), each card animates individually right as the user scrolls into it.
  const [, isOverviewInView] = useInView<HTMLElement>({
    targetRef: overviewTiltRef,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });

  const [, isTicketInView] = useInView<HTMLElement>({
    targetRef: ticketTiltRef,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 769px)');
      setIsDesktop(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handler);
      } else if (typeof (mediaQuery as any).addListener === 'function') {
        (mediaQuery as any).addListener(handler);
      }
      return () => {
        if (typeof mediaQuery.removeEventListener === 'function') {
          mediaQuery.removeEventListener('change', handler);
        } else if (typeof (mediaQuery as any).removeListener === 'function') {
          (mediaQuery as any).removeListener(handler);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTargetHash = window.location.hash === '#events' || window.location.hash === '#event-ticket';
      if (!prefersReduced && !isTargetHash) {
        setIsObserverReady(true);
      }
    }
  }, []);

  const revealClasses = isObserverReady
    ? `reveal-ready ${isInView ? 'is-revealed' : ''}`
    : '';

  // Desktop (min-width: 769px): cards reveal simultaneously when section enters view.
  // Mobile (max-width: 768px, stacked): Overview reveals when reached, Ticket reveals when reached.
  const overviewRevealed = isObserverReady && (isDesktop ? isInView || isOverviewInView : isOverviewInView);
  const ticketRevealed = isObserverReady && (isDesktop ? isInView || isTicketInView : isTicketInView);

  return (
    <section
      ref={sectionRef}
      id="events"
      className={`upcoming-events-section ${revealClasses}`}
      aria-label="Upcoming Event Section"
    >
      <div className="events-container">
        {/* Centered Display Heading matching 8-bit neo-brutalist typography */}
        <h2 className="events-heading">Upcoming Event</h2>

        <div className="events-cards-grid">
          {/* Left Card: Overview Card with Architectural Background */}
          <article
            ref={overviewTiltRef}
            className={`event-card event-overview-card ${overviewRevealed ? 'is-revealed' : ''}`}
            aria-labelledby="overview-title"
          >
            <div className="overview-header">
              <span className="overview-category-label">GDG ORIENTATION</span>
              <span className="overview-status-badge">SCHEDULE PENDING</span>
            </div>

            <div className="overview-body">
              <h3 id="overview-title" className="overview-title">
                GDG ORIENTATION
              </h3>
              <p className="overview-description">
                Google Developer Groups (GDG) – Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networking opportunities.
              </p>

              <div className="overview-action-row">
                <a
                  href="#event-ticket"
                  className="overview-arrow-btn"
                  aria-label="View registration ticket for GDG Orientation"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          {/* Right Card: Notched Event Ticket Stub */}
          <article
            ref={ticketTiltRef}
            id="event-ticket"
            className={`event-card event-ticket-card ${ticketRevealed ? 'is-revealed' : ''}`}
            aria-labelledby="ticket-title"
          >
            <div className="ticket-header">
              <h3 id="ticket-title" className="ticket-title">
                <span className="ticket-title-line">New</span>
                <span className="ticket-title-line">Event</span>
              </h3>
            </div>

            {/* Dotted perforation divider with authentic inward semicircular edge notches */}
            <div className="ticket-perforation" aria-hidden="true">
              <span className="ticket-notch notch-left" />
              <span className="ticket-divider-line" />
              <span className="ticket-notch notch-right" />
            </div>

            <div className="ticket-details">
              <span className="ticket-meta-label">DATE &amp; TIME</span>
              <div className="ticket-datetime-content">
                <span className="ticket-datetime-main">To Be Announced</span>
                <span className="ticket-datetime-sub">Schedule Pending</span>
                <span className="ticket-ref-note">
                  (Mockup reference: Oct 7, 2026 • 3:00 PM)
                </span>
              </div>

              <div className="ticket-action">
                <button
                  type="button"
                  className="ticket-register-btn"
                  onClick={onRegisterClick}
                  aria-label="Register for upcoming GDG Orientation"
                >
                  Register Now
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
