import { motion, AnimatePresence } from 'framer-motion';
import { Download, Code2, Github } from 'lucide-react';
import { SiNextdotjs, SiNodedotjs, SiTailwindcss, SiTypescript, SiReact, SiMongodb } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/stores/themeStore';
import { THEME_PHOTO } from '@/data/themePhotos';
import { STATS } from '@/data/profile';
import { SITE } from '@/config/site';

const HEX = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
const STACK = [
  { Icon: SiReact, title: 'React' }, { Icon: SiNextdotjs, title: 'Next.js' },
  { Icon: SiTypescript, title: 'TypeScript' }, { Icon: SiNodedotjs, title: 'Node.js' },
  { Icon: SiMongodb, title: 'MongoDB' }, { Icon: SiTailwindcss, title: 'Tailwind CSS' },
];

export const Hero = () => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const photo = THEME_PHOTO[theme];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: hexagon photo — the picture and its look change with the theme */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              <div
                className="w-72 h-64 sm:w-80 sm:h-72 lg:w-[420px] lg:h-[365px] overflow-hidden"
                style={{ clipPath: HEX, background: 'linear-gradient(160deg, hsl(var(--primary) / 0.25), hsl(var(--card)))' }}
              >
                <div className="h-full w-full" style={{ transform: photo.zoom ? `scale(${photo.zoom})` : undefined, transformOrigin: photo.origin }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={theme}
                    src={photo.small}
                    srcSet={`${photo.small} 480w, ${photo.large} ${photo.largeW}w`}
                    sizes="(min-width: 1024px) 420px, 320px"
                    alt={photo.alt}
                    width={photo.largeW}
                    height={Math.round(photo.largeW * (photo.small.includes('dark') ? 1.293 : 1))}
                    fetchPriority="high"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: photo.objectPosition, filter: photo.filter }}
                  />
                </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-2 right-8 sm:right-12 lg:right-14 w-16 h-14 sm:w-[78px] sm:h-[68px] flex items-center justify-center"
                style={{ background: 'hsl(var(--primary))', clipPath: HEX }}
              >
                <Code2 className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: 'hsl(var(--primary-foreground))' }} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <p className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">&lt;span&gt;</span>{t('hero.greeting')}<span className="text-primary">&lt;/span&gt;</span>
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-heading leading-tight">
              {t('hero.title.pre')}{' '}
              <span className="text-muted-foreground/50">{'{'}</span>
              <span className="text-primary">{t('hero.title.highlight')}</span>
              <span className="text-muted-foreground/50">{'}'}</span>
              <br />
              {t('hero.title.post')}
              <span className="text-primary motion-safe:animate-pulse" aria-hidden="true">_</span>
            </h1>

            <p className="text-muted-foreground font-mono text-sm md:text-base leading-relaxed max-w-[560px]">
              <span className="text-primary">&lt;p&gt;</span>{t('hero.description')}<span className="text-primary">&lt;/p&gt;</span>
            </p>

            <ul className="flex items-center gap-3 flex-wrap" aria-label="Main technologies">
              {STACK.map(({ Icon, title }) => (
                <li
                  key={title} title={title}
                  className="w-11 h-11 rounded-lg flex items-center justify-center border transition-colors hover:border-primary/50"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}
                >
                  <Icon className="w-5 h-5 text-foreground" aria-label={title} />
                </li>
              ))}
              <li className="text-muted-foreground text-sm ml-2">{t('hero.andMore')}</li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                size="lg" asChild
                className="bg-transparent border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-all group font-mono"
              >
                <a href={SITE.cvUrl} download={SITE.cvFileName}>
                  <Download className="mr-2 h-5 w-5 motion-safe:group-hover:animate-bounce" aria-hidden="true" />
                  {t('hero.downloadCV')}
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild className="font-mono">
                <a href={SITE.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" aria-hidden="true" /> GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats — every number here is verifiable from the CV */}
        <motion.ul
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-16 lg:mt-24 max-w-6xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.labelKey}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center space-y-3 p-4 sm:p-6 rounded-xl border transition-all hover:border-primary/30"
              style={{ background: 'hsl(var(--card) / 0.5)', borderColor: 'hsl(var(--primary) / 0.1)' }}
            >
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-primary" aria-hidden="true" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-heading text-glow">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
