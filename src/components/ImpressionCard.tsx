import React from 'react';
import { motion } from 'motion/react';
import '../styles/components.css';

interface ImpressionCardProps {
  sender: string;
  recipientNickname: string;
  threeWords?: string;
  message: string;
  hope?: string;
  index: number;
}

const PASTEL_COLORS = [
  '#FFF5B0', // Yellow
  '#B8E4F9', // Blue
  '#C8F5C8', // Mint
  '#FFD6D6', // Coral
  '#E8D5F5', // Lavender
];

const PREDEFINED_ROTATIONS = [-3, 1.5, -1, 2.5, -2, 1, -2.5, 3, -1.5, 2, -3, 1];

const ImpressionCard: React.FC<ImpressionCardProps> = ({ sender, recipientNickname, threeWords, message, hope, index }) => {
  const color = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const rotation = PREDEFINED_ROTATIONS[index % PREDEFINED_ROTATIONS.length];

  return (
    <motion.div 
      className="impression-card"
      style={{ backgroundColor: color, rotate: rotation }}
      whileHover={{ 
        y: -6, 
        rotate: 0,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        zIndex: 50
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="impression-top">
        <p className="impression-sender">From: {sender}</p>
        
        {threeWords && (
          <div className="impression-tags-container">
            <p className="tags-label">{recipientNickname} itu</p>
            <div className="impression-tags">
              <span className="impression-tag">"</span>
              {threeWords.split(',').map((word, i) => (
                <span key={i} className="impression-tag-item impression-tag">{word.trim()}</span>
              ))}
              <span className="impression-tag">"</span>
            </div>
          </div>
        )}
      </div>
      
      <p className="impression-message">{message}</p>
      
      {hope && (
        <div className="impression-hope">
          <p className="hope-label">Harapan:</p>
          <p className="hope-text">"{hope}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default ImpressionCard;
