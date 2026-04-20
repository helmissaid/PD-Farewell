import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const VinylPlayer: React.FC = () => {
  const { isPlaying, toggle } = useContext(MusicContext);

  return (
    <div 
      className="music-simple-cta"
      style={{
        width: '100%',
        margin: '60px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        className="vinyl-controls"
        style={{
          position: 'relative'
        }}
      >
        <button 
          onClick={toggle}
          style={{
            padding: '12px 28px',
            borderRadius: '99px',
            border: '1.5px solid #1A1A1A',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
            boxShadow: isPlaying ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'
          }}
          className="vinyl-cta-btn"
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" />
              <rect x="9" y="2" width="4" height="12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2L14 8L4 14V2Z" />
            </svg>
          )}
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: 'inherit',
            letterSpacing: '-0.01em'
          }}>
            {isPlaying ? 'Pause Song: Selamanya' : 'Play Song: Selamanya'}
          </span>
        </button>
      </div>

      <style>{`
        .vinyl-cta-btn:hover {
          background: #1A1A1A !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
        }
        
        .vinyl-cta-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default VinylPlayer;
