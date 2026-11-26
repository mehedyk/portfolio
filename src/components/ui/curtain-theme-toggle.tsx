"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Curtain theme toggle — adapted from the "curtain-theme-toggle" component.
 *
 * What was kept: the curtain animation (cubic-bezier(0.76,0,0.24,1), fall → swap → rise),
 * the round icon button and its hover/press scale.
 *
 * What changed, and why:
 *  - Controlled: the original owned a private light/dark state. This portfolio has five themes
 *    in a zustand store, so the parent now passes `isDark` and decides what "toggle" means.
 *    One source of truth = the icon can never drift out of sync with the real theme.
 *  - Curtain colour is passed in (the *next* theme's background) instead of two hard-coded greys.
 *  - Colours come from the active theme's CSS variables, so the button matches every theme.
 *  - Honours prefers-reduced-motion (swaps instantly, no curtain).
 *  - Timers are cleaned up on unmount.
 */

export type Mode = 'light' | 'dark';

export interface CurtainThemeToggleProps {
  isDark: boolean;
  /** Called at the moment the curtain fully covers the page — swap the theme here. */
  onToggle: (next: Mode) => void;
  /** CSS colour of the curtain per target mode (use the destination theme's background). */
  curtainColors: Record<Mode, string>;
  /** Curtain animation duration in ms. Default 550 */
  duration?: number;
  /** Diameter of the button in px. Default 36 */
  buttonSize?: number;
}

type Phase = 'idle' | 'falling' | 'rising';
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';

export function CurtainThemeToggle({ isDark, onToggle, curtainColors, duration = 550, buttonSize = 36 }: CurtainThemeToggleProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const curtainColor = useRef<string>('transparent');
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const toggle = useCallback(() => {
    if (phase !== 'idle') return;
    const next: Mode = isDark ? 'light' : 'dark';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onToggle(next);
      return;
    }

    curtainColor.current = curtainColors[next];
    setPhase('falling');
    timers.current.push(
      window.setTimeout(() => {
        onToggle(next);
        setPhase('rising');
        timers.current.push(window.setTimeout(() => setPhase('idle'), duration + 60));
      }, duration),
    );
  }, [phase, isDark, onToggle, curtainColors, duration]);

  const scale = pressed ? 0.96 : hovered ? 1.1 : 1;
  const btn: CSSProperties = {
    width: buttonSize, height: buttonSize, borderRadius: '50%', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    background: 'hsl(var(--background))', color: 'hsl(var(--foreground))',
    boxShadow: '0 0 0 1.5px hsl(var(--primary) / 0.45)',
    transform: `scale(${scale})`,
    transition: 'transform 0.15s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease',
  };
  const curtain: CSSProperties = {
    position: 'fixed', inset: 0, background: curtainColor.current, transformOrigin: 'top',
    transform: phase === 'falling' ? 'scaleY(1)' : 'scaleY(0)',
    transition: phase !== 'idle' ? `transform ${duration}ms ${EASING}` : 'none',
    zIndex: 9997, pointerEvents: 'none',
  };

  return (
    <>
      <div aria-hidden="true" style={curtain} />
      <button
        type="button"
        style={btn}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        aria-label={isDark ? 'Switch to a light theme' : 'Switch to a dark theme'}
        aria-pressed={isDark}
        title={isDark ? 'Light theme' : 'Dark theme'}
      >
        {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
      </button>
    </>
  );
}
