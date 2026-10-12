import React, { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { useCardTilt } from '../../hooks/useCardTilt';
import teamPhoto from '../../assets/team-photo.png';
import './Team.css';

export const Team: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });
  const [isObserverReady, setIsObserverReady] = useState(false);

  // 3D pointer tilt tracking on team photo frame
  const photoTiltRef = useCardTilt<HTMLDivElement>({
    maxTiltX: 4.0,
    maxTiltY: 4.5,
    perspective: 1000,
    glare: true,
  });

  // Dedicated observer for team photo frame when stacked on mobile
  const [, isPhotoInView] = useInView<HTMLDivElement>({
    targetRef: photoTiltRef,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: false,
  });

  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTargetHash = window.location.hash === '#team';
      if (!prefersReduced && !isTargetHash) {
        setIsObserverReady(true);
      }
    }
  }, []);

  const revealClasses = isObserverReady
    ? `reveal-ready ${isInView ? 'is-revealed' : ''}`
    : '';

  const photoRevealed = isObserverReady && (isInView || isPhotoInView);

  return (
    <section
      ref={sectionRef}
      id="team"
      className={`team-section ${revealClasses}`}
      aria-label="Team Introduction"
    >
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
            <div ref={photoTiltRef} className={`team-photo-frame ${photoRevealed ? 'is-revealed' : ''}`}>
              <img
                src={teamPhoto}
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
