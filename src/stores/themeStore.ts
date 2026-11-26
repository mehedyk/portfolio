import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LucideIcon } from 'lucide-react';
import {
  Zap, FileText, Square, Snowflake, Terminal, Ban, Radar, Rocket, Grid3x3, Magnet, PenTool,
  Sparkles, Orbit, CloudRain, Star, Tv, Ghost, Binary, Sword,
} from 'lucide-react';

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

export type ThemeMode = 'dark' | 'light';

export const themes = [
  { id: 'fard',          name: 'Fard',         class: 'theme-fard',          icon: Zap,       mode: 'dark',  bg: 'hsl(220 20% 10%)' },
  { id: 'true-classic',  name: 'True Classic', class: 'theme-true-classic',  icon: FileText,  mode: 'light', bg: 'hsl(40 20% 96%)' },
  { id: 'monolith',      name: 'Monolith',     class: 'theme-monolith',      icon: Square,    mode: 'dark',  bg: 'hsl(0 0% 5%)' },
  { id: 'nordic-light',  name: 'Nordic Light', class: 'theme-nordic-light',  icon: Snowflake, mode: 'light', bg: 'hsl(210 20% 97%)' },
  { id: 'cli',           name: 'Terminal',     class: 'theme-cli',           icon: Terminal,  mode: 'dark',  bg: 'hsl(215 35% 7%)' },
] as const satisfies readonly { id: ThemeType; name: string; class: string; icon: LucideIcon; mode: ThemeMode; bg: string }[];

export const themeMode = (id: ThemeType): ThemeMode => themes.find((t) => t.id === id)?.mode ?? 'dark';

export const cursorEffects: { id: CursorEffectType; name: string; icon: LucideIcon }[] = [
  { id: 'none', name: 'None', icon: Ban },
  { id: 'beacon', name: 'Beacon', icon: Radar },
  { id: 'comet', name: 'Comet', icon: Rocket },
  { id: 'pixelate', name: 'Pixelate', icon: Grid3x3 },
  { id: 'magnetic', name: 'Magnetic', icon: Magnet },
  { id: 'ink', name: 'Ink Bleed', icon: PenTool },
  { id: 'firefly', name: 'Firefly', icon: Sparkles },
  { id: 'wormhole', name: 'Wormhole', icon: Orbit },
  { id: 'rain', name: 'Rain', icon: CloudRain },
  { id: 'constellation', name: 'Constellation', icon: Star },
  { id: 'glitch', name: 'Glitch', icon: Tv },
  { id: 'ghost', name: 'Ghost', icon: Ghost },
  { id: 'matrix', name: 'Matrix', icon: Binary },
  { id: 'ayatul-qursi', name: 'Ayatul Qursi', icon: Sword },
];
