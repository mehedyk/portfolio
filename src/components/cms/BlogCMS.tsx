import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash2Icon, PlusIcon, FileTextIcon } from 'lucide-react';
import type { BlogPost } from '@/lib/supabase';

export function BlogCMS() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      excerpt,
      read_time: readTime || '5 min',
      published: true,
      visible: true,
      sort_order: posts.length + 1,
      published_at: new Date().toISOString(),
    };
    await supabase.from('blog_posts').insert([newPost]);
    setIsAdding(false);
    setTitle('');
    setCategory('');
    setExcerpt('');
    setReadTime('');
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card/50 p-4 border border-border rounded-xl backdrop-blur-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
          <FileTextIcon className="w-5 h-5" /> Blog Archives
        </h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'default'}>
          {isAdding ? 'Cancel' : <><PlusIcon className="w-4 h-4 mr-2" /> New Transmission</>}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-card p-6 border border-border rounded-xl space-y-4 shadow-lg">
          <h3 className="font-semibold text-lg border-b border-border pb-2 mb-4">Draft New Post</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. The Death of Microservices" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Input value={category} onChange={e => setCategory(e.target.value)} required placeholder="e.g. Architecture" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Excerpt</label>
              <Input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A short hook..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Read Time</label>
              <Input value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="e.g. 5 min" />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full md:w-auto">Publish Transmission</Button>
          </div>
        </form>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background/80 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-5 py-3">Log Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">Accessing archives...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No logs found.</td></tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                    <td className="px-5 py-3 font-semibold text-primary">{p.title}</td>
                    <td className="px-5 py-3">{p.category}</td>
                    <td className="px-5 py-3">{new Date(p.published_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
