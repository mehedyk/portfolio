import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * =============================================================================
 * PROJECTS CONFIGURATION
 * =============================================================================
 * 
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy one of the project objects below
 * 2. Update all fields with your project details
 * 3. Save the file - your project will appear automatically!
 * 
 * FIELDS EXPLAINED:
 * - title:       Project name (displayed as heading)
 * - category:    Must match one of: 'Web Apps', 'Security', 'Open Source', 'Mobile'
 * - description: Brief description (2-3 sentences recommended)
 * - tags:        Array of technologies used (shown as badges)
 * - image:       Image URL or null (optional - shows placeholder if null)
 *                TIP: Upload images to /public/images/ and use '/images/your-image.jpg'
 *                OR use external URLs like 'https://your-image-host.com/image.jpg'
 * - github:      GitHub repository URL (required - shows "Code" button)
 * - live:        Live demo URL or null (optional - shows "Live" button if provided)
 * - featured:    true/false (featured projects show a "Featured" badge)
 * 
 * EXAMPLE:
 * {
 *   title: 'My Awesome Project',
 *   category: 'Web Apps',
 *   description: 'A brief description of what this project does and why it is amazing.',
 *   tags: ['React', 'TypeScript', 'Tailwind'],
 *   image: '/images/my-project.jpg',  // or 'https://example.com/image.jpg'
 *   github: 'https://github.com/username/my-project',
 *   live: 'https://my-project.vercel.app',
 *   featured: true,
 * },
 * 
 * =============================================================================
 */
const projects = [
  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 1: SecureAuth Platform
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'SecureAuth Platform',
    category: 'Security',
    description: 'Enterprise-grade authentication system with multi-factor authentication, biometric login, and advanced threat detection.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'OAuth'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/secureauth', // ← UPDATE THIS
    live: 'https://secureauth-demo.com', // ← UPDATE THIS or set to null
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 2: CyberDash Analytics
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'CyberDash Analytics',
    category: 'Web Apps',
    description: 'Real-time cybersecurity dashboard monitoring network traffic, detecting anomalies, and providing actionable insights.',
    tags: ['TypeScript', 'Next.js', 'WebSocket', 'D3.js'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/cyberdash', // ← UPDATE THIS
    live: 'https://cyberdash-demo.com', // ← UPDATE THIS or set to null
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 3: PenTest Toolkit
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'PenTest Toolkit',
    category: 'Security',
    description: 'Comprehensive penetration testing toolkit with automated vulnerability scanning and exploit verification.',
    tags: ['Python', 'Kali Linux', 'Metasploit', 'Nmap'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/pentest-toolkit', // ← UPDATE THIS
    live: null, // No live demo for security tools
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 4: DevSecOps Pipeline
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'DevSecOps Pipeline',
    category: 'Open Source',
    description: 'Automated CI/CD pipeline with integrated security scanning, container vulnerability checks, and compliance reporting.',
    tags: ['Docker', 'Jenkins', 'Kubernetes', 'SonarQube'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/devsecops-pipeline', // ← UPDATE THIS
    live: null, // No live demo for CI/CD tools
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 5: Encrypted Chat App
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Encrypted Chat App',
    category: 'Mobile',
    description: 'End-to-end encrypted messaging application with disappearing messages and secure file sharing.',
    tags: ['React Native', 'Firebase', 'E2EE', 'WebRTC'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/encrypted-chat', // ← UPDATE THIS
    live: 'https://encrypted-chat-demo.com', // ← UPDATE THIS or set to null
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROJECT 6: AI Threat Hunter
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'AI Threat Hunter',
    category: 'Security',
    description: 'Machine learning-powered threat detection system analyzing patterns and predicting potential security breaches.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    image: null, // TODO: Add your project screenshot here
    github: 'https://github.com/yourusername/ai-threat-hunter', // ← UPDATE THIS
    live: null, // API-only project
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD YOUR NEW PROJECTS BELOW (copy the template and fill in your details)
  // ─────────────────────────────────────────────────────────────────────────
  // {
  //   title: 'Your Project Name',
  //   category: 'Web Apps', // Options: 'Web Apps', 'Security', 'Open Source', 'Mobile'
  //   description: 'Your project description goes here.',
  //   tags: ['Tech1', 'Tech2', 'Tech3'],
  //   image: '/images/your-project.jpg', // or null, or external URL
  //   github: 'https://github.com/yourusername/your-project',
  //   live: 'https://your-project-demo.com', // or null if no live demo
  //   featured: false,
  // },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const { t } = useTranslation();

  const categories = [
    { key: 'All', labelKey: 'projects.filter.all' },
    { key: 'Web Apps', labelKey: 'projects.filter.webapps' },
    { key: 'Security', labelKey: 'projects.filter.security' },
    { key: 'Open Source', labelKey: 'projects.filter.opensource' },
    { key: 'Mobile', labelKey: 'projects.filter.mobile' },
  ];

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
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-2 rounded-full font-ui transition-all duration-300 ${
                activeCategory === category.key
                  ? 'bg-primary text-primary-foreground border-glow scale-110'
                  : 'border border-primary/30 hover:border-primary'
              }`}
            >
              {t(category.labelKey)}
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
                      {t('projects.featured')}
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
                      className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground hover:text-foreground"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {t('projects.code')}
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
                          {t('projects.live')}
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