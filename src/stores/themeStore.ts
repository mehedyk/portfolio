import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType =
  | 'true-classic' | 'monochrome' | 'classical' | 'cyber' | 'red-alert'
  | 'purple' | 'ocean' | 'sunset' | 'pink' | 'lime' | 'ice' | 'gold'
  | 'blade-runner' | 'cli';

export type CliStyleType = 'classic' | 'amber' | 'hacker';

export type CursorEffectType =
  | 'none' | 'beacon' | 'comet' | 'pixelate' | 'magnetic' | 'ink'
  | 'firefly' | 'wormhole' | 'rain' | 'constellation' | 'glitch' | 'ghost' | 'matrix';

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  cliStyle: CliStyleType;
  setCliStyle: (style: CliStyleType) => void;
  cursorEffect: CursorEffectType;
  setCursorEffect: (effect: CursorEffectType) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'true-classic',
      isTransitioning: false,
      setTheme: (theme) => set({ theme }),
      setIsTransitioning: (value) => set({ isTransitioning: value }),
      cliStyle: 'classic',
      setCliStyle: (style) => set({ cliStyle: style }),
      cursorEffect: 'beacon',
      setCursorEffect: (effect) => set({ cursorEffect: effect }),
    }),
    { name: 'portfolio-theme' }
  )
);

export const themes = [
  { id: 'true-classic', name: 'True Classic', class: '', icon: '📄' },
  { id: 'monochrome', name: 'Sin City', class: 'theme-monochrome', icon: '◼️' },
  { id: 'classical', name: 'Classical', class: 'theme-classical', icon: '🏛️' },
  { id: 'cyber', name: 'FARD', class: 'theme-cyber', icon: '⚡' },
  { id: 'red-alert', name: 'Matrix', class: 'theme-red-alert', icon: '🔴' },
  { id: 'purple', name: 'Fifth Element', class: 'theme-purple', icon: '🟣' },
  { id: 'ocean', name: 'Abyss', class: 'theme-ocean', icon: '🌊' },
  { id: 'sunset', name: 'Dune', class: 'theme-sunset', icon: '🌅' },
  { id: 'pink', name: 'Ex Machina', class: 'theme-pink', icon: '💖' },
  { id: 'lime', name: 'Alien', class: 'theme-lime', icon: '🟢' },
  { id: 'ice', name: 'Interstellar', class: 'theme-ice', icon: '❄️' },
  { id: 'gold', name: 'Star Wars', class: 'theme-gold', icon: '⭐' },
  { id: 'blade-runner', name: 'Blade Runner 2049', class: 'theme-blade-runner', icon: '🌆' },
  { id: 'cli', name: 'Terminal', class: 'theme-cli', icon: '💻' },
] as const;

export const cursorEffects: { id: CursorEffectType; name: string; icon: string }[] = [
  { id: 'none', name: 'None', icon: '✖' },
  { id: 'beacon', name: 'Beacon', icon: '📡' },
  { id: 'comet', name: 'Comet', icon: '☄️' },
  { id: 'pixelate', name: 'Pixelate', icon: '🟦' },
  { id: 'magnetic', name: 'Magnetic', icon: '🧲' },
  { id: 'ink', name: 'Ink Bleed', icon: '🖋️' },
  { id: 'firefly', name: 'Firefly', icon: '✨' },
  { id: 'wormhole', name: 'Wormhole', icon: '🌀' },
  { id: 'rain', name: 'Rain', icon: '🌧️' },
  { id: 'constellation', name: 'Constellation', icon: '⭐' },
  { id: 'glitch', name: 'Glitch', icon: '📺' },
  { id: 'ghost', name: 'Ghost', icon: '👻' },
  { id: 'matrix', name: 'Matrix', icon: '🟩' },
];
