import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, ShieldCheck, BrainCircuit, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/stores/themeStore';
import { alternatePhoto } from '@/data/themePhotos';

const highlights = [
  { icon: Code2,        titleKey: 'about.highlight.fullstack.title',  descKey: 'about.highlight.fullstack.desc' },
  { icon: ShieldCheck,  titleKey: 'about.highlight.security.title',   descKey: 'about.highlight.security.desc' },
  { icon: BrainCircuit, titleKey: 'about.highlight.ai.title',         descKey: 'about.highlight.ai.desc' },
  { icon: Users,        titleKey: 'about.highlight.leadership.title', descKey: 'about.highlight.leadership.desc' },
];
const chips = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Python', 'Secure development'];

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const photo = alternatePhoto(theme);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto grid md:grid-cols-[260px_1fr] gap-10 items-center mb-16"
        >
          <figure className="mx-auto w-56 md:w-full">
            <div className="rounded-2xl overflow-hidden border border-primary/30 border-glow aspect-[4/5]">
              <img
                src={photo.small} alt={photo.alt} loading="lazy" decoding="async" width={480} height={600}
                className="h-full w-full object-cover" style={{ objectPosition: photo.objectPosition }}
              />
            </div>
          </figure>

          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-3xl font-heading text-primary">{t('about.subtitle')}</h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">{t('about.description1')}</p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">{t('about.description2')}</p>
            <ul className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              {chips.map((tech, i) => (
                <motion.li
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-4 py-2 border border-primary rounded-full text-sm font-ui hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-16 max-w-xl"
        >
          <div className="overflow-hidden rounded-2xl border border-primary/30 border-glow aspect-[4/3]">
            <img
              src="/images/presenting-480.webp"
              srcSet="/images/presenting-480.webp 480w, /images/presenting-960.webp 960w"
              sizes="(min-width: 640px) 576px, 90vw"
              alt="Mehedy presenting a code walkthrough in front of a projector"
              loading="lazy" decoding="async" width={960} height={950}
              className="h-full w-full object-cover" style={{ objectPosition: '50% 20%' }}
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground font-ui">Technical presentation</figcaption>
        </motion.figure>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="p-6 h-full backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow group">
                <item.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h4 className="text-xl font-heading mb-2">{t(item.titleKey)}</h4>
                <p className="text-muted-foreground text-sm font-body">{t(item.descKey)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
