import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { UpcomingEvent } from '../components/UpcomingEvent/UpcomingEvent';
import { Team } from '../components/Team/Team';
import { FAQ } from '../components/FAQ/FAQ';
import { Footer } from '../components/Footer/Footer';

interface HomePageProps {
  onJoinClick?: () => void;
  onRegisterClick?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onJoinClick, onRegisterClick }) => {
  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <Hero onJoinClick={onJoinClick} />

      {/* 2. Upcoming Event Section */}
      <UpcomingEvent onRegisterClick={onRegisterClick} />

      {/* 3. Team Introduction Section */}
      <Team />

      {/* 4. FAQs Section */}
      <FAQ />

      {/* 5. Footer & Contact Section */}
      <Footer />
    </div>
  );
};

export default HomePage;
