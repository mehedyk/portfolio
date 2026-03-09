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
import { DataDecryptionLoader } from '@/components/DataDecryptionLoader';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CursorTrail } from '@/components/CursorTrail';
import { CursorEffects } from '@/components/CursorEffects';
import { CursorEffectsPanel } from '@/components/CursorEffectsPanel';
import { CliTheme } from '@/components/CliTheme';

const Index = () => {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const themeClass = themes.find(t => t.id === theme)?.class || '';
    themes.forEach(t => {
      if (t.class) document.documentElement.classList.remove(t.class);
    });
    if (themeClass) document.documentElement.classList.add(themeClass);
  }, [theme]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isCli = theme === 'cli';

  return (
    <>
      <DataDecryptionLoader isLoading={isLoading} />

      {isCli ? (
        /* ── CLI Theme: full terminal takeover ── */
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          {/* CLI occupies full screen below nav */}
          <div style={{ paddingTop: '5rem' }}>
            <CliTheme onNavigate={scrollToSection} />
          </div>
          {/* Regular sections still exist below for scroll navigation */}
          <div style={{ display: 'none' }}>
            <Hero /><About /><Timeline /><Skills />
            <Projects /><Services /><Blog /><Testimonials /><Contact />
          </div>
          <Footer />
          <CommandPalette />
          <EasterEgg />
          <LanguageSelector />
          <CursorEffectsPanel />
          <CursorEffects />
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
          <CommandPalette />
          <EasterEgg />
          <LanguageSelector />
          <CursorTrail />
          <CursorEffectsPanel />
          <CursorEffects />
        </div>
      )}
    </>
  );
};

export default Index;
