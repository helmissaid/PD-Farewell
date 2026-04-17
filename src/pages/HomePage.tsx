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
      
      <main className="main-content">
        <section className="hero-editorial">
          <div className="logo-container">
            <img 
              src="https://drive.google.com/thumbnail?id=1iBotPuvrX70OM3d-Zj_S5lESStpfMt8j&sz=w1000" 
              alt="Sekolah.mu Product Design Logo" 
              className="editorial-logo"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.h1 
            className="hero-heading-centered"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Thank you for being part of the story. <br />
            The memories we made with you will stay with us.
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
