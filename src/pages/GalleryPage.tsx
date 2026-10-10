import React from 'react';
import { Footer } from '../components/Footer/Footer';
import './Pages.css';

export const GalleryPage: React.FC = () => {
  return (
    <div className="page-container gallery-page">
      <header className="page-hero-banner">
        <div className="page-hero-inner">
          <span className="page-badge">COMMUNITY MOMENTS</span>
          <h1 className="page-title">Chapter Gallery</h1>
          <p className="page-subtitle">
            Visual highlights, workshop memories, and community meetups from Google Developer Groups on Campus at Ramdeobaba University.
          </p>
        </div>
      </header>

      <main className="page-body-content">
        <div className="gallery-grid">
          <article className="gallery-card">
            <div className="gallery-img-container">
              <img
                src="/figma%20images/team-photo.png"
                alt="Chapter Team Assembly"
                className="gallery-img"
                loading="lazy"
              />
            </div>
            <div className="gallery-card-body">
              <h3 className="gallery-card-title">Chapter Core Team Meetup</h3>
              <p className="gallery-card-meta">Ramdeobaba University Campus • 2026</p>
            </div>
          </article>

          <article className="gallery-card">
            <div className="gallery-img-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <span style={{ fontSize: '2.5rem' }} aria-hidden="true">💻</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginTop: '8px', color: '#334155' }}>
                  ORIENTATION &amp; WORKSHOPS
                </p>
              </div>
            </div>
            <div className="gallery-card-body">
              <h3 className="gallery-card-title">Technical Hands-On Workshop</h3>
              <p className="gallery-card-meta">Auditorium Hall • Hands-on Lab Session</p>
            </div>
          </article>

          <article className="gallery-card">
            <div className="gallery-img-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef08a' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <span style={{ fontSize: '2.5rem' }} aria-hidden="true">🏆</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginTop: '8px', color: '#854d0e' }}>
                  STUDENT HACKATHON
                </p>
              </div>
            </div>
            <div className="gallery-card-body">
              <h3 className="gallery-card-title">Solution Sprint Hackathon</h3>
              <p className="gallery-card-meta">Campus Incubation Lab • 24hr Challenge</p>
            </div>
          </article>
        </div>

        <div className="page-notice-banner">
          <span className="notice-banner-icon" aria-hidden="true">📷</span>
          <span className="notice-banner-text">
            High-resolution photo albums and event reels from past chapter cohorts are currently being archived and will be published alongside upcoming semester sessions.
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;
