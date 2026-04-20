import { createContext } from 'react';

export interface MusicContextType {
  isPlaying: boolean;
  toggle: () => void;
}

export const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  toggle: () => {}
});
