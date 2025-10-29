import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Shield, Zap, Database, Cloud, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building responsive, performant web applications with modern frameworks like React, Next.js, and TypeScript.',
    features: ['Full-stack development', 'API design', 'UI/UX implementation', 'Performance optimization'],
  },
  {
    icon: Shield,
    title: 'Security Auditing',
    description: 'Comprehensive security assessments to identify vulnerabilities and strengthen your application\'s defenses.',
    features: ['Penetration testing', 'Code review', 'OWASP compliance', 'Security training'],
  },
  {
    icon: Database,
    title: 'Backend Architecture',
    description: 'Designing scalable, reliable backend systems with robust database design and API development.',
    features: ['Database design', 'RESTful/GraphQL APIs', 'Microservices', 'Performance tuning'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Setting up CI/CD pipelines, containerization, and cloud infrastructure for seamless deployment.',
    features: ['Docker/Kubernetes', 'AWS/Azure setup', 'Automated deployment', 'Monitoring & logging'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Analyzing and optimizing applications for maximum speed, efficiency, and user experience.',
    features: ['Code profiling', 'Load optimization', 'Caching strategies', 'CDN setup'],
  },
  {
    icon: Terminal,
    title: 'Technical Consulting',
    description: 'Expert guidance on technology stack selection, architecture decisions, and best practices.',
    features: ['Tech stack advice', 'Code review', 'Architecture planning', 'Team training'],
  },
];

export const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="min-h-screen py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            SERVICES
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Comprehensive solutions for your digital needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow p-8 group">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-heading mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-center text-sm font-ui"
                    >
                      <span className="text-primary mr-2">▹</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
