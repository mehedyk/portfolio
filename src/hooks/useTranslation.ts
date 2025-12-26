import { useLanguageStore } from '@/stores/languageStore';
import { translations } from '@/i18n/translations';

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations['en'];
    return langTranslations[key] || translations['en'][key] || key;
  };

  return { t, language };
};
