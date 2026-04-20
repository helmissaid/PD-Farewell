import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import '../styles/components.css';

interface PhotoCardProps {
  id: string;
  nickname: string;
  rotation: number;
  photoUrl: string | null;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ id, nickname, rotation, photoUrl }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="photo-card"
      style={{ rotate: rotation }}
      whileHover={{ 
        rotate: 0, 
        y: -10,
        zIndex: 10,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/person/${id}`)}
    >
      <div className="photo-container">
        {photoUrl ? (
          <>
            <img 
              src={photoUrl} 
              alt={nickname} 
              referrerPolicy="no-referrer"
              className="photo-img"
            />
            <div className="photo-overlay">
              <span className="overlay-text">About Me at SID</span>
            </div>
          </>
        ) : (
          <div className="photo-placeholder-fill"></div>
        )}
      </div>
      <div className="card-footer">
        <span className="nickname-text"><i>{nickname}</i></span>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
