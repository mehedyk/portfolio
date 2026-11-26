import { useCallback, useEffect, useMemo, useRef } from 'react';
import { CurtainThemeToggle, type Mode } from '@/components/ui/curtain-theme-toggle';
import { useThemeStore, themes, themeMode, type ThemeType } from '@/stores/themeStore';

/**
 * Quick light/dark switch with the curtain animation. It remembers which dark and which light
 * theme you used last, so toggling goes back to *your* theme, not a fixed default.
 * (The palette dropdown next to it still picks any of the five themes directly.)
 */
export const ThemeCurtainToggle = () => {
  const { theme, setTheme } = useThemeStore();
  const isDark = themeMode(theme) === 'dark';
  const last = useRef<Record<Mode, ThemeType>>({ dark: 'fard', light: 'true-classic' });

  useEffect(() => {
    last.current[themeMode(theme)] = theme;
    document.documentElement.classList.toggle('dark', isDark); // keeps Tailwind `dark:` variants honest
  }, [theme, isDark]);

  const bgOf = (id: ThemeType) => themes.find((t) => t.id === id)?.bg ?? '#000';
  const curtainColors = useMemo(
    () => ({ dark: bgOf(last.current.dark), light: bgOf(last.current.light) }),
    // recompute when the theme changes so the colour matches the theme we'd go back to
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  const onToggle = useCallback((next: Mode) => setTheme(last.current[next]), [setTheme]);

  return <CurtainThemeToggle isDark={isDark} onToggle={onToggle} curtainColors={curtainColors} />;
};
