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
  }
}

export function YouTubeVideo({ videoId, title, label, testId }: YouTubeVideoProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (apiReady && containerRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(`youtube-player-${testId}`, {
        videoId: videoId,
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true);
              setCurrentlyPlaying(`youtube-${testId}`);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
              if (currentlyPlaying === `youtube-${testId}`) {
                setCurrentlyPlaying(null);
              }
            }
          },
        },
      });
    }
  }, [apiReady, videoId, testId, setCurrentlyPlaying]);

  useEffect(() => {
    if (currentlyPlaying !== `youtube-${testId}` && isPlaying && playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, [currentlyPlaying, testId, isPlaying]);

  return (
    <div
      ref={containerRef}
      className={`bg-white border-8 rounded-2xl p-4 shadow-lg transition-colors duration-300 ${
        isPlaying ? 'border-mickey-red' : 'border-mickey-yellow'
      }`}
      data-testid={`video-container-${testId}`}
    >
      <div id={`youtube-player-${testId}`} className="rounded-lg" />
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
