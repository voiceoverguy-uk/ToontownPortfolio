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
    ytApiReady?: boolean;
  }
}

export function YouTubeVideo({ videoId, title, label, testId }: YouTubeVideoProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const divId = `youtube-player-${testId}`;

  useEffect(() => {
    const initPlayer = () => {
      if (!playerRef.current && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(divId, {
          videoId: videoId,
          width: '100%',
          height: '315',
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

    if (!window.YT) {
      // Load YouTube API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        window.ytApiReady = true;
        initPlayer();
      };
    } else if (window.ytApiReady || (window.YT && window.YT.Player)) {
      initPlayer();
    } else {
      // API script loaded but not ready yet
      const checkReady = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkReady);
          initPlayer();
        }
      }, 100);

      return () => clearInterval(checkReady);
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, testId, setCurrentlyPlaying]);

  useEffect(() => {
    if (currentlyPlaying !== `youtube-${testId}` && isPlaying && playerRef.current && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
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
        className={`text-center font-bold text-xl mt-3 transition-colors duration-300 ${
          isPlaying ? 'text-mickey-red' : 'text-mickey-yellow'
        }`}
        data-testid={`video-label-${testId}`}
      >
        {label}
      </p>
    </div>
  );
}
