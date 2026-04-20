import React, { useEffect, useState } from 'react';

// Declare YT for TypeScript
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

let playerInstance: any = null;

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // If instance already exists, sync state
    if (playerInstance && playerInstance.getPlayerState) {
      const state = playerInstance.getPlayerState();
      // 1 is Playing
      setIsPlaying(state === 1); 
    }

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Load YT API
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

    return () => {
      // Persistence is requested, so we don't destroy playerInstance here
    };
  }, []);

  const initPlayer = () => {
    // Avoid double initialization
    if (playerInstance) {
      // If playerInstance exists but div was replaced, we might have issues
      // But since MusicPlayer is outside Routes, div#yt-player should persist
      return;
    }

    playerInstance = new window.YT.Player('yt-player', {
      videoId: '94B6MGLemik',
      playerVars: {
        autoplay: 1,
        mute: 1, // Crucial for modern browser autoplay policies
        loop: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        start: 0,
        playlist: '94B6MGLemik'
      },
      events: {
        onReady: (event: any) => {
          // Force play
          event.target.playVideo();
          // Unmute after a delay to bypass autoplay blockers
          setTimeout(() => {
            if (event.target.unMute) {
              event.target.unMute();
              event.target.setVolume(40);
            }
          }, 1000);
        },
        onStateChange: (event: any) => {
          // Sync UI state with player state
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        }
      }
    });
  };

  const togglePlay = () => {
    if (!playerInstance || !playerInstance.getPlayerState) return;

    const state = playerInstance.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      playerInstance.pauseVideo();
    } else {
      playerInstance.playVideo();
    }
  };

  return (
    <>
      {/* Target for YouTube IFrame - making it hidden but technically part of layout for better initialization */}
      <div 
        id="yt-player" 
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
      
      <div 
        className="music-control-container"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none' // allow events to pass to children specifically
        }}
      >
        {/* Tooltip */}
        <div 
          className={`music-tooltip ${showTooltip ? 'visible' : ''}`}
          style={{
            background: '#1A1A1A',
            color: '#FFFFFF',
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '6px',
            marginRight: '12px',
            whiteSpace: 'nowrap',
            opacity: showTooltip ? 1 : 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {isPlaying ? '🎵 Now Playing' : '🎵 Play Music'}
        </div>

        {/* Floating Toggle Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`music-fab ${isPlaying ? 'playing' : ''}`}
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
            padding: 0,
            pointerEvents: 'auto', // ensure button is clickable
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1A1A" style={{ pointerEvents: 'none' }}>
              <rect x="4" y="3" width="3" height="10" />
              <rect x="9" y="3" width="3" height="10" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1A1A" style={{ pointerEvents: 'none' }}>
              <path d="M4 3L13 8L4 13V3Z" />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        .music-fab.playing {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 2px 12px rgba(0,0,0,0.12); }
          50% { box-shadow: 0 2px 12px rgba(0,0,0,0.12), 0 0 0 6px rgba(0,0,0,0.05); }
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
