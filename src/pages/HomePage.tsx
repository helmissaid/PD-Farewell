import React from 'react';
import { motion } from 'motion/react';
import PhotoCard from '../components/PhotoCard';
import { people } from '../data/people';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      {/* Subtle Grid */}
      <div className="dot-grid"></div>
      
      <header className="page-header">
        <h2 className="header-team-name">Product Design Sekolah.mu</h2>
      </header>

      <main className="main-content">
        <section className="hero-editorial">
          <p className="hero-small-label">PRODUCT DESIGN · SEKOLAH.MU</p>
          <motion.h1 
            className="hero-heading-centered"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Terima kasih atas kerja sama dan semangat yang kalian bawa selama ini
          </motion.h1>
        </section>

        <section className="cards-section">
          <div className="cards-wrapper">
            {people.map((person) => (
              <PhotoCard 
                key={person.id}
                id={person.id}
                nickname={person.nickname}
                rotation={person.cardRotation}
                photoUrl={person.photoUrls[0]}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="page-footer">
        {/* Footer note removed */}
      </footer>
    </div>
  );
};

export default HomePage;
