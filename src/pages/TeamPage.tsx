import React from 'react';
import { Team } from '../components/Team/Team';
import { Footer } from '../components/Footer/Footer';
import './Pages.css';

export const TeamPage: React.FC = () => {
  return (
    <div className="page-container team-page">
      <header className="page-hero-banner">
        <div className="page-hero-inner">
          <span className="page-badge">STUDENT LEADERSHIP</span>
          <h1 className="page-title">Meet the Team</h1>
          <p className="page-subtitle">
            Passionate organizers, technical leads, and developers fostering an inclusive developer ecosystem at Ramdeobaba University.
          </p>
        </div>
      </header>

      <div className="page-body-content">
        {/* Core Team Component */}
        <Team />

        {/* Chapter Tracks Grid */}
        <section className="team-tracks-section" aria-label="Chapter Tracks" style={{ marginTop: '48px' }}>
          <h2 className="events-heading" style={{ marginBottom: '24px' }}>
            Chapter Tracks
          </h2>

          <div className="page-cards-grid">
            <div className="page-neo-card">
              <span className="card-tag tag-blue">TRACK 01</span>
              <h3 className="card-heading">Web &amp; Cloud Development</h3>
              <p className="card-desc">
                Focusing on full-stack web architectures, modern frontend paradigms, serverless systems, and Google Cloud infrastructure.
              </p>
              <span className="card-footer-note">Technical Mentorship Program</span>
            </div>

            <div className="page-neo-card">
              <span className="card-tag tag-green">TRACK 02</span>
              <h3 className="card-heading">Mobile &amp; Cross-Platform</h3>
              <p className="card-desc">
                Building multi-platform mobile experiences with Flutter, Kotlin, and native Android technologies.
              </p>
              <span className="card-footer-note">App Development Cohort</span>
            </div>

            <div className="page-neo-card">
              <span className="card-tag tag-purple">TRACK 03</span>
              <h3 className="card-heading">AI &amp; Machine Learning</h3>
              <p className="card-desc">
                Exploring TensorFlow, deep neural networks, generative AI, and intelligent systems for student research.
              </p>
              <span className="card-footer-note">Study Jam Tracks</span>
            </div>
          </div>

          <div className="page-notice-banner">
            <span className="notice-banner-icon" aria-hidden="true">ℹ️</span>
            <span className="notice-banner-text">
              Official 2026–27 core team member profiles and recruitment rosters will be published following chapter induction announcements.
            </span>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TeamPage;
