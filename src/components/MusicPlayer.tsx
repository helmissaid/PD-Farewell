import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';

// Declare YT for TypeScript
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

let playerInstance: any = null;

interface MusicProviderProps {
  children: React.ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If instance already exists, sync state
    if (playerInstance && playerInstance.getPlayerState) {
      const state = playerInstance.getPlayerState();
      setIsPlaying(state === 1); 
    }

    // Load API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else if (!playerInstance) {
      initPlayer();
    }
  }, []);

  const initPlayer = () => {
    if (playerInstance) return;

    playerInstance = new window.YT.Player('yt-player-engine', {
      videoId: '94B6MGLemik',
      playerVars: {
        autoplay: 1,
        mute: 1, 
        loop: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        start: 0,
        playlist: '94B6MGLemik'
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
          // Initially muted for autoplay bypass
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        }
      }
    });
  };

  const toggle = () => {
    if (!playerInstance || !playerInstance.getPlayerState) return;

    const state = playerInstance.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      playerInstance.pauseVideo();
    } else {
      // Unmute on first manual play if it was muted for autoplay
      if (playerInstance.isMuted()) {
        playerInstance.unMute();
        playerInstance.setVolume(40);
      }
      playerInstance.playVideo();
    }
  };

  const isHome = location.pathname === '/';
  const isPerson = location.pathname.startsWith('/person/');

  return (
    <MusicContext.Provider value={{ isPlaying, toggle }}>
      <div 
        id="yt-player-engine" 
        style={{ 
          position: 'fixed',
          top: '-1000px',
          left: '-1000px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }} 
      />
      {children}
      
      {/* Floating button on other pages if any */}
      {!isHome && !isPerson && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          <button 
            onClick={toggle}
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              animation: isPlaying ? 'pulse 2s ease-in-out infinite' : 'none'
            }}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1A1A">
                <rect x="4" y="3" width="3" height="10" />
                <rect x="9" y="3" width="3" height="10" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1A1A">
                <path d="M4 3L13 8L4 13V3Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 2px 12px rgba(0,0,0,0.12); }
          50% { box-shadow: 0 2px 12px rgba(0,0,0,0.12), 0 0 0 6px rgba(0,0,0,0.05); }
        }
      `}</style>
    </MusicContext.Provider>
  );
};
