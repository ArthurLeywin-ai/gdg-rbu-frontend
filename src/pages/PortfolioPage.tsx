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

      <div className="page-body-content">
        <div className="page-neo-card" style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="card-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Student projects coming soon</h2>
          <p className="card-desc">
            Verified details for open-source repositories and community projects will be added as they become available.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
