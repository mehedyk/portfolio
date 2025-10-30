import { motion } from 'framer-motion';
import { Terminal, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 py-12 backdrop-blur-cyber" data-theme-animate>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl text-glow">MEHEDY</span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Software Engineer specializing in cybersecurity and full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm font-ui">
              {['About', 'Projects', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(link.toLowerCase())
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-primary mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li>kawser2305341202@diu.edu.bd</li>
              <li>Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">K</kbd>
                <span className="text-primary">Quick Nav</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-ui flex items-center gap-2">
            © {currentYear} S.M. Mehedy Kawser. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-ui">
            Designed & Developed with React, TypeScript, GSAP & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};
