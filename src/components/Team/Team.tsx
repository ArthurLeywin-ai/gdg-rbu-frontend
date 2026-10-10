import React from 'react';
import './Team.css';

export const Team: React.FC = () => {
  return (
    <section id="team" className="team-section" aria-label="Team Introduction">
      <div className="team-container">
        <div className="team-grid">
          {/* Left Column: Semantic Copy & Community Highlights */}
          <div className="team-content">
            <h2 className="team-heading">
              Meet the <span className="team-heading-accent">Google Developer</span> Group Team
            </h2>

            <p className="team-lead">
              Google Developer Groups (GDG) are open and volunteer-run communities for developers interested in Google technologies. Our team focuses on learning, networking, and collaboration through events and hands-on sessions.
            </p>

            <div className="team-features">
              <div className="team-feature-item">
                <span className="feature-icon-circle" aria-hidden="true">
                  ✓
                </span>
                <div className="feature-text">
                  <h3 className="feature-title">Passionate Community Leaders</h3>
                  <p className="feature-desc">
                    Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together.
                  </p>
                </div>
              </div>

              <div className="team-feature-item">
                <span className="feature-icon-circle" aria-hidden="true">
                  ✓
                </span>
                <div className="feature-text">
                  <h3 className="feature-title">Empowering Developers</h3>
                  <p className="feature-desc">
                    We host meetups and codelabs to help developers stay current with modern tools and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Team Photograph */}
          <div className="team-visual-column">
            <div className="team-photo-frame">
              <img
                src="/figma%20images/team-photo.png"
                alt="Google Developer Groups RBU Student Team"
                className="team-photo-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
