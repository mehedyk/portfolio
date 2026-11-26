import type { ThemeType } from '@/stores/themeStore';

export interface ThemePhoto {
  /** Responsive sources (480w + large). */
  small: string; large: string; largeW: number;
  alt: string;
  /** Keeps the face centred inside the hexagon crop. */
  objectPosition: string;
  /** CSS filter that gives each theme its own look from the same file. */
  filter?: string;
  /** Optional zoom (+ transform-origin) to crop distracting edges inside the hexagon. */
  zoom?: number;
  origin?: string;
}

const PRO: Omit<ThemePhoto, 'filter'> = {
  small: '/images/portrait-pro-480.webp', large: '/images/portrait-pro-960.webp', largeW: 960,
  alt: 'Portrait of S.M. Mehedy Kawser in a blue shirt and tie', objectPosition: '50% 30%',
  // the source photo has a grey utility box on its right edge; this crops it out of the hexagon
  zoom: 1.22, origin: '35% 30%',
};
const DARK: Omit<ThemePhoto, 'filter'> = {
  small: '/images/portrait-dark-480.webp', large: '/images/portrait-dark-777.webp', largeW: 777,
  alt: 'Portrait of S.M. Mehedy Kawser in a dark hoodie, lit by a phone screen', objectPosition: '50% 40%',
};

/** Two photos, five looks. */
export const THEME_PHOTO: Record<ThemeType, ThemePhoto> = {
  'fard':         { ...DARK },
  'monolith':     { ...DARK, filter: 'grayscale(1) contrast(1.15) brightness(1.05)' },
  'true-classic': { ...PRO,  filter: 'sepia(0.18) saturate(0.95)' },
  'nordic-light': { ...PRO,  filter: 'saturate(0.9) hue-rotate(-6deg) brightness(1.03)' },
  'cli':          { ...DARK, filter: 'grayscale(1) sepia(1) hue-rotate(70deg) saturate(2.2) brightness(0.9)' },
};

/** The photo that is NOT in the hero for this theme — shown in About so both get used. */
/** About shows a taller crop, where the box is already cut off, so no zoom there. */
export const alternatePhoto = (theme: ThemeType): ThemePhoto =>
  THEME_PHOTO[theme].small === PRO.small ? { ...DARK } : { ...PRO };
