import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Github, Linkedin, FileDown } from 'lucide-react';
import { SiFacebook, SiCodeforces, SiLeetcode } from 'react-icons/si';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { ThemeCurtainToggle } from './ThemeCurtainToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const navItems = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'timeline', labelKey: 'nav.timeline' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'blog', labelKey: 'nav.blog' },
  { id: 'testimonials', labelKey: 'nav.testimonials' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4"
      data-theme-animate
    >
      <div
        className="container mx-auto rounded-xl border px-4 sm:px-6 py-3"
        style={{
          background: 'hsl(var(--card) / 0.85)',
          borderColor: 'hsl(var(--border))',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-heading text-lg">
              {SITE.shortName}<span className="text-muted-foreground">.dev</span>
            </span>
          </motion.div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group font-mono"
              >
                {t(item.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Right: Social Icons + Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Icons - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 mr-2 border-r pr-3" style={{ borderColor: 'hsl(var(--border))' }}>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Facebook" aria-label="Facebook">
                <SiFacebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={SITE.social.codeforces} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Codeforces" aria-label="Codeforces">
                <SiCodeforces className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="GitHub" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={SITE.social.leetcode} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="LeetCode" aria-label="LeetCode">
                <SiLeetcode className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex font-mono border-primary/40 hover:border-primary">
              <a href={SITE.cvUrl} download={SITE.cvFileName}><FileDown className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('nav.cv')}</a>
            </Button>
            <LanguageSwitcher />
            <ThemeCurtainToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden pt-4 pb-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-sm hover:text-primary transition-colors font-mono"
                >
                  {t(item.labelKey)}
                </button>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><SiFacebook className="w-5 h-5" aria-hidden="true" /></a>
                <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
