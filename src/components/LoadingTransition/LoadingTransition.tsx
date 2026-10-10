import React from 'react';
import './LoadingTransition.css';

interface LoadingTransitionProps {
  label: string;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({ label }) => {
  return (
    <div
      className="loading-transition-overlay"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="loading-neo-card">
        {/* Brand Color Dot Strip */}
        <div className="loading-accent-strip" aria-hidden="true">
          <span className="accent-dot dot-blue" />
          <span className="accent-dot dot-red" />
          <span className="accent-dot dot-yellow" />
          <span className="accent-dot dot-green" />
        </div>

        {/* Loading Message */}
        <div className="loading-content">
          <span className="loading-spinner-pixel" aria-hidden="true">
            ⏳
          </span>
          <span className="loading-text">{label}</span>
        </div>

        {/* Neo-brutalist Progress Bar */}
        <div className="loading-bar-track" aria-hidden="true">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default LoadingTransition;
