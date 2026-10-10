import React from 'react';
import { Footer } from '../components/Footer/Footer';
import './Pages.css';

export const PortfolioPage: React.FC = () => {
  return (
    <div className="page-container portfolio-page">
      <header className="page-hero-banner">
        <div className="page-hero-inner">
          <span className="page-badge">STUDENT INNOVATION</span>
          <h1 className="page-title">Projects &amp; Portfolio</h1>
          <p className="page-subtitle">
            Open-source software, student projects, and technological solutions created by community members at Ramdeobaba University.
          </p>
        </div>
      </header>

      <main className="page-body-content">
        <div className="page-cards-grid">
          <article className="page-neo-card">
            <span className="card-tag tag-blue">OPEN SOURCE</span>
            <h3 className="card-heading">GDG Campus Portal</h3>
            <p className="card-desc">
              Community web platform built with React, TypeScript, and modern frontend tools to manage event registrations, student showcases, and announcements.
            </p>
            <span className="card-footer-note">Tech Stack: React • Vite • TypeScript</span>
          </article>

          <article className="page-neo-card">
            <span className="card-tag tag-green">MOBILE APP</span>
            <h3 className="card-heading">Campus Guide Companion</h3>
            <p className="card-desc">
              Cross-platform mobile application providing navigation assistance, event calendars, and notifications for university students.
            </p>
            <span className="card-footer-note">Tech Stack: Flutter • Firebase • Dart</span>
          </article>

          <article className="page-neo-card">
            <span className="card-tag tag-yellow">SOLUTION CHALLENGE</span>
            <h3 className="card-heading">Smart Energy Monitor</h3>
            <p className="card-desc">
              IoT-connected environmental analytics dashboard addressing United Nations Sustainable Development Goals using Google Cloud platform tools.
            </p>
            <span className="card-footer-note">Tech Stack: Python • Google Cloud • IoT</span>
          </article>
        </div>

        <div className="page-notice-banner">
          <span className="notice-banner-icon" aria-hidden="true">💡</span>
          <span className="notice-banner-text">
            Student repositories and collaborative portfolio showcases are currently being indexed for the 2026–27 session.
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
