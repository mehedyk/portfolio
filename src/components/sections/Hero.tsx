import { motion } from 'framer-motion';
import { Download, Code2, Monitor, Database, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiNextdotjs, SiNodedotjs, SiTailwindcss, SiTypescript, SiReact, SiLinux } from 'react-icons/si';
import { useTranslation } from '@/hooks/useTranslation';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Hexagon Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              <div
                className="w-72 h-64 sm:w-80 sm:h-72 lg:w-[420px] lg:h-[365px] overflow-hidden flex items-end justify-center"
                style={{
                  clipPath:
                    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  background:
                    'linear-gradient(160deg, #0d3b3f 0%, #123542 40%, #1a2530 100%)',
                }}
              >
                <img
                  src="/images/mehedyk.jpg"
                  alt="S. M. Mehedy Kawser"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-2 right-8 sm:right-12 lg:right-14 w-16 h-14 sm:w-[78px] sm:h-[68px] flex items-center justify-center"
                style={{
                  background: 'hsl(var(--primary))',
                  clipPath:
                    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                }}
              >
                <Code2
                  className="w-6 h-6 sm:w-7 sm:h-7"
                  style={{ color: 'hsl(var(--primary-foreground))' }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <p className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">&lt;span&gt;</span>
              {t('hero.greeting')}
              <span className="text-primary">&lt;/span&gt;</span>
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-heading leading-tight">
              {t('hero.title.senior')}{' '}
              <span className="text-muted-foreground/50">{`{`}</span>
              <span className="text-primary">{t('hero.title.fullstack')}</span>
              <span className="text-muted-foreground/50">{`}`}</span>
              <br />
              {t('hero.title.developer')}
              <span className="text-primary animate-pulse">_</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground font-mono text-sm md:text-base leading-relaxed max-w-[560px]">
              <span className="text-primary">&lt;p&gt;</span>
              {t('hero.description')}
              <span className="text-primary">&lt;/p&gt;</span>
            </p>

            {/* Tech Stack Icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { Icon: SiReact, title: 'React' },
                { Icon: SiNextdotjs, title: 'Next.js' },
                { Icon: SiTypescript, title: 'TypeScript' },
                { Icon: SiNodedotjs, title: 'Node.js' },
                { Icon: SiTailwindcss, title: 'Tailwind CSS' },
                { Icon: SiLinux, title: 'Linux / Security' },
              ].map(({ Icon, title }) => (
                <div
                  key={title}
                  className="w-11 h-11 rounded-lg flex items-center justify-center border transition-colors hover:border-primary/50"
                  style={{
                    background: 'hsl(var(--muted))',
                    borderColor: 'hsl(var(--border))',
                  }}
                  title={title}
                >
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
              ))}
              <span className="text-muted-foreground text-sm ml-2">
                {t('hero.andMore')}
              </span>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                size="lg"
                className="bg-transparent border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-all group font-mono"
                asChild
              >
                <a href="YOUR_CV_LINK_HERE" download>
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  {t('hero.downloadCV')}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-16 lg:mt-24 max-w-6xl mx-auto"
        >
          {[
            { icon: Monitor, value: '12+', labelKey: 'hero.stats.experience' },
            { icon: Code2, value: '250+', labelKey: 'hero.stats.projects' },
            { icon: Database, value: '680+', labelKey: 'hero.stats.clients' },
            { icon: Flame, value: '18+', labelKey: 'hero.stats.awards' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center space-y-3 p-4 sm:p-6 rounded-xl border transition-all hover:border-primary/30"
              style={{
                background: 'hsl(var(--card) / 0.5)',
                borderColor: 'hsl(var(--primary) / 0.1)',
              }}
            >
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-primary" />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-heading text-glow">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};