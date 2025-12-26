import { motion } from 'framer-motion';
import { Terminal, Heart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { labelKey: 'nav.about', id: 'about' },
    { labelKey: 'nav.projects', id: 'projects' },
    { labelKey: 'nav.blog', id: 'blog' },
    { labelKey: 'nav.contact', id: 'contact' },
  ];

  return (
    <footer className="border-t border-primary/20 py-12 backdrop-blur-cyber" data-theme-animate>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl text-glow">KAWSER</span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-primary mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm font-ui">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-primary mb-4">{t('footer.getInTouch')}</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li>kawser2305341202@diu.edu.bd</li>
              <li>Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">K</kbd>
                <span className="text-primary">{t('footer.quickNav')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-ui flex items-center gap-2">
            © {currentYear} S.M. Mehedy Kawser. {t('footer.builtWith')}
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            {t('footer.andCode')}
          </p>
          <p className="text-xs text-muted-foreground font-ui">
            {t('footer.designedWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};
