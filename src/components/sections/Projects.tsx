import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ExternalLink, Github, Play, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { PROJECTS, PROJECT_TYPE_LABELS, type ProjectType } from '@/data/projectsData';

export const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeType, setActiveType] = useState<ProjectType | 'all'>('all');
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const typeFilters: { key: ProjectType | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'web', label: PROJECT_TYPE_LABELS.web },
    { key: 'exe', label: PROJECT_TYPE_LABELS.exe },
    { key: 'other', label: PROJECT_TYPE_LABELS.other },
  ];

  const filtered = activeType === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeType);

  const displayed = showAll ? filtered : filtered.slice(0, 9);

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

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {typeFilters.map((f, i) => (
            <motion.button
              key={f.key}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => { setActiveType(f.key); setShowAll(false); }}
              className={`px-5 py-2 rounded-full font-ui text-sm transition-all duration-300 ${
                activeType === f.key
                  ? 'bg-primary text-primary-foreground border-glow scale-105'
                  : 'border border-primary/30 hover:border-primary'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-cyber border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-heading group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        {PROJECT_TYPE_LABELS[project.type]}
                      </p>
                    </div>
                    {project.featured && (
                      <Badge className="bg-primary text-primary-foreground text-xs shrink-0 ml-2">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-primary/80 font-mono italic mb-2">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-primary/40">
                        {tag}
                      </Badge>
                    ))}
                    {project.tech.length > 4 && (
                      <Badge variant="outline" className="text-xs border-primary/30">
                        +{project.tech.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" className="text-xs border-primary/40 hover:border-primary" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3 w-3" /> Live
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button size="sm" variant="outline" className="text-xs border-primary/40 hover:border-primary" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3 w-3" /> Code
                        </a>
                      </Button>
                    )}
                    {project.videos.length > 0 && (
                      <Button size="sm" variant="outline" className="text-xs border-primary/40 hover:border-primary" asChild>
                        <a href={project.videos[0].youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="mr-1.5 h-3 w-3" /> Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less */}
        {filtered.length > 9 && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setShowAll(!showAll)} className="border-primary/40 hover:border-primary">
              {showAll ? 'Show Less' : `Show All (${filtered.length})`}
            </Button>
          </div>
        )}

        {/* FuseSW Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="https://fusesw.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border transition-all hover:border-primary/50 group"
            style={{
              background: 'hsl(var(--card) / 0.6)',
              borderColor: 'hsl(var(--primary) / 0.2)',
            }}
          >
            <span className="text-sm font-mono text-muted-foreground">
              View full project showcase on
            </span>
            <span className="text-primary font-heading text-lg group-hover:underline">FuseSW</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};