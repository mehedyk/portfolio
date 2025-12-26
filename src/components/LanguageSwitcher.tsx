import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguageStore, languages } from '@/stores/languageStore';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    // Quick toggle between English and Bangla
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="relative group"
          >
            <span className="text-lg">{currentLang?.flag || '🌐'}</span>
            <Globe className="w-3 h-3 absolute -bottom-0.5 -right-0.5 text-primary opacity-70" />
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{language === 'en' ? 'বাংলায় দেখুন' : 'View in English'}</p>
      </TooltipContent>
    </Tooltip>
  );
};
