import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const sections = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'timeline', label: 'Journey', icon: '🗓️' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '💼' },
  { id: 'services', label: 'Services', icon: '🛠️' },
  { id: 'blog', label: 'Blog', icon: '📝' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'contact', label: 'Contact', icon: '📧' },
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
      >
        <Terminal className="w-6 h-6" />
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
                <span className="mr-2 text-lg">{section.icon}</span>
                <span>{section.label}</span>
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
