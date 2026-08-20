import { useEffect, useRef, useCallback } from 'react';
import { useThemeStore, CursorEffectType } from '@/stores/themeStore';

// ─── Theme accent colors ──────────────────────────────────────────────────────
const themeAccent: Record<string, string> = {
  'fard': '#baff2e',
  'true-classic': '#1c2938',
  'sin-city': '#fafafa',
  'nordic-light': '#3b82f6',
  'cli': '#5c93c7',
};

// ─── Effect implementations ───────────────────────────────────────────────────

function createBeacon(container: HTMLElement, x: number, y: number, color: string) {
  const count = 3;
  for (let i = 0; i < count; i++) {
    const ring = document.createElement('div');
    const size = 20 + i * 20;
    ring.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      border:2px solid ${color};border-radius:50%;pointer-events:none;
      transform:translate(-50%,-50%) scale(0);z-index:9999;
      animation:beacon-ring 1.2s ${i * 0.3}s ease-out forwards;
    `;
    container.appendChild(ring);
    setTimeout(() => ring.remove(), 1500);
  }
}

function createPixelate(container: HTMLElement, x: number, y: number, color: string) {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const px = document.createElement('div');
    const size = Math.random() * 10 + 4;
    const angle = (i / count) * Math.PI * 2;
    const dist = Math.random() * 40 + 10;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    px.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      background:${color};pointer-events:none;z-index:9999;
      transform:translate(-50%,-50%);opacity:1;
      animation:pixel-fly 0.6s ease-out forwards;
      --tx:${tx}px;--ty:${ty}px;
    `;
    container.appendChild(px);
    setTimeout(() => px.remove(), 700);
  }
}

function createInk(container: HTMLElement, x: number, y: number, color: string) {
  const blob = document.createElement('div');
  const size = Math.random() * 30 + 15;
  blob.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
    background:${color}cc;border-radius:${Math.random()*50+20}% ${Math.random()*50+20}% ${Math.random()*50+20}% ${Math.random()*50+20}%;
    pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
    animation:ink-fade 0.8s ease-out forwards;mix-blend-mode:screen;
  `;
  container.appendChild(blob);
  setTimeout(() => blob.remove(), 900);
}

function createFirefly(container: HTMLElement, x: number, y: number, color: string) {
  const count = 5;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 60 + 20;
    dot.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;
      background:${color};border-radius:50%;pointer-events:none;z-index:9999;
      transform:translate(-50%,-50%);box-shadow:0 0 8px ${color};
      animation:firefly-orbit 1.2s ${Math.random()*0.3}s ease-out forwards;
      --fx:${Math.cos(angle)*dist}px;--fy:${Math.sin(angle)*dist}px;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 1500);
  }
}

function createWormhole(container: HTMLElement, x: number, y: number, color: string) {
  const spiral = document.createElement('div');
  spiral.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:60px;height:60px;
    border:3px solid ${color};border-radius:50%;pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%) scale(0) rotate(0deg);
    animation:wormhole-spin 0.8s ease-out forwards;
    box-shadow:0 0 20px ${color}88,inset 0 0 20px ${color}44;
  `;
  container.appendChild(spiral);
  setTimeout(() => spiral.remove(), 900);
}

function createRain(container: HTMLElement, x: number, y: number, color: string) {
  for (let i = 0; i < 8; i++) {
    const drop = document.createElement('div');
    const ox = (Math.random() - 0.5) * 40;
    drop.style.cssText = `
      position:fixed;left:${x + ox}px;top:${y}px;width:2px;height:${Math.random()*20+10}px;
      background:linear-gradient(to bottom,transparent,${color});pointer-events:none;z-index:9999;
      animation:rain-drop 0.6s ${Math.random()*0.2}s ease-in forwards;
    `;
    container.appendChild(drop);
    setTimeout(() => drop.remove(), 900);
  }
}

