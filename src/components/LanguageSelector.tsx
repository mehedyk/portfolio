import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, Check, ChevronUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguageStore, languages } from '@/stores/languageStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

// Languages with complete translations
const completedLanguages = ['en', 'bn', 'ar', 'es', 'de', 'pt', 'ja', 'tr'];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase())
  );

  // Sort: completed languages first, then others
  const sortedLanguages = [...filteredLanguages].sort((a, b) => {
    const aCompleted = completedLanguages.includes(a.code);
    const bCompleted = completedLanguages.includes(b.code);
    if (aCompleted && !bCompleted) return -1;
    if (!aCompleted && bCompleted) return 1;
    return 0;
  });

  const currentLang = languages.find((l) => l.code === language);

  const handleSelect = (code: string) => {
    if (completedLanguages.includes(code)) {
      setLanguage(code);
      setIsOpen(false);
      setSearch('');
    } else {
      const lang = languages.find((l) => l.code === code);
      toast.info(`${lang?.name} translation coming soon!`, {
        description: 'We are working on adding more languages.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-80 bg-card border border-primary/30 rounded-xl shadow-2xl overflow-hidden backdrop-blur-cyber"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/20 bg-primary/5">
              <h3 className="font-heading text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('language.select')}
              </h3>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-primary/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('language.search')}
                  className="pl-9 bg-background/50 border-primary/30"
                />
              </div>
            </div>

            {/* Language List */}
            <ScrollArea className="h-72">
              <div className="p-2">
                {/* Completed Languages Section */}
                {sortedLanguages.some((lang) => completedLanguages.includes(lang.code)) && (
                  <div className="mb-2">
                    <p className="text-xs text-primary font-medium px-3 py-1.5 uppercase tracking-wider">
                      Available
                    </p>
                  </div>
                )}
                
                {sortedLanguages.map((lang, index) => {
                  const isCompleted = completedLanguages.includes(lang.code);
                  const prevLang = sortedLanguages[index - 1];
                  const showComingSoonHeader = !isCompleted && (index === 0 || completedLanguages.includes(prevLang?.code));
                  
                  return (
                    <div key={lang.code}>
                      {showComingSoonHeader && (
                        <div className="mt-3 mb-2">
                          <p className="text-xs text-muted-foreground font-medium px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </p>
                        </div>
                      )}
                      <motion.button
                        onClick={() => handleSelect(lang.code)}
                        whileHover={{ x: 4 }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          language === lang.code
                            ? 'bg-primary/20 text-primary'
                            : isCompleted
                            ? 'hover:bg-primary/10'
                            : 'opacity-60 hover:bg-muted/50'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{lang.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {lang.nativeName}
                          </p>
                        </div>
                        {language === lang.code && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                        {!isCompleted && (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </motion.button>
                    </div>
                  );
                })}
                {sortedLanguages.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    No languages found
                  </p>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t border-primary/20 bg-primary/5 text-center">
              <p className="text-xs text-muted-foreground">
                {completedLanguages.length} languages available • {languages.length - completedLanguages.length} coming soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg border-glow"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-lg">{currentLang?.flag || '🌐'}</span>
              </div>
            )}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};
