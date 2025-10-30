import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Zap, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const highlights = [
  {
    icon: Code2,
    title: 'Development',
    description: 'Building scalable web applications with modern frameworks and best practices',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'description: Passionate, but didn\'t do anything fancy yet',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing applications for speed, efficiency, and exceptional user experience',
  },
  {
    icon: Cpu,
    title: 'System Design',
    description: 'Architecting robust, scalable systems that solve complex problems',
  },
];

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            ABOUT ME
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl border-2 border-primary/50 border-glow overflow-hidden">
                <img 
                  src="https://i.postimg.cc/SxgWXQ8M/490350118-3054340994718118-3292880685619553824-n.jpg" 
                  alt="S.M. Mehedy Kawser" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-secondary rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary rounded-2xl -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-heading text-primary">
              Learning Reality, One Line at a Time
            </h3>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              I'm a Software Engineering student with a deep passion for cybersecurity and 
              building secure, high-performance applications. My journey in tech started with 
              curiosity about how systems work and evolved into a mission to create software 
              that's both powerful and protected.
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              When I'm not coding, you'll find learning history, philosophy, ethics, religions.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'Node.js', 'Python', 'Security', 'DevOps', 'Cloud'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-4 py-2 border border-primary rounded-full text-sm font-ui hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow group">
                <item.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-heading mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm font-body">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};