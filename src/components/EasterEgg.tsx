import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const EasterEgg = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        triggerEasterEgg();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence]);

  const triggerEasterEgg = () => {
    if (activated) return;
    
    setActivated(true);
    setShowMessage(true);

    // Matrix rain effect
    createMatrixRain();

    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ff88', '#00d4ff', '#ffffff'],
    });

    // Add special class to body for matrix effect
    document.body.classList.add('matrix-activated');

    setTimeout(() => {
      setShowMessage(false);
      document.body.classList.remove('matrix-activated');
    }, 5000);

    setTimeout(() => {
      setActivated(false);
      setSequence([]);
    }, 10000);
  };

  const createMatrixRain = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationFrame: number;
    let frameCount = 0;
    const maxFrames = 300; // 5 seconds at 60fps

    function draw() {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      frameCount++;
      if (frameCount < maxFrames) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    draw();
  };

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
        >
          <div className="backdrop-blur-cyber border-4 border-primary rounded-2xl p-8 text-center border-glow-intense">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="w-24 h-24 text-primary mx-auto mb-4" />
            </motion.div>
            <h2 className="text-4xl font-heading text-glow-intense mb-4">
              KONAMI CODE ACTIVATED!
            </h2>
            <p className="text-xl font-ui text-secondary">
              You've unlocked the Matrix 🎮
            </p>
            <p className="text-sm font-body text-muted-foreground mt-4">
              Welcome to the secret hacker club!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
