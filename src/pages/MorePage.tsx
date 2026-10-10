import React from 'react';
import { FAQ } from '../components/FAQ/FAQ';
import { Footer } from '../components/Footer/Footer';
import './Pages.css';

export const MorePage: React.FC = () => {
  return (
    <div className="page-container more-page">
      <header className="page-hero-banner">
        <div className="page-hero-inner">
          <span className="page-badge">COMMUNITY INFO</span>
          <h1 className="page-title">Resources &amp; Information</h1>
          <p className="page-subtitle">
            Essential community guidelines, university chapter background, FAQs, and contact resources for GDG RBU.
          </p>
        </div>
      </header>

      <main className="page-body-content">
        <div className="page-cards-grid">
          <article className="page-neo-card">
            <span className="card-tag tag-blue">ABOUT US</span>
            <h3 className="card-heading">Google Developer Groups on Campus</h3>
            <p className="card-desc">
              University-based community groups for students interested in Google developer technologies. By joining a GDG on Campus, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.
            </p>
            <span className="card-footer-note">Program: Student Chapter</span>
          </article>

          <article className="page-neo-card">
            <span className="card-tag tag-green">VALUES</span>
            <h3 className="card-heading">Code of Conduct</h3>
            <p className="card-desc">
              We are dedicated to providing a harassment-free and inclusive experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, race, or religion.
            </p>
            <span className="card-footer-note">Inclusive Community Standard</span>
          </article>

          <article className="page-neo-card">
            <span className="card-tag tag-purple">CAMPUS</span>
            <h3 className="card-heading">Ramdeobaba University</h3>
            <p className="card-desc">
              Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur, Maharashtra 440013. A premier institution fostering academic and technological excellence.
            </p>
            <span className="card-footer-note">Chapter Location</span>
          </article>
        </div>

        {/* Embedded FAQs for Quick Answers */}
        <div style={{ marginTop: '48px' }}>
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MorePage;
