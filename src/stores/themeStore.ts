import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'fard' | 'true-classic' | 'monolith' | 'nordic-light' | 'cli';

export type CliStyleType = 'classic' | 'amber' | 'hacker';

export type CursorEffectType =
  | 'none' | 'beacon' | 'comet' | 'pixelate' | 'magnetic' | 'ink'
  | 'firefly' | 'wormhole' | 'rain' | 'constellation' | 'glitch' | 'ghost' | 'matrix'
  | 'ayatul-qursi';

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  cliStyle: CliStyleType;
  setCliStyle: (style: CliStyleType) => void;
  cursorEffect: CursorEffectType;
  setCursorEffect: (effect: CursorEffectType) => void;
  ghostDocked: boolean;
  setGhostDocked: (docked: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'fard',
      isTransitioning: false,
      setTheme: (theme) => set({ theme }),
      setIsTransitioning: (value) => set({ isTransitioning: value }),
      cliStyle: 'classic',
      setCliStyle: (style) => set({ cliStyle: style }),
      cursorEffect: 'beacon',
      setCursorEffect: (effect) => set({ cursorEffect: effect }),
      ghostDocked: false,
      setGhostDocked: (docked) => set({ ghostDocked: docked }),
    }),
    {
      name: 'portfolio-theme',
      partialize: (state) => ({
        theme: state.theme,
        cliStyle: state.cliStyle,
        cursorEffect: state.cursorEffect,
        // ghostDocked is intentionally NOT persisted — ghost reappears on every page refresh
      }),
    }
  )
);

export const themes = [
  { id: 'fard', name: 'Fard', class: 'theme-fard', icon: '⚡' },
  { id: 'true-classic', name: 'True Classic', class: 'theme-true-classic', icon: '📄' },
  { id: 'monolith', name: 'Monolith', class: 'theme-monolith', icon: '◼️' },
  { id: 'nordic-light', name: 'Nordic Light', class: 'theme-nordic-light', icon: '❄️' },
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
  { id: 'ayatul-qursi', name: 'Ayatul Qursi', icon: '🗡️' },
];
