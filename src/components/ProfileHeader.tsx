import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../styles/components.css';

interface ProfileHeaderProps {
  fullName: string;
  role: string;
  year: string;
  nickname: string;
  photoUrls: (string | null)[];
}

const PREDEFINED_ROTATIONS = [-5, 3, -2, 6, -4, 2];

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ fullName, role, year, nickname, photoUrls }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayedPhotos = showAll ? photoUrls : photoUrls.slice(0, 6);
  const hasMore = photoUrls.length > 6;

  const validPhotos = photoUrls.filter((url): url is string => !!url);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex - 1 + validPhotos.length) % validPhotos.length;
    setSelectedIndex(newIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + 1) % validPhotos.length;
    setSelectedIndex(newIndex);
  };

  return (
    <div className="profile-header-new">
      <div className="profile-text-section">
        <h1 className="header-full-name">{fullName}</h1>
        <p className="header-role">{role}</p>
        <p className="header-year">{year}</p>
      </div>

      <div className={`mini-polaroid-row ${showAll ? 'memories-grid' : ''}`}>
        <AnimatePresence mode="popLayout">
          {displayedPhotos.map((url, i) => (
            <motion.div
              key={`${nickname}-photo-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mini-polaroid"
              style={{ rotate: PREDEFINED_ROTATIONS[i % PREDEFINED_ROTATIONS.length] }}
              onClick={() => {
                if (url) {
                  const idx = validPhotos.indexOf(url);
                  setSelectedIndex(idx);
                }
              }}
              whileHover={{ 
                rotate: 0, 
                y: -8, 
                zIndex: 10,
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
              }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="mini-photo-container">
                {url ? (
                  <img 
                    src={url} 
                    alt={`${nickname} memorial ${i + 1}`} 
                    className="mini-photo-img" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="mini-photo-placeholder"></div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button className="nav-chevron left" onClick={handlePrev}>‹</button>
            
            <motion.div 
              key={validPhotos[selectedIndex]}
              className="fullscreen-card"
              initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 2, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.3 }}
            >
              <img src={validPhotos[selectedIndex]} alt="Fullscreen memorial" referrerPolicy="no-referrer" className="fullscreen-img" />
            </motion.div>

            <button className="nav-chevron close-btn" onClick={() => setSelectedIndex(null)}>×</button>
            <button className="nav-chevron right" onClick={handleNext}>›</button>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div className="memo-cta-container">
          <button 
            className="see-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less Memories' : 'Show More Memories'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
