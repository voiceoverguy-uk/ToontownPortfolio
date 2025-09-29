import { createContext, useState } from 'react';

export const AudioContext = createContext<{
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}>({
  currentlyPlaying: null,
  setCurrentlyPlaying: () => {},
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  return (
    <AudioContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
