import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ComingSoon } from '@/components/ComingSoon';
import { useContent } from '@/hooks/useContent';
import { useTranslation } from '@/hooks/useTranslation';

const isSafeUrl = (u?: string) => !!u && /^https?:\/\//i.test(u);
const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation();
  const { data: posts, isLoading } = useContent('posts');

  return (
    <section id="blog" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4" data-theme-animate>
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-glow">{t('blog.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground font-body">{t('blog.subtitle')}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12" role="status" aria-label="Loading posts">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Card className="flex h-full flex-col p-6 backdrop-blur-cyber border-primary/30 hover:border-primary hover:border-glow transition-all">
                  <time className="text-xs font-mono text-primary" dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
                  <h3 className="mt-2 text-lg font-heading">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground font-body">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => <li key={tag} className="rounded-full border border-primary/30 px-2 py-0.5 text-xs font-mono">{tag}</li>)}
                    </ul>
                  )}
                  {isSafeUrl(post.url) && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                      {t('blog.readMore')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </Card>
              </motion.article>
            ))}
          </div>
        ) : (
          <ComingSoon message={t('blog.empty')} />
        )}
      </div>
    </section>
  );
};
