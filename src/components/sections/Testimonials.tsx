import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ComingSoon } from '@/components/ComingSoon';
import { useContent } from '@/hooks/useContent';
import { useTranslation } from '@/hooks/useTranslation';

const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation();
  const { data: items, isLoading } = useContent('testimonials');

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('testimonials.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground font-body">{t('testimonials.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12" role="status" aria-label="Loading testimonials">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : items && items.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.figure
                key={item._id}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Card className="flex h-full flex-col p-6 backdrop-blur-cyber border-primary/30 hover:border-primary hover:border-glow transition-all">
                  <Quote className="h-8 w-8 text-primary/60" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-sm font-body leading-relaxed text-muted-foreground">{item.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-heading text-sm text-primary" aria-hidden="true">
                      {initials(item.name)}
                    </span>
                    <span>
                      <span className="block font-ui text-sm">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">{item.role}{item.company ? ` · ${item.company}` : ''}</span>
                    </span>
                  </figcaption>
                </Card>
              </motion.figure>
            ))}
          </div>
        ) : (
          <ComingSoon message={t('testimonials.empty')} />
        )}
      </div>
    </section>
  );
};
