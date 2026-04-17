import React from 'react';
import { motion } from 'motion/react';
import '../styles/components.css';

interface ImpressionCardProps {
  sender: string;
  message: string;
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

const ImpressionCard: React.FC<ImpressionCardProps> = ({ sender, message, index }) => {
  const color = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const rotation = PREDEFINED_ROTATIONS[index % PREDEFINED_ROTATIONS.length];

  return (
    <motion.div 
      className="impression-card"
      style={{ backgroundColor: color, rotate: rotation }}
      whileHover={{ 
        y: -6, 
        rotate: 0,
        boxShadow: '6px 10px 20px rgba(0,0,0,0.12)',
        zIndex: 10
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <p className="impression-sender">{sender}</p>
      <p className="impression-message">{message}</p>
    </motion.div>
  );
};

export default ImpressionCard;
