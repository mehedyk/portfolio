import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, fetchPortfolioMeta, fetchProjects, fetchTimeline, fetchBlogPosts, fetchTestimonials, fetchServices, fetchSkills } from '@/lib/supabase';
import type { PortfolioMeta, Project, TimelineEvent, BlogPost, Testimonial, Service, SkillCategory } from '@/lib/supabase';
import {
  User, FolderOpen, Cpu, Clock, BookOpen, Star, Briefcase, Settings,
  LogOut, Plus, Trash2, Edit3, Eye, EyeOff, Save, X, ChevronUp, ChevronDown, ExternalLink
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = 'meta' | 'projects' | 'skills' | 'timeline' | 'blog' | 'testimonials' | 'services' | 'settings';

// ─── Reusable UI atoms ────────────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="block text-xs font-mono text-muted-foreground">{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
  />
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) => (
  <textarea
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
  />
);

const Btn = ({ onClick, children, variant = 'default', size = 'sm', disabled = false }: {
  onClick?: () => void; children: React.ReactNode; variant?: 'default' | 'ghost' | 'danger'; size?: 'sm' | 'md'; disabled?: boolean;
}) => {
  const base = 'inline-flex items-center gap-1.5 font-mono rounded-lg transition-all disabled:opacity-40';
  const sizes = { sm: 'px-2.5 py-1 text-xs', md: 'px-4 py-2 text-sm' };
  const variants = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    ghost: 'border border-border hover:border-primary/50 text-foreground hover:text-primary',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const Badge = ({ label }: { label: string }) => (
  <span className="px-1.5 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded">
    {label}
  </span>
);

const toast = (msg: string) => {
  const el = document.createElement('div');
  el.className = 'fixed top-4 right-4 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-mono shadow-xl';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
};

// ─── Section editors ──────────────────────────────────────────────────────────

// META
const MetaEditor = () => {
  const [data, setData] = useState<PortfolioMeta | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPortfolioMeta().then(setData); }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await supabase.from('portfolio_meta').update(data).eq('id', data.id);
    setSaving(false);
    toast('✅ Meta saved!');
  };

  if (!data) return <div className="text-muted-foreground font-mono text-sm">Loading...</div>;

  const update = (k: keyof PortfolioMeta) => (v: string) => setData(d => d ? { ...d, [k]: v } : d);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name"><Input value={data.name} onChange={update('name')} /></Field>
        <Field label="Tagline"><Input value={data.tagline} onChange={update('tagline')} /></Field>
        <Field label="Greeting"><Input value={data.greeting} onChange={update('greeting')} /></Field>
        <Field label="Email"><Input value={data.email} onChange={update('email')} /></Field>
        <Field label="Phone"><Input value={data.phone || ''} onChange={update('phone')} /></Field>
        <Field label="Location"><Input value={data.location} onChange={update('location')} /></Field>
        <Field label="CV URL"><Input value={data.cv_url || ''} onChange={update('cv_url')} /></Field>
        <Field label="Photo URL"><Input value={data.photo_url || ''} onChange={update('photo_url')} /></Field>
      </div>
      <Field label="Description">
        <Textarea value={data.description} onChange={update('description')} rows={4} />
      </Field>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Stat: Experience"><Input value={data.stat_experience} onChange={update('stat_experience')} placeholder="3+" /></Field>
        <Field label="Stat: Projects"><Input value={data.stat_projects} onChange={update('stat_projects')} placeholder="20+" /></Field>
        <Field label="Stat: Clients"><Input value={data.stat_clients} onChange={update('stat_clients')} placeholder="15+" /></Field>
        <Field label="Stat: Awards"><Input value={data.stat_awards} onChange={update('stat_awards')} placeholder="5+" /></Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="GitHub URL"><Input value={data.github_url || ''} onChange={update('github_url')} /></Field>
        <Field label="LinkedIn URL"><Input value={data.linkedin_url || ''} onChange={update('linkedin_url')} /></Field>
        <Field label="Facebook URL"><Input value={data.facebook_url || ''} onChange={update('facebook_url')} /></Field>
        <Field label="Codeforces URL"><Input value={data.codeforces_url || ''} onChange={update('codeforces_url')} /></Field>
        <Field label="LeetCode URL"><Input value={data.leetcode_url || ''} onChange={update('leetcode_url')} /></Field>
        <Field label="Twitter URL"><Input value={data.twitter_url || ''} onChange={update('twitter_url')} /></Field>
      </div>
      <div className="flex justify-end">
        <Btn onClick={save} variant="default" size="md" disabled={saving}>
          <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Changes'}
        </Btn>
      </div>
    </div>
  );
};

