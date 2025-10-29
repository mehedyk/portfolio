import { motion } from 'framer-motion';
import { Terminal, Download, Mail, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '../ParticleBackground';
import { SiHackerrank, SiCodeforces, SiLeetcode } from 'react-icons/si';

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Matrix-style grid background */}
      <div className="absolute inset-0 matrix-bg opacity-10" />
      
      <div className="container mx-auto px-4 z-10" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Terminal Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-8"
          >
            <Terminal className="h-20 w-20 text-primary mx-auto animate-pulse-glow" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading mb-6 text-glow-intense"
          >
            S.M. MEHEDY KAWSER
          </motion.h1>

          {/* Typing Effect Subheading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl font-ui text-secondary mb-8"
          >
            <span className="text-primary">{'>'}</span> Software Engineer
            <span className="animate-pulse">_</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-body"
          >
            Cybersecurity enthusiast | Full-stack developer | Hacking the future, one line of code at a time
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow group"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground border-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap gap-4 justify-center items-center"
          >
            {[
              { icon: Github, url: 'https://github.com/mehedyk', label: 'GitHub' },
              { icon: Linkedin, url: 'https://www.linkedin.com/in/mehedyk/', label: 'LinkedIn' },
              { icon: Twitter, url: 'https://x.com/MahdiKawser', label: 'Twitter/X' },
              { icon: SiHackerrank, url: 'https://www.hackerrank.com/profile/mehedyk', label: 'HackerRank' },
              { icon: SiCodeforces, url: 'https://codeforces.com/profile/mehedyk', label: 'Codeforces' },
              { icon: SiLeetcode, url: 'https://leetcode.com/u/mehedyk/', label: 'LeetCode' },
              { icon: Instagram, url: 'https://www.instagram.com/mahdi_kawser/', label: 'Instagram' },
              { icon: Facebook, url: 'https://www.facebook.com/mahdi.kawser', label: 'Facebook' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.05 }}
                whileHover={{ scale: 1.2, y: -3 }}
                className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all text-primary"
                title={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mt-20"
          >
            <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Glowing orbs in background */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};
