import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { people } from '../data/people';
import ProfileHeader from '../components/ProfileHeader';
import ImpressionCard from '../components/ImpressionCard';
import '../styles/PersonPage.css';

const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const person = people.find(p => p.id === id);

  useEffect(() => {
    if (!person) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [person, navigate]);

  if (!person) return null;

  return (
    <div className="person-canvas-page">
      <div className="canvas-dot-grid-full"></div>

      {/* Floating Navbar */}
      <nav className="floating-navbar">
        <div className="nav-content">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span> Back to Home
          </Link>
          <img 
            src="https://drive.google.com/thumbnail?id=1iBotPuvrX70OM3d-Zj_S5lESStpfMt8j&sz=w1000" 
            alt="Sekolah.mu Logo" 
            className="nav-logo"
            referrerPolicy="no-referrer"
          />
        </div>
      </nav>
      
      <main className="canvas-content">
        {/* Profile Content (Ungrouped from Card) */}
        <ProfileHeader 
          fullName={person.fullName}
          role={person.role}
          year={person.year}
          nickname={person.nickname}
          photoUrls={person.photoUrls}
        />

        {/* Kesan & Pesan Section */}
        <div className="impressions-section">
          <div className="impressions-grid">
            {person.impressions.map((impression, index) => (
              <ImpressionCard 
                key={impression.id}
                sender={impression.from}
                message={impression.message}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonPage;