function createConstellation(
  container: HTMLElement,
  x: number,
  y: number,
  color: string,
  history: { x: number; y: number }[]
) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;
    background:${color};border-radius:50%;pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);box-shadow:0 0 6px ${color};
    animation:constellation-fade 2s ease-out forwards;
  `;
  container.appendChild(dot);
  setTimeout(() => dot.remove(), 2000);

  if (history.length > 0) {
    const prev = history[history.length - 1];
    const dist = Math.hypot(x - prev.x, y - prev.y);
    if (dist < 80) {
      const line = document.createElement('div');
      const angle = Math.atan2(y - prev.y, x - prev.x) * (180 / Math.PI);
      line.style.cssText = `
        position:fixed;left:${prev.x}px;top:${prev.y}px;
        width:${dist}px;height:1px;background:${color}88;
        pointer-events:none;z-index:9998;
        transform-origin:0 0;transform:rotate(${angle}deg);
        animation:constellation-fade 2s ease-out forwards;
      `;
      container.appendChild(line);
      setTimeout(() => line.remove(), 2000);
    }
  }
}

function createGlitch(container: HTMLElement, x: number, y: number, color: string) {
  const colors = [color, '#ff0044', '#00ffff'];
  colors.forEach((c, i) => {
    const ghost = document.createElement('div');
    const offset = (i - 1) * 4;
    ghost.style.cssText = `
      position:fixed;left:${x + offset}px;top:${y + offset * 0.5}px;width:14px;height:14px;
      background:${c};pointer-events:none;z-index:9999;mix-blend-mode:screen;
      transform:translate(-50%,-50%);opacity:0.8;
      animation:glitch-blink 0.3s steps(1) forwards;
    `;
    container.appendChild(ghost);
    setTimeout(() => ghost.remove(), 400);
  });
}

function createGhost(container: HTMLElement, x: number, y: number, color: string) {
  const ghost = document.createElement('div');
  ghost.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:16px;height:16px;
    background:${color}66;border:1px solid ${color}88;border-radius:50%;
    pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
    box-shadow:0 0 10px ${color}44;
    animation:ghost-fade 0.8s ease-out forwards;
  `;
  container.appendChild(ghost);
  setTimeout(() => ghost.remove(), 900);
}

function createMatrixChar(container: HTMLElement, x: number, y: number, color: string) {
  const chars = '01アイウエオカキクケコサシスセソ';
  for (let i = 0; i < 5; i++) {
    const char = document.createElement('div');
    const ox = (Math.random() - 0.5) * 40;
    char.style.cssText = `
      position:fixed;left:${x + ox}px;top:${y}px;
      color:${color};font-family:monospace;font-size:${Math.random()*8+10}px;
      pointer-events:none;z-index:9999;
      animation:matrix-char-fall 0.8s ${Math.random()*0.3}s ease-in forwards;
      text-shadow:0 0 8px ${color};
    `;
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    container.appendChild(char);
    setTimeout(() => char.remove(), 1100);
  }
}

// ─── Comet trail (continuous) ─────────────────────────────────────────────────
class CometTrail {
  private particles: { el: HTMLElement; x: number; y: number; life: number }[] = [];
  private container: HTMLElement;
  private color: string;
  private animId: number = 0;
  private mouse = { x: 0, y: 0 };

  constructor(container: HTMLElement, color: string) {
    this.container = container;
    this.color = color;
    this.init();
  }

