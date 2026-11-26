import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Home, User, CalendarDays, Zap, Briefcase, Wrench, BookOpen, MessageSquare, Mail, FileDown, Github, Linkedin } from 'lucide-react';
import { SITE } from '@/config/site';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const sections = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'timeline', label: 'Journey', icon: CalendarDays },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const actions = [
  { label: 'Download CV', icon: FileDown, href: SITE.cvUrl, download: true },
  { label: 'GitHub', icon: Github, href: SITE.social.github, download: false },
  { label: 'LinkedIn', icon: Linkedin, href: SITE.social.linkedin, download: false },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-glow-intense hover:scale-110 transition-transform shadow-2xl"
        whileHover={{ rotate: 180 }}
        aria-label="Open quick navigation (Ctrl+K)"
      >
        <Terminal className="w-6 h-6" aria-hidden="true" />
      </motion.button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="border-b border-primary/20 px-4 py-3 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="text-sm font-ui text-muted-foreground">
            Quick Navigation
          </span>
        </div>
        <CommandInput 
          placeholder="Type to search sections..." 
          className="border-none focus:ring-0"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sections">
            {sections.map((section) => (
              <CommandItem
                key={section.id}
                onSelect={() => scrollToSection(section.id)}
                className="cursor-pointer"
              >
                <section.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{section.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Links">
            {actions.map((a) => (
              <CommandItem
                key={a.label}
                onSelect={() => {
                  if (a.download) {
                    const el = document.createElement('a');
                    el.href = a.href; el.download = SITE.cvFileName; el.click();
                  } else {
                    window.open(a.href, '_blank', 'noopener,noreferrer');
                  }
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <a.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{a.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="border-t border-primary/20 px-4 py-3 text-xs text-muted-foreground font-ui">
          Press{' '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">Ctrl</kbd>
          {' + '}
          <kbd className="px-2 py-1 bg-muted rounded text-foreground">K</kbd>
          {' '}to toggle
        </div>
      </CommandDialog>
    </>
  );
};
