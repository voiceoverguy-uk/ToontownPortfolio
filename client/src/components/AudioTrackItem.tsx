import { useState, useEffect, useRef, useContext } from 'react';
import { Info } from 'lucide-react';
import { SimpleAudioPlayer } from './SimpleAudioPlayer';
import { AudioContext } from './AudioContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon className="text-mickey-red text-xl mr-2" data-testid={`audio-track-icon-${index}`} />
            <span className="font-bold text-toontown-darkbrown">{title}</span>
          </div>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="text-mickey-red hover:text-mickey-yellow transition-colors"
                    data-testid={`audio-track-info-${index}`}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-mickey-yellow text-toontown-darkbrown font-bold border-2 border-mickey-red z-50">
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <SimpleAudioPlayer 
          audioSrc={url}
          testId={testId}
        />
      </div>
    </div>
  );
}
