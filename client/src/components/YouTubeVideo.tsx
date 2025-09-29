import { useEffect, useRef, useState, useContext } from 'react';
import { AudioContext } from './AudioContext';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  label: string;
  testId: string;
}

export function YouTubeVideo({ videoId, title, label, testId }: YouTubeVideoProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsPlaying(true);
            setCurrentlyPlaying(`youtube-${testId}`);
          } else if (data.info === 2 || data.info === 0) {
            setIsPlaying(false);
            if (currentlyPlaying === `youtube-${testId}`) {
              setCurrentlyPlaying(null);
            }
          }
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [testId, currentlyPlaying, setCurrentlyPlaying]);

  useEffect(() => {
    if (currentlyPlaying !== `youtube-${testId}` && isPlaying && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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
      <iframe
        ref={iframeRef}
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
        data-testid={`youtube-iframe-${testId}`}
      />
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
