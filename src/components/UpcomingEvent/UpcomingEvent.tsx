import React from 'react';
import './UpcomingEvent.css';

interface UpcomingEventProps {
  onRegisterClick?: () => void;
}

export const UpcomingEvent: React.FC<UpcomingEventProps> = ({ onRegisterClick }) => {
  return (
    <section
      id="events"
      className="upcoming-events-section"
      aria-label="Upcoming Event Section"
    >
      <div className="events-container">
        {/* Centered Display Heading matching 8-bit neo-brutalist typography */}
        <h2 className="events-heading">Upcoming Event</h2>

        <div className="events-cards-grid">
          {/* Left Card: Overview Card with Architectural Background */}
          <article
            className="event-card event-overview-card"
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
            id="event-ticket"
            className="event-card event-ticket-card"
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
