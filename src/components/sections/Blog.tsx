import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    title: 'Building Secure APIs: Best Practices for 2024',
    excerpt: 'Dive deep into modern API security patterns, authentication strategies, and common pitfalls to avoid when building production-grade APIs.',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Security',
    tags: ['API', 'Security', 'Backend'],
  },
  {
    title: 'The Rise of AI in Cybersecurity: Friend or Foe?',
    excerpt: 'Exploring how artificial intelligence is transforming both offensive and defensive security operations, and what it means for the future.',
    date: '2024-01-10',
    readTime: '10 min',
    category: 'AI',
    tags: ['AI', 'Cybersecurity', 'Future Tech'],
  },
  {
    title: 'React Performance Optimization: Advanced Techniques',
    excerpt: 'Learn advanced React optimization techniques including code splitting, memoization, and virtual DOM optimization for lightning-fast apps.',
    date: '2024-01-05',
    readTime: '12 min',
    category: 'Development',
    tags: ['React', 'Performance', 'Frontend'],
  },
  {
    title: 'Zero Trust Architecture: Implementation Guide',
    excerpt: 'A comprehensive guide to implementing zero trust security architecture in modern cloud-native applications and microservices.',
    date: '2023-12-28',
    readTime: '15 min',
    category: 'Security',
    tags: ['Zero Trust', 'Cloud', 'Architecture'],
  },
  {
    title: 'Docker Security: Hardening Container Deployments',
    excerpt: 'Essential security practices for Docker containers, from image scanning to runtime protection and secrets management.',
    date: '2023-12-20',
    readTime: '9 min',
    category: 'DevOps',
    tags: ['Docker', 'Security', 'Containers'],
  },
  {
    title: 'GraphQL vs REST: Making the Right Choice',
    excerpt: 'An in-depth comparison of GraphQL and REST APIs, discussing use cases, performance implications, and security considerations.',
    date: '2023-12-15',
    readTime: '11 min',
    category: 'Development',
    tags: ['GraphQL', 'REST', 'API Design'],
  },
];

export const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="blog" className="min-h-screen py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">
            BLOG & INSIGHTS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Thoughts on tech, security, and building the future
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full backdrop-blur-cyber border-primary/30 hover:border-primary transition-all duration-300 hover:border-glow overflow-hidden group">
                {/* Category Badge */}
                <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="border-primary/50">
                      {post.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-heading mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-ui"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-ui mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:text-primary"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
