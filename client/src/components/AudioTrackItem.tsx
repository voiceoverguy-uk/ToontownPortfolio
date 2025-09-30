import { useState, useEffect, useRef, useContext } from 'react';
import { SimpleAudioPlayer } from './SimpleAudioPlayer';
import { AudioContext } from './AudioContext';

interface AudioTrackItemProps {
  title: string;
  icon: React.ElementType;
  index: number;
  url: string;
  description?: string;
}

export function AudioTrackItem({ title, icon: Icon, index, url, description }: AudioTrackItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const { currentlyPlaying } = useContext(AudioContext);
  
  const testId = `audio-track-player-${index}`;
  const isPlaying = currentlyPlaying === testId;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`soundcloud-item transition-all duration-700 ${isVisible ? 'animate-in' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      data-testid={`audio-track-item-${index}`}
    >
      <div className={`bg-white border-4 rounded-2xl p-4 shadow-lg transition-colors duration-300 ${isPlaying ? 'border-mickey-red' : 'border-mickey-yellow'}`}>
        <div className="flex items-center mb-3">
          <Icon className="text-mickey-red text-xl mr-2" data-testid={`audio-track-icon-${index}`} />
          <span className="font-bold text-toontown-darkbrown">{title}</span>
        </div>
        <SimpleAudioPlayer 
          audioSrc={url}
          testId={testId}
        />
      </div>
      {description && (
        <div className="mt-2 flex justify-center">
          <div 
            className="px-4 py-1 border-3 border-mickey-red rounded-full text-center"
            data-testid={`audio-track-description-${index}`}
          >
            <span className="text-sm font-bold text-mickey-red">{description}</span>
          </div>
        </div>
      )}
    </div>
  );
}
