import { useEffect, useState } from 'react';
import { useThemeStore, themes } from '@/stores/themeStore';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Blog } from '@/components/sections/Blog';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { CommandPalette } from '@/components/CommandPalette';
import { Footer } from '@/components/Footer';
import { EasterEgg } from '@/components/EasterEgg';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Preloader } from '@/components/Preloader';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CursorTrail } from '@/components/CursorTrail';
import { CursorEffects } from '@/components/CursorEffects';
import { CursorEffectsPanel } from '@/components/CursorEffectsPanel';
import { CliTheme } from '@/components/CliTheme';
import { GhostChatbot } from '@/components/GhostChatbot';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LumoraShowcase } from '@/components/LumoraShowcase';

const Index = () => {
  const { theme } = useThemeStore();
  // The intro plays once per browser session, and never for people who ask for reduced motion.
  const [isLoading, setIsLoading] = useState(() => {
    try {
      const seen = sessionStorage.getItem('intro-seen') === '1';
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !seen && !reduced;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      try { sessionStorage.setItem('intro-seen', '1'); } catch { /* private mode: fine */ }
    }, 2400);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const themeClass = themes.find(t => t.id === theme)?.class || '';
    themes.forEach(t => {
      if (t.class) document.documentElement.classList.remove(t.class);
    });
    if (themeClass) document.documentElement.classList.add(themeClass);
  }, [theme]);

  const isCli = theme === 'cli';

  return (
    <>
      <Preloader isLoading={isLoading} />

      {isCli ? (
        /* ── CLI Theme: full terminal takeover ── */
        <div className="h-screen w-screen overflow-hidden">
          <CliTheme />
          <div style={{ display: 'none' }}>
            <Hero /><About /><Timeline /><Skills />
            <Projects /><Services /><Blog /><Testimonials /><Contact />
          </div>
          <CommandPalette />
          <EasterEgg />
          <LanguageSelector />
          <CursorEffectsPanel />
          <ErrorBoundary label="CursorEffects" fallback={null}><CursorEffects /></ErrorBoundary>
          <ErrorBoundary label="GhostChatbot" fallback={null}><GhostChatbot /></ErrorBoundary>
        </div>
      ) : (
        /* ── Normal themes ── */
        <div className="min-h-screen bg-background text-foreground">
          <ScrollProgress />
          <Navigation />
          <Hero />
          <About />
          <Timeline />
          <Skills />
          <Projects />
          <Services />
          <Blog />
          <Testimonials />
          <Contact />
          <Footer />
          <ErrorBoundary label="Lumora" fallback={null}><LumoraShowcase /></ErrorBoundary>
          <CommandPalette />
          <EasterEgg />
          <LanguageSelector />
          <ErrorBoundary label="CursorTrail" fallback={null}><CursorTrail /></ErrorBoundary>
          <CursorEffectsPanel />
          <ErrorBoundary label="CursorEffects" fallback={null}><CursorEffects /></ErrorBoundary>
          <ErrorBoundary label="GhostChatbot" fallback={null}><GhostChatbot /></ErrorBoundary>
        </div>
      )}
    </>
  );
};

export default Index;
