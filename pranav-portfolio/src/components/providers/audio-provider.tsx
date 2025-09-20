'use client';

import { createContext, useContext, ReactNode } from 'react';
import { AudioControls } from '@/components/audio-controls';

// This provider ensures the audio system is initialized globally
const AudioContext = createContext<null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  return (
    <AudioContext.Provider value={null}>
      {children}
      <AudioControls />
    </AudioContext.Provider>
  );
}

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  return context;
};