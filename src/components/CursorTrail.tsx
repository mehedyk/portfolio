import { useEffect, useRef, useState } from 'react';
import { useThemeStore, ThemeType } from '@/stores/themeStore';
import gsap from 'gsap';

// Theme-specific cursor colors with HSL values matching each theme
const themeColors: Record<ThemeType, string> = {
  'fard': 'hsl(78, 100%, 59%)', // Lime green accent
  'true-classic': '', // No trail for light themes
  'sin-city': 'hsl(0, 0%, 98%)', // Pure white
  'nordic-light': '', // No trail for light themes
  'cli': 'hsl(210, 65%, 59%)', // Kali blue
};

interface Particle {
  x: number;
  y: number;
  element: HTMLDivElement;
}

export const CursorTrail = () => {
  const { theme } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Don't render for light themes
  const isDisabled = theme === 'true-classic' || theme === 'nordic-light';

  useEffect(() => {
    if (isDisabled || !containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 10;
    const color = themeColors[theme] || themeColors['fard'];

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const element = document.createElement('div');
      element.className = 'cursor-particle';
      element.style.cssText = `
        position: fixed;
        width: ${12 - i * 0.8}px;
        height: ${12 - i * 0.8}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.08};
        box-shadow: 0 0 ${8 - i * 0.5}px ${color}, 0 0 ${15 - i}px ${color}40;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
      `;
      container.appendChild(element);
      particles.push({ x: 0, y: 0, element });
    }
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      const { x, y } = mousePos.current;
      
      particles.forEach((particle, i) => {
        const delay = i * 0.05;
        const targetX = x;
        const targetY = y;
        
        gsap.to(particle, {
          x: targetX,
          y: targetY,
          duration: 0.3 + delay,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: () => {
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
          },
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    // Handle visibility
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      particles.forEach((p) => p.element.remove());
    };
  }, [theme, isDisabled]);

  // Update particle colors when theme changes
  useEffect(() => {
    if (isDisabled) return;
    
    const color = themeColors[theme] || themeColors['fard'];
    particlesRef.current.forEach((particle, i) => {
      particle.element.style.background = color;
      particle.element.style.boxShadow = `0 0 ${8 - i * 0.5}px ${color}, 0 0 ${15 - i}px ${color}40`;
    });
  }, [theme, isDisabled]);

  if (isDisabled) return null;

  return (
    <div 
      ref={containerRef} 
      className="cursor-trail-container"
      style={{ 
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};
