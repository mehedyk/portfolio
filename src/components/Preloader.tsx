import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const preloaderWords = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'سلام',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
  'স্বাগতম',
];

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const wordFade = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 0.75,
    y: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader = ({ isLoading }: PreloaderProps) => {
  const [index, setIndex] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    if (index >= preloaderWords.length - 1) return;
    const duration = index === 0 ? 500 : 250;
    const timer = setTimeout(() => setIndex((prev) => prev + 1), duration);
    return () => clearTimeout(timer);
  }, [index, isLoading]);

  const { w, h } = dims;

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-wait"
          style={{ background: 'hsl(var(--foreground))' }}
          variants={slideUp}
          initial="initial"
          exit="exit"
        >
          {w > 0 && (
            <>
              <motion.div
                className="flex items-center gap-2"
                style={{
                  color: 'hsl(var(--background))',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}
                variants={wordFade}
                initial="initial"
                animate="enter"
                key={index}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'hsl(var(--background))',
                    display: 'inline-block',
                    marginRight: 12,
                  }}
                />
                <p>{preloaderWords[index]}</p>
              </motion.div>

              <motion.svg
                className="absolute top-0 w-full"
                style={{ height: 'calc(100% + 300px)', zIndex: -1 }}
              >
                <motion.path
                  style={{ fill: 'hsl(var(--foreground))' }}
                  variants={curve}
                  initial="initial"
                  exit="exit"
                />
              </motion.svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
