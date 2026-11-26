import { useRef } from 'react';
import { useThemeStore, themes } from '@/stores/themeStore';
import gsap from 'gsap';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeToggle = () => {
  const { theme, setTheme, setIsTransitioning } = useThemeStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleThemeChange = (newTheme: typeof theme) => {
    if (newTheme === theme) return;
    
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
        setTheme(newTheme);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={buttonRef}
          variant="outline" 
          size="icon"
          className="border-glow hover:border-glow-intense transition-all duration-300"
          aria-label="Choose theme"
        >
          <Palette className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 backdrop-blur-cyber border-glow"
      >
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => handleThemeChange(t.id as typeof theme)}
            className={`cursor-pointer ${
              theme === t.id ? 'bg-primary/20 text-primary' : ''
            }`}
          >
            <t.icon className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{t.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
