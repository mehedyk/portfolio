import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Web Apps', 'Security', 'Open Source', 'Mobile'];

const projects = [
  {
    title: 'SecureAuth Platform',
    category: 'Security',
    description: 'Enterprise-grade authentication system with multi-factor authentication, biometric login, and advanced threat detection.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'OAuth'],
    image: null,
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
  },
  {
    title: 'CyberDash Analytics',
    category: 'Web Apps',
    description: 'Real-time cybersecurity dashboard monitoring network traffic, detecting anomalies, and providing actionable insights.',
    tags: ['TypeScript', 'Next.js', 'WebSocket', 'D3.js'],
    image: null,
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
  },
  {
    title: 'PenTest Toolkit',
    category: 'Security',
    description: 'Comprehensive penetration testing toolkit with automated vulnerability scanning and exploit verification.',
    tags: ['Python', 'Kali Linux', 'Metasploit', 'Nmap'],
    image: null,
    github: 'https://github.com',
    live: null,
    featured: false,
  },
  {
    title: 'DevSecOps Pipeline',
    category: 'Open Source',
    description: 'Automated CI/CD pipeline with integrated security scanning, container vulnerability checks, and compliance reporting.',
    tags: ['Docker', 'Jenkins', 'Kubernetes', 'SonarQube'],
    image: null,
    github: 'https://github.com',
    live: null,
    featured: false,
  },
  {
    title: 'Encrypted Chat App',
    category: 'Mobile',
    description: 'End-to-end encrypted messaging application with disappearing messages and secure file sharing.',
    tags: ['React Native', 'Firebase', 'E2EE', 'WebRTC'],
    image: null,
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true,
  },
  {
    title: 'AI Threat Hunter',
    category: 'Security',
    description: 'Machine learning-powered threat detection system analyzing patterns and predicting potential security breaches.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    image: null,
    github: 'https://github.com',
    live: null,
    featured: false,
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="min-h-screen py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            FEATURED PROJECTS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Building the future with code, security, and innovation
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-ui transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground border-glow scale-110'
                  : 'border border-primary/30 hover:border-primary'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow overflow-hidden">
                {/* Project Image/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  <Lock className="w-24 h-24 text-primary/30 group-hover:scale-110 transition-transform" />
                  {project.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-heading mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {project.live && (
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
