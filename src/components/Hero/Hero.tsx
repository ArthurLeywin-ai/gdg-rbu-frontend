import React, { useState, useCallback } from 'react';
import { HeroCanvas } from './HeroCanvas';
import './Hero.css';

interface HeroProps {
  onJoinClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  // Normalized pointer coordinates (-1 to +1)
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle pointer tracking smoothly across the hero section
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    // Ignore touch interactions to prevent scroll conflicts
    if (e.pointerType === 'touch') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    setPointerPos({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    // Gently reset to center when pointer leaves the hero
    setPointerPos({ x: 0, y: 0 });
  }, []);

  return (
    <section
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Google Developer Groups RBU Hero Introduction"
    >
      <div className="hero-container">
        {/* Left Column: Semantic Content & Typography */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">GOOGLE DEVELOPER</span>
            <span className="hero-title-line line-highlight">
              GROUPS<span className="hero-comma">,</span> RBU
            </span>
          </h1>

          <p className="hero-tagline">
            Empowering students with cutting-edge tech skills, community, and resources for a future in technology
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-btn hero-btn-learn"
              aria-label="Learn more about Google Developer Groups RBU"
            >
              LEARN MORE
            </button>

            <button
              type="button"
              className="hero-btn hero-btn-join"
              onClick={onJoinClick}
              aria-label="Join Google Developer Groups RBU community"
            >
              Join
            </button>
          </div>

          <div className="hero-badge-container">
            <span className="hero-badge" aria-label="Chapter identifier">
              GDG • RBU
            </span>
          </div>
        </div>

        {/* Right Column: Dimensional 3D Neo-Brutalist Centerpiece */}
        <div className="hero-visual-column">
          <div className="hero-visual-wrapper">
            <HeroCanvas pointerPos={pointerPos} />
          </div>
        </div>
      </div>
    </section>
  );
};
