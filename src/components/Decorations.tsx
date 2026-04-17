import React from 'react';

interface DecorationProps {
  size?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

export const StarBlob: React.FC<DecorationProps> = ({ 
  size = 28, 
  color = '#FFD700', 
  opacity = 1, 
  rotation = 0,
  style 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 28 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      opacity, 
      transform: `rotate(${rotation}deg)`, 
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      ...style 
    }}
  >
    <path 
      d="M14 0C14 7.732 10.866 14 14 14C17.134 14 14 20.268 14 28C14 20.268 17.134 14 14 14C10.866 14 14 7.732 14 0Z" 
      fill={color} 
    />
    <path 
      d="M14 0C14 10 10 14 0 14C10 14 14 18 14 28C14 18 18 14 28 14C18 14 14 10 14 0Z" 
      fill={color} 
    />
  </svg>
);

export const AsteriskBloom: React.FC<DecorationProps> = ({ 
  size = 40, 
  color = '#FFB347', 
  opacity = 1, 
  rotation = 0,
  style 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      opacity, 
      transform: `rotate(${rotation}deg)`, 
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      ...style 
    }}
  >
    {[0, 45, 90, 135].map((angle) => (
      <rect 
        key={angle}
        x="42" 
        y="10" 
        width="16" 
        height="80" 
        rx="8" 
        fill={color} 
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
  </svg>
);

export const BlobShape: React.FC<DecorationProps> = ({ 
  size = 60, 
  color = '#FFE4E1', 
  opacity = 1, 
  rotation = 0,
  style 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      opacity, 
      transform: `rotate(${rotation}deg)`, 
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      ...style 
    }}
  >
    <path 
      d="M30 10C50 0 70 10 85 25C100 40 100 60 85 75C70 90 50 100 30 90C10 80 0 60 0 45C0 30 10 10 30 10Z" 
      fill={color} 
    />
  </svg>
);

export const PlusSign: React.FC<DecorationProps> = ({ 
  size = 16, 
  color = '#93C5FD', 
  opacity = 1, 
  rotation = 0,
  style 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      opacity, 
      transform: `rotate(${rotation}deg)`, 
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      ...style 
    }}
  >
    <path 
      d="M8 2V14M2 8H14" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);

export const DonutShape: React.FC<DecorationProps> = ({ 
  size = 32, 
  color = '#86EFAC', 
  opacity = 1, 
  rotation = 0,
  style 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ 
      opacity, 
      transform: `rotate(${rotation}deg)`, 
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      ...style 
    }}
  >
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="4" />
  </svg>
);