  private init() {
    const N = 15;
    for (let i = 0; i < N; i++) {
      const el = document.createElement('div');
      const size = 12 - i * 0.7;
      el.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;border-radius:50%;
        background:${this.color};pointer-events:none;z-index:9999;
        opacity:${1 - i * 0.06};box-shadow:0 0 ${8 - i * 0.4}px ${this.color};
        transform:translate(-50%,-50%);mix-blend-mode:screen;transition:none;
      `;
      this.container.appendChild(el);
      this.particles.push({ el, x: 0, y: 0, life: i });
    }
  }

  update(x: number, y: number) {
    this.mouse = { x, y };
  }

  animate() {
    const { x, y } = this.mouse;
    this.particles.forEach((p, i) => {
      const delay = i * 0.04;
      p.x += (x - p.x) * (0.3 - delay * 0.1);
      p.y += (y - p.y) * (0.3 - delay * 0.1);
      p.el.style.left = `${p.x}px`;
      p.el.style.top = `${p.y}px`;
    });
    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    this.particles.forEach(p => p.el.remove());
  }
}

// ─── Magnetic effect ──────────────────────────────────────────────────────────
function setupMagnetic(color: string) {
  const targets = document.querySelectorAll<HTMLElement>('button, a, [data-magnetic]');
  const handlers: [HTMLElement, (e: MouseEvent) => void, () => void][] = [];

  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        const strength = (100 - dist) / 100;
        el.style.transform = `translate(${dx * strength * 0.3}px, ${dy * strength * 0.3}px)`;
        el.style.transition = 'transform 0.1s ease-out';
        el.style.boxShadow = `0 0 20px ${color}66`;
      }
    };
    const onLeave = () => {
      el.style.transform = '';
      el.style.boxShadow = '';
      el.style.transition = 'transform 0.4s ease-out';
    };
    document.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    handlers.push([el, onMove, onLeave]);
  });

  return () => {
    handlers.forEach(([el, onMove, onLeave]) => {
      document.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  };
}

// ─── CSS keyframes injection ──────────────────────────────────────────────────
const CSS_KEYFRAMES = `
@keyframes beacon-ring{0%{transform:translate(-50%,-50%) scale(0);opacity:1}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes pixel-fly{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty)));opacity:0}}
@keyframes ink-fade{0%{transform:translate(-50%,-50%) scale(0);opacity:0.8}50%{transform:translate(-50%,-50%) scale(1.2);opacity:0.6}100%{transform:translate(-50%,-50%) scale(1);opacity:0}}
@keyframes firefly-orbit{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% + var(--fx)),calc(-50% + var(--fy)));opacity:0}}
@keyframes wormhole-spin{0%{transform:translate(-50%,-50%) scale(0) rotate(0deg);opacity:1}100%{transform:translate(-50%,-50%) scale(1.5) rotate(360deg);opacity:0}}
@keyframes rain-drop{0%{transform:translateY(0);opacity:1}100%{transform:translateY(60px);opacity:0}}
@keyframes constellation-fade{0%{opacity:1}100%{opacity:0}}
@keyframes glitch-blink{0%,100%{opacity:0.8}50%{opacity:0.2}}
@keyframes ghost-fade{0%{transform:translate(-50%,-50%) scale(1);opacity:0.6}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}
@keyframes matrix-char-fall{0%{transform:translateY(0);opacity:1}100%{transform:translateY(60px);opacity:0}}
`;

function injectKeyframes() {
  if (document.getElementById('cursor-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'cursor-keyframes';
  style.textContent = CSS_KEYFRAMES;
  document.head.appendChild(style);
}

const createSwordEffect = (x: number, y: number) => {
  // Create a small golden spark trail
  const spark = document.createElement('div');
  spark.style.cssText = `
    position: fixed; left: ${x}px; top: ${y}px;
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(255, 215, 0, 0.8);
    pointer-events: none; z-index: 9999;
    box-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
    transition: all 0.4s ease;
  `;
  document.body.appendChild(spark);
  requestAnimationFrame(() => {
    spark.style.opacity = '0';
    spark.style.transform = 'scale(0)';
  });
  setTimeout(() => spark.remove(), 400);
};

const createCelestialBurst = (x: number, y: number) => {
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / 16;
    const dist = 40 + Math.random() * 60;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const size = 3 + Math.random() * 5;
    particle.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px; border-radius: 50%;
      background: ${Math.random() > 0.5 ? 'rgba(255, 215, 0, 0.9)' : 'rgba(100, 200, 255, 0.8)'};
      pointer-events: none; z-index: 10000;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
      transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    document.body.appendChild(particle);
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
      particle.style.opacity = '0';
    });
    setTimeout(() => particle.remove(), 700);
  }
};

const handleSwordClick = (e: MouseEvent) => {
  const ghostPos = (window as any).__ghostPos?.current;
  if (ghostPos) {
    const dx = e.clientX - ghostPos.x;
    const dy = e.clientY - ghostPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 80) {
      createCelestialBurst(e.clientX, e.clientY);
      (window as any).__ghostVanish?.();
      return;
    }
  }
  // Normal click burst
  for (let i = 0; i < 6; i++) {
    createSwordEffect(
      e.clientX + (Math.random() - 0.5) * 30,
      e.clientY + (Math.random() - 0.5) * 30
    );
  }
};

// ─── Main component ───────────────────────────────────────────────────────────
export const CursorEffects = () => {
  const { cursorEffect, theme } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<CometTrail | null>(null);
  const historyRef = useRef<{ x: number; y: number }[]>([]);
  const cleanupMagnetic = useRef<(() => void) | null>(null);
  const cleanupAyatul = useRef<(() => void) | null>(null);
  const throttle = useRef(0);

  const color = themeAccent[theme] || '#00ff88';

  const handleMove = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    if (!containerRef.current) return;

    if (cursorEffect === 'comet') {
      cometRef.current?.update(x, y);
      return;
    }

    const now = Date.now();
    if (now - throttle.current < 60) return;
    throttle.current = now;

    switch (cursorEffect) {
      case 'beacon':
        if (Math.random() < 0.15) createBeacon(containerRef.current, x, y, color);
        break;
      case 'pixelate':
        createPixelate(containerRef.current, x, y, color);
        break;
      case 'ink':
        if (Math.random() < 0.3) createInk(containerRef.current, x, y, color);
        break;
      case 'firefly':
        if (Math.random() < 0.2) createFirefly(containerRef.current, x, y, color);
        break;
      case 'wormhole':
        if (Math.random() < 0.1) createWormhole(containerRef.current, x, y, color);
        break;
      case 'rain':
        if (Math.random() < 0.2) createRain(containerRef.current, x, y, color);
        break;
      case 'constellation':
        createConstellation(containerRef.current, x, y, color, historyRef.current);
        historyRef.current = [...historyRef.current.slice(-20), { x, y }];
        break;
      case 'glitch':
        if (Math.random() < 0.15) createGlitch(containerRef.current, x, y, color);
        break;
      case 'ghost':
        if (Math.random() < 0.2) createGhost(containerRef.current, x, y, color);
        break;
      case 'matrix':
        if (Math.random() < 0.15) createMatrixChar(containerRef.current, x, y, color);
        break;
    }
  }, [cursorEffect, color]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX: x, clientY: y } = e;
    // Always fire beacon on click regardless of current effect (feels good)
    createBeacon(containerRef.current, x, y, color);
  }, [color]);

  useEffect(() => {
    injectKeyframes();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear comet if switching away
    if (cometRef.current) { cometRef.current.destroy(); cometRef.current = null; }
    if (cleanupMagnetic.current) { cleanupMagnetic.current(); cleanupMagnetic.current = null; }
    if (cleanupAyatul.current) { cleanupAyatul.current(); cleanupAyatul.current = null; }
    historyRef.current = [];

    if (cursorEffect === 'none') return;

    if (cursorEffect === 'comet') {
      cometRef.current = new CometTrail(containerRef.current, color);
      cometRef.current.animate();
    }

    if (cursorEffect === 'magnetic') {
      cleanupMagnetic.current = setupMagnetic(color);
    }

    if (cursorEffect === 'ayatul-qursi') {
      const swordMoveHandler = (e: MouseEvent) => {
        if (Math.random() > 0.7) createSwordEffect(e.clientX, e.clientY);
      };
      window.addEventListener('mousemove', swordMoveHandler);
      window.addEventListener('click', handleSwordClick);
      document.body.style.cursor = 'crosshair';
      cleanupAyatul.current = () => {
        window.removeEventListener('mousemove', swordMoveHandler);
        window.removeEventListener('click', handleSwordClick);
        document.body.style.cursor = '';
      };
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('click', handleClick);
      if (cometRef.current) { cometRef.current.destroy(); cometRef.current = null; }
      if (cleanupMagnetic.current) { cleanupMagnetic.current(); cleanupMagnetic.current = null; }
      if (cleanupAyatul.current) { cleanupAyatul.current(); cleanupAyatul.current = null; }
    };
  }, [cursorEffect, color, handleMove, handleClick]);

  if (cursorEffect === 'none') return null;

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  );
};
