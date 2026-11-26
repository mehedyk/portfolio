import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { SERVICES } from '@/data/profile';

export const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('services.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground font-body">{t('services.subtitle')}</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <Card className="group h-full p-6 backdrop-blur-cyber border-primary/30 hover:border-primary hover:border-glow transition-all">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-heading mb-2">{t(s.titleKey)}</h3>
                <p className="mb-4 text-sm text-muted-foreground font-body">{t(s.descKey)}</p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-ui">
                      <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
