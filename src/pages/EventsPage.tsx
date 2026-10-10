import React from 'react';
import { UpcomingEvent } from '../components/UpcomingEvent/UpcomingEvent';
import { Footer } from '../components/Footer/Footer';
import './Pages.css';

interface EventsPageProps {
  onRegisterClick?: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onRegisterClick }) => {
  return (
    <div className="page-container events-page">
      {/* Page Header Banner */}
      <header className="page-hero-banner">
        <div className="page-hero-inner">
          <span className="page-badge">CALENDAR &amp; SESSIONS</span>
          <h1 className="page-title">Events &amp; Workshops</h1>
          <p className="page-subtitle">
            Explore hands-on technical sessions, hackathons, and student orientations hosted by Google Developer Groups on Campus, Ramdeobaba University.
          </p>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="page-body-content">
        {/* Core Upcoming Event Component */}
        <UpcomingEvent onRegisterClick={onRegisterClick} />

        {/* Event Formats Grid */}
        <section className="event-tracks-section" aria-label="Event Formats">
          <h2 className="events-heading" style={{ marginTop: '48px', marginBottom: '24px' }}>
            Event Formats
          </h2>

          <div className="page-cards-grid">
            <div className="page-neo-card">
              <span className="card-tag tag-blue">TECHNICAL</span>
              <h3 className="card-heading">Hands-on Codelabs</h3>
              <p className="card-desc">
                Step-by-step practical coding sessions diving into Google Cloud, Flutter, Android, Firebase, and modern Web frameworks.
              </p>
              <span className="card-footer-note">Next session schedule TBA</span>
            </div>

            <div className="page-neo-card">
              <span className="card-tag tag-red">COMPETITION</span>
              <h3 className="card-heading">Solution Hackathons</h3>
              <p className="card-desc">
                Sprint hackathons focused on building impactful technological solutions addressing real-world community challenges.
              </p>
              <span className="card-footer-note">Annual Solution Challenge track</span>
            </div>

            <div className="page-neo-card">
              <span className="card-tag tag-green">INDUSTRY</span>
              <h3 className="card-heading">Tech Talks &amp; Panels</h3>
              <p className="card-desc">
                Interactive discussions and career keynotes with industry software engineers, alumni leaders, and open-source contributors.
              </p>
              <span className="card-footer-note">Guest speaker calendar pending</span>
            </div>
          </div>

          <div className="page-notice-banner">
            <span className="notice-banner-icon" aria-hidden="true">ℹ️</span>
            <span className="notice-banner-text">
              Official chapter events schedule for the upcoming semester is currently pending formal announcement. Stay tuned for registration links.
            </span>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EventsPage;
