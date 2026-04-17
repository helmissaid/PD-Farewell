import React from 'react';
import { motion } from 'motion/react';
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
  return (
    <div className="profile-header-new">
      <div className="profile-text-section">
        <h1 className="header-full-name">{fullName}</h1>
        <p className="header-role">{role}</p>
        <p className="header-year">{year}</p>
      </div>

      <div className="mini-polaroid-row">
        {photoUrls.map((url, i) => (
          <motion.div
            key={i}
            className="mini-polaroid"
            style={{ rotate: PREDEFINED_ROTATIONS[i % PREDEFINED_ROTATIONS.length] }}
            whileHover={{ 
              rotate: 0, 
              y: -8, 
              zIndex: 10,
              boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
            }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
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
      </div>
    </div>
  );
};

export default ProfileHeader;
