import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js/Express', level: 90 },
      { name: 'Python/Django', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    title: 'Security',
    skills: [
      { name: 'Penetration Testing', level: 85 },
      { name: 'Network Security', level: 82 },
      { name: 'Cryptography', level: 80 },
      { name: 'OWASP Top 10', level: 90 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker/Kubernetes', level: 85 },
      { name: 'AWS/Azure', level: 80 },
      { name: 'CI/CD Pipelines', level: 88 },
      { name: 'Linux/Bash', level: 92 },
    ],
  },
];

export const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="min-h-screen py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            SKILLS & EXPERTISE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-lg font-ui transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-primary text-primary-foreground border-glow'
                  : 'border border-primary/30 hover:border-primary'
              }`}
            >
              {category.title}
            </motion.button>
          ))}
        </div>

        {/* Skills Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-ui text-lg">{skill.name}</span>
                  <span className="text-primary font-heading">{skill.level}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative group-hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '15+', label: 'Technologies Mastered' },
            { number: '1000+', label: 'Code Commits' },
            { number: '24/7', label: 'Learning Mode' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, type: 'spring' }}
              className="text-center p-6 border border-primary/30 rounded-lg backdrop-blur-cyber hover:border-glow transition-all group"
            >
              <div className="text-4xl md:text-5xl font-heading text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-ui">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
