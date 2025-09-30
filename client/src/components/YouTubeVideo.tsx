import { useEffect, useRef, useState, useContext } from 'react';
import { AudioContext } from './AudioContext';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  label: string;
  testId: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    ytApiReadyCallbacks?: (() => void)[];
  }
}

// Shared YouTube API loader
const loadYouTubeAPI = (callback: () => void) => {
  if (!window.ytApiReadyCallbacks) {
    window.ytApiReadyCallbacks = [];
  }

  window.ytApiReadyCallbacks.push(callback);

  if (window.YT && window.YT.Player) {
    // API already loaded
    window.ytApiReadyCallbacks.forEach(cb => cb());
    window.ytApiReadyCallbacks = [];
  } else if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    // Load API for the first time
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (window.ytApiReadyCallbacks) {
        window.ytApiReadyCallbacks.forEach(cb => cb());
        window.ytApiReadyCallbacks = [];
      }
    };
  }
};

export function YouTubeVideo({ videoId, title, label, testId }: YouTubeVideoProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const divId = `youtube-player-${testId}`;

  useEffect(() => {
    const initPlayer = () => {
      if (!playerRef.current && document.getElementById(divId)) {
        playerRef.current = new window.YT.Player(divId, {
          videoId: videoId,
          width: '100%',
          height: '315',
          playerVars: {
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === 1) {
                // Playing
                setIsPlaying(true);
                setCurrentlyPlaying(`youtube-${testId}`);
              } else if (event.data === 2 || event.data === 0) {
                // Paused or Ended
                setIsPlaying(false);
                if (currentlyPlaying === `youtube-${testId}`) {
                  setCurrentlyPlaying(null);
                }
              }
            },
          },
        });
      }
    };

    loadYouTubeAPI(initPlayer);

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore errors during cleanup
        }
        playerRef.current = null;
      }
    };
  }, [videoId, testId, setCurrentlyPlaying]);

  useEffect(() => {
    if (currentlyPlaying !== `youtube-${testId}` && isPlaying && playerRef.current && playerRef.current.pauseVideo) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (e) {
        // Ignore errors
      }
    }
  }, [currentlyPlaying, testId, isPlaying]);

  return (
    <div
      className={`bg-white border-8 rounded-2xl p-4 shadow-lg transition-colors duration-300 ${
        isPlaying ? 'border-mickey-red' : 'border-mickey-yellow'
      }`}
      data-testid={`video-container-${testId}`}
    >
      <div id={divId} className="rounded-lg overflow-hidden" style={{ width: '100%', height: '315px' }} />
      <p
        className="text-center font-bold text-xl mt-3 text-mickey-red"
        data-testid={`video-label-${testId}`}
      >
        {label}
      </p>
    </div>
  );
}
