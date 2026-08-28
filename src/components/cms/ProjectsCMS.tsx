import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash2Icon, PlusIcon, FolderGit2Icon } from 'lucide-react';
import type { Project } from '@/lib/supabase';

export function ProjectsCMS() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      title,
      category,
      description,
      github_url: githubUrl,
      live_url: liveUrl,
      visible: true,
      featured: false,
      sort_order: projects.length + 1,
    };
    await supabase.from('projects').insert([newProject]);
    setIsAdding(false);
    setTitle('');
    setCategory('');
    setDescription('');
    setGithubUrl('');
    setLiveUrl('');
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card/50 p-4 border border-border rounded-xl backdrop-blur-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
          <FolderGit2Icon className="w-5 h-5" /> Project Database
        </h2>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'default'}>
          {isAdding ? 'Cancel' : <><PlusIcon className="w-4 h-4 mr-2" /> New Project</>}
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-card p-6 border border-border rounded-xl space-y-4 shadow-lg">
          <h3 className="font-semibold text-lg border-b border-border pb-2 mb-4">Initialize New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Aegis System" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Input value={category} onChange={e => setCategory(e.target.value)} required placeholder="e.g. Web App" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Short summary..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">GitHub URL</label>
              <Input value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Live URL</label>
              <Input value={liveUrl} onChange={e => setLiveUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full md:w-auto">Deploy Project to Database</Button>
          </div>
        </form>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background/80 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-5 py-3">Project Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">Fetching records...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No projects found.</td></tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                    <td className="px-5 py-3 font-semibold text-primary">{p.title}</td>
                    <td className="px-5 py-3">{p.category}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                    </td>
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
