import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataDecryptionLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export const DataDecryptionLoader = ({ isLoading, onComplete }: DataDecryptionLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  const decryptionStages = [
    'INITIALIZING NEURAL INTERFACE...',
    'SCANNING QUANTUM NETWORK...',
    'DECRYPTING DATA BLOCKS...',
    'SYNCHRONIZING PROTOCOLS...',
    'COMPILING INTERFACE...',
    'FINALIZING CONNECTIONS...',
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setDisplayText('');
      return;
    }

    let currentStage = 0;
    let progressInterval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              onComplete?.();
            }, 500);
            return 100;
          }
          
          // Change stage based on progress
          const stageIndex = Math.floor((newProgress / 100) * decryptionStages.length);
          if (stageIndex !== currentStage && stageIndex < decryptionStages.length) {
            currentStage = stageIndex;
            setDisplayText(decryptionStages[stageIndex]);
          }
          
          return newProgress;
        });
      }, 200);
    };

    // Glitch text effect
    const glitchText = () => {
      const chars = '!<>-_\\/[]{}—=+*^?#________';
      const stages = decryptionStages;
      
      textInterval = setInterval(() => {
        const stage = stages[Math.min(currentStage, stages.length - 1)];
        const glitched = stage.split('').map((char, i) => 
          Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : char
        ).join('');
        
        setDisplayText(glitched);
        
        setTimeout(() => {
          setDisplayText(stages[Math.min(currentStage, stages.length - 1)]);
        }, 50);
      }, 2000);
    };

    updateProgress();
    glitchText();

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative w-full max-w-2xl px-8">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-primary/30"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="relative space-y-8">
              {/* Logo/Title */}
              <motion.div
                className="text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-heading text-primary text-glow mb-2">
                  MehedyK
                </h2>
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  PORTFOLIO SYSTEM v2.0
                </div>
              </motion.div>

              {/* Status text with glitch effect */}
              <motion.div
                className="text-center font-mono text-lg text-primary h-8"
                key={displayText}
              >
                {displayText}
              </motion.div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="relative h-2 bg-muted rounded-full overflow-hidden border border-primary/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-cyber-secondary to-primary bg-[length:200%_100%]"
                    style={{ width: `${progress}%` }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute inset-y-0 w-1 bg-primary/50 blur-sm"
                    style={{ left: `${progress}%` }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                    }}
                  />
                </div>

                {/* Progress percentage */}
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>LOADING...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
              </div>

              {/* Data blocks animation */}
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-muted rounded"
                    animate={{
                      backgroundColor: progress > (i * 12.5) 
                        ? 'hsl(var(--primary))' 
                        : 'hsl(var(--muted))',
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Binary rain effect */}
              <div className="absolute -inset-x-20 top-0 h-full overflow-hidden opacity-10 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xs font-mono text-primary"
                    style={{ left: `${i * 5}%` }}
                    animate={{
                      y: ['0%', '100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    {Array.from({ length: 10 }).map(() => 
                      Math.random() > 0.5 ? '1' : '0'
                    ).join('')}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
