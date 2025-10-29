import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 
  | 'cyber' 
  | 'red-alert' 
  | 'purple' 
  | 'ocean' 
  | 'sunset' 
  | 'pink' 
  | 'lime' 
  | 'ice' 
  | 'gold' 
  | 'violet';

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'cyber',
      isTransitioning: false,
      setTheme: (theme) => set({ theme }),
      setIsTransitioning: (value) => set({ isTransitioning: value }),
    }),
    {
      name: 'portfolio-theme',
    }
  )
);

export const themes = [
  { id: 'cyber', name: 'Cyber Hacker', class: '', icon: '⚡' },
  { id: 'red-alert', name: 'Red Alert', class: 'theme-red-alert', icon: '🔴' },
  { id: 'purple', name: 'Purple Haze', class: 'theme-purple', icon: '🟣' },
  { id: 'ocean', name: 'Ocean Blue', class: 'theme-ocean', icon: '🌊' },
  { id: 'sunset', name: 'Sunset', class: 'theme-sunset', icon: '🌅' },
  { id: 'pink', name: 'Pink Electric', class: 'theme-pink', icon: '💖' },
  { id: 'lime', name: 'Lime Acid', class: 'theme-lime', icon: '🟢' },
  { id: 'ice', name: 'Ice Blue', class: 'theme-ice', icon: '❄️' },
  { id: 'gold', name: 'Gold Luxury', class: 'theme-gold', icon: '⭐' },
  { id: 'violet', name: 'Violet Storm', class: 'theme-violet', icon: '⚡' },
] as const;
