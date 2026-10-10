import React from 'react';
import './Hero.css';

/**
 * High-fidelity 2D SVG/CSS fallback for the neo-brutalist hero graphic.
 * Rendered when WebGL is unavailable, context is lost, or as a graceful degradation.
 */
export const HeroFallback: React.FC = () => {
  return (
    <div className="hero-fallback-wrapper" aria-hidden="true">
      <div className="hero-fallback-card">
        {/* Decorative asymmetrical black polygon silhouette replicating Figma */}
        <svg
          viewBox="0 0 500 380"
          className="hero-fallback-shape"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Asymmetric neo-brutalist silhouette with organic rounded vertices */}
          <path
            d="
              M 70,50
              L 260,50
              A 30,30 0 0,1 290,80
              L 430,80
              A 30,30 0 0,1 460,110
              L 460,200
              A 30,30 0 0,1 430,230
              L 350,230
              A 25,25 0 0,1 325,255
              L 325,310
              A 30,30 0 0,1 295,340
              L 70,340
              A 30,30 0 0,1 40,310
              L 40,80
              A 30,30 0 0,1 70,50
              Z
            "
            fill="#0a0a0a"
          />
        </svg>

        {/* Decorative gdgr search capsule - purely visual display element */}
        <div className="hero-fallback-capsule">
          <svg
            className="hero-capsule-icon"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8.5" cy="8.5" r="5" />
            <line x1="12.5" y1="12.5" x2="17" y2="17" />
          </svg>
          <span className="hero-capsule-text">gdgr</span>
        </div>

        {/* Subtle geometric accent dots in Google brand colors */}
        <div className="hero-fallback-accent accent-blue" />
        <div className="hero-fallback-accent accent-red" />
        <div className="hero-fallback-accent accent-yellow" />
        <div className="hero-fallback-accent accent-green" />
      </div>
    </div>
  );
};
