import { useEffect } from 'react';
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

const Index = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const themeClass = themes.find(t => t.id === theme)?.class || '';
    
    // Remove all theme classes
    themes.forEach(t => {
      if (t.class) document.documentElement.classList.remove(t.class);
    });
    
    // Add current theme class
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
    }
  }, [theme]);

  return (
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
    </div>
  );
};

export default Index;
