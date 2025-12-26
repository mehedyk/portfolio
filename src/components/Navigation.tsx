import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { ThemeCycleButton } from './ThemeCycleButton';
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-cyber border-b border-primary/20"
      data-theme-animate
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - CHANGE NAME HERE */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl text-primary">MehedyK</span>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group font-mono"
              >
                {t(item.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            
            {/* Social Icons - ADD/CHANGE YOUR SOCIAL LINKS HERE */}
            <div className="flex items-center gap-3 ml-4 border-l border-border pl-4">
              <a href="https://www.facebook.com/mahdi.kawser" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://codeforces.com/profile/mehedyk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="CodeForces">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/mehedyk/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/mehedyk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://leetcode.com/mehedyk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="LeetCode">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
              </a>
            </div>

            {/* Theme & Language Toggles */}
            <div className="flex items-center gap-2 ml-2">
              <LanguageSwitcher />
              <ThemeCycleButton />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeCycleButton />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 hover:text-primary transition-colors"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
