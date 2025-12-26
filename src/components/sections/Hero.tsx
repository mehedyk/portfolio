import { motion } from 'framer-motion';
import { Download, Code2, Monitor, Database, Flame, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiNextdotjs, SiMongodb, SiNodedotjs, SiTailwindcss, SiFirebase } from 'react-icons/si';
import { useTranslation } from '@/hooks/useTranslation';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Subtle grid background */}
      <div className="absolute inset-0 matrix-bg opacity-5" />
      
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              {/* Blob background shape - CHANGE IMAGE URL HERE */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl animate-float" />
              
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden border-4 border-primary/20">
                {/* CHANGE YOUR IMAGE URL HERE */}
                <img 
                  src="/images/mehedyk.jpg" 
                  alt="S.M. Mehedy Kawser - Software Engineering Student" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hexagon badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary flex items-center justify-center"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                }}
              >
                <Code2 className="w-8 h-8 text-background" />
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
            {/* Name with HTML tags - CHANGE NAME HERE */}
            <div className="space-y-2">
              <p className="text-muted-foreground font-mono text-sm">
                <span className="text-primary">&lt;span&gt;</span>
                {t('hero.greeting')}
                <span className="text-primary">&lt;/span&gt;</span>
              </p>
              
              {/* Title - CHANGE TITLE HERE */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
                {t('hero.title.senior')} <span className="text-primary">{t('hero.title.fullstack')}</span>
                <br />
                {t('hero.title.developer')}<span className="animate-pulse">_</span>
              </h1>
            </div>

            {/* Description - CHANGE DESCRIPTION HERE */}
            <p className="text-muted-foreground font-mono text-sm md:text-base leading-relaxed">
              <span className="text-primary">&lt;p&gt;</span>
              {t('hero.description')}
              <span className="text-primary">&lt;/p&gt;</span>
            </p>

            {/* Tech Stack Icons - ADD/CHANGE YOUR TECH STACK HERE */}
            <div className="flex items-center gap-4 flex-wrap">
              <SiNextdotjs className="w-10 h-10 text-foreground hover:text-primary transition-colors" title="Next.js" />
              <SiFirebase className="w-10 h-10 text-foreground hover:text-primary transition-colors" title="Firebase" />
              <SiMongodb className="w-10 h-10 text-foreground hover:text-primary transition-colors" title="MongoDB" />
              <SiNodedotjs className="w-10 h-10 text-foreground hover:text-primary transition-colors" title="Node.js" />
              <SiTailwindcss className="w-10 h-10 text-foreground hover:text-primary transition-colors" title="Tailwind CSS" />
              <span className="text-muted-foreground text-sm ml-2">{t('hero.andMore')}</span>
            </div>

            {/* CTA Button - ADD YOUR CV LINK HERE */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-transparent border-2 border-primary text-foreground hover:bg-primary hover:text-background transition-all group"
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 max-w-6xl mx-auto"
        >
          {[
            { icon: Monitor, value: "12+", labelKey: 'hero.stats.experience' },
            { icon: Code2, value: "250+", labelKey: 'hero.stats.projects' },
            { icon: Database, value: "680+", labelKey: 'hero.stats.clients' },
            { icon: Flame, value: "18+", labelKey: 'hero.stats.awards' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center space-y-3 p-6 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-all"
            >
              <stat.icon className="w-10 h-10 mx-auto text-primary" />
              <p className="text-3xl lg:text-4xl font-heading text-glow">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};