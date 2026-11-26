import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { TIMELINE } from '@/data/profile';

export const Timeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { t } = useTranslation();

  return (
    <section id="timeline" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('timeline.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground font-body">{t('timeline.subtitle')}</p>
        </motion.div>

        <ol className="relative max-w-4xl mx-auto">
          <span className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent lg:-translate-x-1/2" aria-hidden="true" />
          {TIMELINE.map((event, i) => {
            const right = i % 2 === 0;
            return (
              <motion.li
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`relative mb-10 pl-14 lg:pl-0 lg:w-1/2 ${right ? 'lg:ml-auto lg:pl-12' : 'lg:pr-12 lg:text-right'}`}
              >
                <span
                  className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background lg:top-2 ${right ? 'lg:-left-5' : 'lg:left-auto lg:-right-5'}`}
                  aria-hidden="true"
                >
                  <event.icon className="h-5 w-5 text-primary" />
                </span>
                <Card className="p-5 backdrop-blur-cyber border-primary/30 hover:border-primary hover:border-glow transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary">
                    {event.year} · {t(`timeline.${event.kind === 'research' ? 'education' : event.kind}`)}
                  </p>
                  <h3 className="mt-1 text-lg font-heading">{event.title}</h3>
                  <p className="text-sm text-muted-foreground font-ui">{event.organization}</p>
                  <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{event.description}</p>
                </Card>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
