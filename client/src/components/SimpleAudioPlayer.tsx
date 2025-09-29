import { useState, useEffect, useRef, useContext } from 'react';
import { AudioContext } from './AudioContext';

interface SimpleAudioPlayerProps {
  audioSrc: string;
  testId: string;
}

export function SimpleAudioPlayer({ audioSrc, testId }: SimpleAudioPlayerProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentlyPlaying !== testId && isPlaying) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [currentlyPlaying, testId, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentlyPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setCurrentlyPlaying(null);
      } else {
        setCurrentlyPlaying(testId);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 w-48 md:w-56" data-testid={testId}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-6 h-6 bg-gray-600 text-white rounded-sm flex items-center justify-center hover:bg-gray-500 transition-colors"
        data-testid={`${testId}-play-button`}
      >
        {isPlaying ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 4l8 6-8 6V4z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <span className="text-xs text-gray-600 font-medium">
        {formatTime(currentTime)}
      </span>

      <div className="flex-1 bg-gray-300 rounded-full h-1">
        <div 
          className="bg-gray-600 h-1 rounded-full transition-all duration-100"
          style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
        />
      </div>

      <span className="text-xs text-gray-600 font-medium">
        {formatTime(duration)}
      </span>
    </div>
  );
}
