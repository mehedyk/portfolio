import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { SKILL_GROUPS } from '@/data/profile';

export const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const group = SKILL_GROUPS[active];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('skills.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div role="tablist" aria-label="Skill categories" className="flex flex-wrap justify-center gap-3 mb-12">
          {SKILL_GROUPS.map((g, i) => (
            <button
              key={g.key} role="tab" aria-selected={active === i} onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-lg font-ui text-sm transition-all duration-300 ${
                active === i ? 'bg-primary text-primary-foreground border-glow' : 'border border-primary/30 hover:border-primary'
              }`}
            >
              {t(g.titleKey)}
            </button>
          ))}
        </div>

        <motion.ul
          key={group.key} role="tabpanel"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {group.skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-primary/20 bg-card/50 p-5 backdrop-blur-sm transition-colors hover:border-primary hover:border-glow"
            >
              <skill.icon className="h-9 w-9 text-primary" aria-hidden="true" />
              <span className="text-center font-ui text-sm">{skill.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
