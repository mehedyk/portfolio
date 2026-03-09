import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, X } from 'lucide-react';
import { useThemeStore, cursorEffects, CursorEffectType } from '@/stores/themeStore';

export const CursorEffectsPanel = () => {
  const { cursorEffect, setCursorEffect } = useThemeStore();
  const [open, setOpen] = useState(false);

  const active = cursorEffects.find(e => e.id === cursorEffect);

  return (
    <div
      className="fixed z-50"
      style={{ top: '5.5rem', right: '1.25rem' }}
    >
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="
          flex items-center gap-2 px-3 py-1.5 rounded-lg
          bg-background/80 backdrop-blur-md
          border border-primary/30 hover:border-primary/70
          text-foreground text-xs font-mono
          shadow-lg transition-all duration-200
          group
        "
        title="Cursor Effects"
      >
        <Wand2 className="w-3.5 h-3.5 text-primary group-hover:animate-spin" />
        <span className="hidden sm:inline text-primary/80">{active?.icon}</span>
        <span className="hidden sm:inline opacity-60 max-w-[70px] truncate">{active?.name}</span>
        {open ? <X className="w-3 h-3 opacity-50" /> : null}
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute right-0 top-10 w-52
              bg-background/95 backdrop-blur-xl
              border border-primary/20 rounded-xl
              shadow-2xl overflow-hidden
            "
          >
            <div className="px-3 py-2 border-b border-primary/10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Cursor Effect
              </p>
            </div>
            <div className="p-1.5 max-h-80 overflow-y-auto">
              {cursorEffects.map(effect => (
                <button
                  key={effect.id}
                  onClick={() => { setCursorEffect(effect.id as CursorEffectType); setOpen(false); }}
                  className={`
                    w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg
                    text-xs font-mono text-left transition-all duration-150
                    ${cursorEffect === effect.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary/10 text-foreground/80'}
                  `}
                >
                  <span className="text-base leading-none">{effect.icon}</span>
                  <span>{effect.name}</span>
                  {cursorEffect === effect.id && (
                    <span className="ml-auto text-primary-foreground/70">●</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
