import { useRef } from 'react';
import { useThemeStore, themes, ThemeType } from '@/stores/themeStore';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeCycleButton = () => {
  const { theme, setTheme, setIsTransitioning } = useThemeStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex].id as ThemeType;
    
    setIsTransitioning(true);
    
    // Trigger cascade animation
    const elements = document.querySelectorAll('[data-theme-animate]');
    
    gsap.timeline()
      .to(buttonRef.current, {
        scale: 1.2,
        rotateZ: 360,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
      .to(elements, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.in',
      })
      .call(() => {
        setTheme(nextTheme);
      })
      .to(elements, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
      })
      .call(() => {
        setIsTransitioning(false);
      });
  };

  return (
    <Button 
      ref={buttonRef}
      variant="outline" 
      size="icon"
      onClick={cycleTheme}
      className="border-glow hover:border-glow-intense transition-all duration-300"
      title="Cycle Themes"
    >
      <Sparkles className="h-5 w-5" />
    </Button>
  );
};
