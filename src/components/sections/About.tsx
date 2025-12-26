import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Zap, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { t } = useTranslation();

  const highlights = [
    {
      icon: Code2,
      titleKey: 'about.highlight.fullstack.title',
      descKey: 'about.highlight.fullstack.desc',
    },
    {
      icon: Shield,
      titleKey: 'about.highlight.security.title',
      descKey: 'about.highlight.security.desc',
    },
    {
      icon: Zap,
      titleKey: 'about.highlight.performance.title',
      descKey: 'about.highlight.performance.desc',
    },
    {
      icon: Cpu,
      titleKey: 'about.highlight.system.title',
      descKey: 'about.highlight.system.desc',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-6 mb-16"
        >
          <h3 className="text-3xl font-heading text-primary text-center">
            {t('about.subtitle')}
          </h3>
          <p className="text-lg text-muted-foreground font-body leading-relaxed text-center">
            {t('about.description1')}
          </p>
          <p className="text-lg text-muted-foreground font-body leading-relaxed text-center">
            {t('about.description2')}
          </p>
          <div className="flex flex-wrap gap-3 pt-4 justify-center">
            {['React', 'Node.js', 'Python', 'Security', 'DevOps', 'Cloud'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="px-4 py-2 border border-primary rounded-full text-sm font-ui hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow group">
                <item.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-heading mb-2">{t(item.titleKey)}</h4>
                <p className="text-muted-foreground text-sm font-body">
                  {t(item.descKey)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};