// PROJECTS
const ProjectsEditor = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => { fetchProjects().then(setProjects); }, []);

  const newProject = (): Project => ({
    id: '', title: '', category: 'Web Apps', description: '', tags: [],
    image_url: null, github_url: null, live_url: null, featured: false, visible: true, sort_order: 0,
  });

  const save = async (p: Project) => {
    if (p.id) {
      await supabase.from('projects').update(p).eq('id', p.id);
    } else {
      const { data } = await supabase.from('projects').insert({ ...p, id: undefined }).select().single();
      if (data) p = data;
    }
    const updated = await fetchProjects();
    setProjects(updated);
    setEditing(null);
    toast('✅ Project saved!');
  };

  const del = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    setProjects(p => p.filter(x => x.id !== id));
    toast('🗑️ Deleted');
  };

  const toggle = async (id: string, visible: boolean) => {
    await supabase.from('projects').update({ visible: !visible }).eq('id', id);
    setProjects(p => p.map(x => x.id === id ? { ...x, visible: !visible } : x));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-muted-foreground">{projects.length} projects</span>
        <Btn onClick={() => setEditing(newProject())} size="md"><Plus className="w-4 h-4" />Add Project</Btn>
      </div>

      {editing && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 rounded-xl p-4 bg-card space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-medium">{editing.id ? 'Edit' : 'New'} Project</h3>
            <button onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Title"><Input value={editing.title} onChange={v => setEditing(e => e ? { ...e, title: v } : e)} /></Field>
            <Field label="Category">
              <select value={editing.category} onChange={e => setEditing(p => p ? { ...p, category: e.target.value } : p)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:border-primary">
                {['Web Apps', 'Security', 'Open Source', 'Mobile'].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="GitHub URL"><Input value={editing.github_url || ''} onChange={v => setEditing(e => e ? { ...e, github_url: v } : e)} /></Field>
            <Field label="Live URL"><Input value={editing.live_url || ''} onChange={v => setEditing(e => e ? { ...e, live_url: v } : e)} /></Field>
            <Field label="Image URL"><Input value={editing.image_url || ''} onChange={v => setEditing(e => e ? { ...e, image_url: v } : e)} /></Field>
            <Field label="Tags (comma separated)">
              <Input value={editing.tags.join(', ')} onChange={v => setEditing(e => e ? { ...e, tags: v.split(',').map(t => t.trim()).filter(Boolean) } : e)} />
            </Field>
          </div>
          <Field label="Description"><Textarea value={editing.description || ''} onChange={v => setEditing(e => e ? { ...e, description: v } : e)} /></Field>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm font-mono cursor-pointer">
              <input type="checkbox" checked={editing.featured} onChange={e => setEditing(p => p ? { ...p, featured: e.target.checked } : p)} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-mono cursor-pointer">
              <input type="checkbox" checked={editing.visible} onChange={e => setEditing(p => p ? { ...p, visible: e.target.checked } : p)} />
              Visible
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
            <Btn onClick={() => save(editing)} variant="default"><Save className="w-3.5 h-3.5" />Save</Btn>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${p.visible ? 'border-border bg-card' : 'border-border/30 bg-card/30 opacity-50'}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-mono font-medium truncate">{p.title}</span>
                <Badge label={p.category} />
                {p.featured && <Badge label="Featured" />}
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">{p.tags.join(' · ')}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" /></a>}
              <Btn onClick={() => toggle(p.id, p.visible)} variant="ghost">
                {p.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </Btn>
              <Btn onClick={() => setEditing(p)} variant="ghost"><Edit3 className="w-3.5 h-3.5" /></Btn>
              <Btn onClick={() => del(p.id)} variant="danger"><Trash2 className="w-3.5 h-3.5" /></Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// GENERIC list editor for Timeline, Blog, Testimonials, Services
const GenericListEditor = <T extends { id: string; visible: boolean; sort_order: number }>({
  table, fetchFn, renderItem, renderForm, newItem,
}: {
  table: string;
  fetchFn: () => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  renderForm: (item: T, setItem: (item: T) => void) => React.ReactNode;
  newItem: () => T;
}) => {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<T | null>(null);

  useEffect(() => { fetchFn().then(setItems); }, []);

  const save = async (item: T) => {
    if (item.id) {
      await supabase.from(table).update(item).eq('id', item.id);
    } else {
      const { data } = await supabase.from(table).insert({ ...item, id: undefined }).select().single();
      if (data) item = data as T;
    }
    const updated = await fetchFn();
    setItems(updated);
    setEditing(null);
    toast('✅ Saved!');
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from(table).delete().eq('id', id);
    setItems(i => i.filter(x => x.id !== id));
    toast('🗑️ Deleted');
  };

  const toggle = async (id: string, visible: boolean) => {
    await supabase.from(table).update({ visible: !visible }).eq('id', id);
    setItems(i => i.map(x => x.id === id ? { ...x, visible: !visible } : x));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-muted-foreground">{items.length} items</span>
        <Btn onClick={() => setEditing(newItem())} size="md"><Plus className="w-4 h-4" />Add Item</Btn>
      </div>

      {editing && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 rounded-xl p-4 bg-card space-y-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-mono">{editing.id ? 'Edit' : 'New'}</h3>
            <button onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
          </div>
          {renderForm(editing, setEditing)}
          <div className="flex justify-end gap-2">
            <Btn onClick={() => setEditing(null)} variant="ghost">Cancel</Btn>
            <Btn onClick={() => save(editing)}><Save className="w-3.5 h-3.5" />Save</Btn>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${item.visible ? 'border-border bg-card' : 'border-border/30 bg-card/30 opacity-50'}`}>
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Btn onClick={() => toggle(item.id, item.visible)} variant="ghost">
                {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </Btn>
              <Btn onClick={() => setEditing(item)} variant="ghost"><Edit3 className="w-3.5 h-3.5" /></Btn>
              <Btn onClick={() => del(item.id)} variant="danger"><Trash2 className="w-3.5 h-3.5" /></Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export const AdminDashboard = () => {
  const [section, setSection] = useState<Section>('meta');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const nav: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: 'meta', label: 'Hero / Meta', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-56 bg-card border-b lg:border-b-0 lg:border-r border-border flex-shrink-0">
        <div className="p-4 border-b border-border">
          <h1 className="font-heading text-sm text-primary">Portfolio CMS</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">Admin Panel</p>
        </div>
        <nav className="p-2 flex lg:flex-col gap-1 overflow-x-auto">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                section === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
              }`}
            >
              <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-2 mt-auto hidden lg:block">
          <div className="border-t border-border pt-2 space-y-1">
            <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all">
              <ExternalLink className="w-3.5 h-3.5" />View Site
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-3.5 h-3.5" />Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading text-foreground">
              {nav.find(n => n.id === section)?.label}
            </h2>
            <div className="flex gap-2 lg:hidden">
              <a href="/" className="text-xs font-mono text-muted-foreground hover:text-primary">View Site</a>
              <span className="text-muted-foreground">·</span>
              <button onClick={handleLogout} className="text-xs font-mono text-red-400">Logout</button>
            </div>
          </div>

          {section === 'meta' && <MetaEditor />}
          {section === 'projects' && <ProjectsEditor />}

          {section === 'timeline' && (
            <GenericListEditor<TimelineEvent>
              table="timeline_events"
              fetchFn={fetchTimeline}
              newItem={() => ({ id: '', year: new Date().getFullYear().toString(), title: '', organization: '', description: '', event_type: 'education', visible: true, sort_order: 0 } as TimelineEvent)}
              renderItem={item => (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary">{item.year}</span>
                    <span className="text-sm font-mono font-medium">{item.title}</span>
                    <Badge label={item.event_type} />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.organization}</p>
                </div>
              )}
              renderForm={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Year"><Input value={item.year} onChange={v => set({ ...item, year: v })} /></Field>
                  <Field label="Type">
                    <select value={item.event_type} onChange={e => set({ ...item, event_type: e.target.value as TimelineEvent['event_type'] })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono">
                      {['education', 'work', 'achievement'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Title"><Input value={item.title} onChange={v => set({ ...item, title: v })} /></Field>
                  <Field label="Organization"><Input value={item.organization || ''} onChange={v => set({ ...item, organization: v })} /></Field>
                  <div className="col-span-2">
                    <Field label="Description"><Textarea value={item.description || ''} onChange={v => set({ ...item, description: v })} /></Field>
                  </div>
                </div>
              )}
            />
          )}

          {section === 'blog' && (
            <GenericListEditor<BlogPost>
              table="blog_posts"
              fetchFn={fetchBlogPosts}
              newItem={() => ({ id: '', title: '', excerpt: '', content: '', category: '', tags: [], image_url: null, external_url: null, read_time: '5 min', published: true, visible: true, sort_order: 0, published_at: new Date().toISOString() } as BlogPost)}
              renderItem={item => (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-medium">{item.title}</span>
                    {item.category && <Badge label={item.category} />}
                    {!item.published && <Badge label="Draft" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.read_time} · {item.tags.join(', ')}</p>
                </div>
              )}
              renderForm={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title"><Input value={item.title} onChange={v => set({ ...item, title: v })} /></Field>
                  <Field label="Category"><Input value={item.category || ''} onChange={v => set({ ...item, category: v })} /></Field>
                  <Field label="Read Time"><Input value={item.read_time} onChange={v => set({ ...item, read_time: v })} placeholder="5 min" /></Field>
                  <Field label="Tags (comma separated)"><Input value={item.tags.join(', ')} onChange={v => set({ ...item, tags: v.split(',').map(t => t.trim()).filter(Boolean) })} /></Field>
                  <Field label="External URL"><Input value={item.external_url || ''} onChange={v => set({ ...item, external_url: v })} /></Field>
                  <Field label="Image URL"><Input value={item.image_url || ''} onChange={v => set({ ...item, image_url: v })} /></Field>
                  <div className="col-span-2">
                    <Field label="Excerpt"><Textarea value={item.excerpt || ''} onChange={v => set({ ...item, excerpt: v })} /></Field>
                  </div>
                  <label className="flex items-center gap-2 text-sm font-mono cursor-pointer">
                    <input type="checkbox" checked={item.published} onChange={e => set({ ...item, published: e.target.checked })} />
                    Published
                  </label>
                </div>
              )}
            />
          )}

          {section === 'testimonials' && (
            <GenericListEditor<Testimonial>
              table="testimonials"
              fetchFn={fetchTestimonials}
              newItem={() => ({ id: '', name: '', role: '', company: '', content: '', rating: 5, image_url: null, visible: true, sort_order: 0 } as Testimonial)}
              renderItem={item => (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-medium">{item.name}</span>
                    <span className="text-xs text-yellow-500">{'★'.repeat(item.rating)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.role} {item.company && `@ ${item.company}`}</p>
                </div>
              )}
              renderForm={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Name"><Input value={item.name} onChange={v => set({ ...item, name: v })} /></Field>
                  <Field label="Role"><Input value={item.role || ''} onChange={v => set({ ...item, role: v })} /></Field>
                  <Field label="Company"><Input value={item.company || ''} onChange={v => set({ ...item, company: v })} /></Field>
                  <Field label="Rating">
                    <select value={item.rating} onChange={e => set({ ...item, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono">
                      {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} stars</option>)}
                    </select>
                  </Field>
                  <div className="col-span-2">
                    <Field label="Testimonial"><Textarea value={item.content} onChange={v => set({ ...item, content: v })} rows={4} /></Field>
                  </div>
                  <Field label="Photo URL"><Input value={item.image_url || ''} onChange={v => set({ ...item, image_url: v })} /></Field>
                </div>
              )}
            />
          )}

          {section === 'services' && (
            <GenericListEditor<Service>
              table="services"
              fetchFn={fetchServices}
              newItem={() => ({ id: '', title: '', description: '', icon_name: 'Code', features: [], visible: true, sort_order: 0 } as Service)}
              renderItem={item => (
                <div>
                  <span className="text-sm font-mono font-medium">{item.title}</span>
                  <p className="text-xs text-muted-foreground">{item.features.join(' · ')}</p>
                </div>
              )}
              renderForm={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title"><Input value={item.title} onChange={v => set({ ...item, title: v })} /></Field>
                  <Field label="Icon Name"><Input value={item.icon_name} onChange={v => set({ ...item, icon_name: v })} placeholder="Code, Shield, Database..." /></Field>
                  <div className="col-span-2">
                    <Field label="Description"><Textarea value={item.description || ''} onChange={v => set({ ...item, description: v })} /></Field>
                  </div>
                  <div className="col-span-2">
                    <Field label="Features (comma separated)">
                      <Input value={item.features.join(', ')} onChange={v => set({ ...item, features: v.split(',').map(f => f.trim()).filter(Boolean) })} />
                    </Field>
                  </div>
                </div>
              )}
            />
          )}

          {section === 'skills' && (
            <div className="text-sm font-mono text-muted-foreground">
              <p>Skills management coming in next update. For now, edit directly in Supabase dashboard → <strong>skill_categories</strong> and <strong>skills</strong> tables.</p>
            </div>
          )}

          {section === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-xl bg-card">
                <h3 className="text-sm font-mono font-medium mb-3">Supabase Setup</h3>
                <p className="text-xs font-mono text-muted-foreground">
                  Set <code className="text-primary">VITE_SUPABASE_URL</code> and <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file.
                </p>
              </div>
              <div className="p-4 border border-border rounded-xl bg-card">
                <h3 className="text-sm font-mono font-medium mb-1">View Live Portfolio</h3>
                <a href="/" className="text-xs text-primary font-mono hover:underline">→ Open Portfolio</a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
