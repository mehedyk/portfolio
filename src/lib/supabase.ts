import { createClient } from '@supabase/supabase-js';

// These are injected by Netlify at build time — no .env file needed.
// Locally the app falls back to static data gracefully.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Safe client — only created when env vars are present
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'placeholder');

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PortfolioMeta {
  id: string;
  name: string;
  tagline: string;
  greeting: string;
  description: string;
  photo_url: string | null;
  cv_url: string | null;
  email: string;
  phone: string | null;
  location: string;
  stat_experience: string;
  stat_projects: string;
  stat_clients: string;
  stat_awards: string;
  github_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  codeforces_url: string | null;
  leetcode_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  tags: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  visible: boolean;
  sort_order: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  sort_order: number;
  visible: boolean;
  skills?: Skill[];
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  level: number;
  sort_order: number;
  visible: boolean;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  organization: string | null;
  description: string | null;
  event_type: 'education' | 'work' | 'achievement';
  visible: boolean;
  sort_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[];
  image_url: string | null;
  external_url: string | null;
  read_time: string;
  published: boolean;
  visible: boolean;
  sort_order: number;
  published_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  visible: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon_name: string;
  features: string[];
  visible: boolean;
  sort_order: number;
}

export interface SiteSettings {
  id: string;
  default_theme: string;
  available_themes: string[];
  default_language: string;
  available_languages: string[];
  loader_enabled: boolean;
  particles_enabled: boolean;
  cursor_trail_enabled: boolean;
  default_cursor_effect: string;
}

// ─── Static fallbacks (used locally / before Supabase is configured) ─────────
// These keep the portfolio fully functional even without env vars.
// On Netlify with env vars set, live Supabase data is used instead.

const FALLBACK_META: PortfolioMeta = {
  id: 'local',
  name: 'S.M. Mehedy Kawser',
  tagline: 'Full Stack Developer',
  greeting: "Hey, I'm Mahdi Kawser",
  description: 'With expertise in cutting-edge technologies such as React, Supabase, Node.js... I deliver web solutions that are both innovative and robust.',
  photo_url: '/images/mehedyk.jpg',
  cv_url: null,
  email: 'kawser2305341202@diu.edu.bd',
  phone: null,
  location: 'Dhaka, Bangladesh',
  stat_experience: '3+',
  stat_projects: '20+',
  stat_clients: '15+',
  stat_awards: '5+',
  github_url: 'https://github.com/mehedyk',
  linkedin_url: 'https://www.linkedin.com/in/mehedyk/',
  facebook_url: 'https://www.facebook.com/mahdi.kawser',
  codeforces_url: 'https://codeforces.com/profile/mehedyk',
  leetcode_url: 'https://leetcode.com/mehedyk',
  twitter_url: null,
  instagram_url: null,
};

const FALLBACK_PROJECTS: Project[] = [
  { id: '1', title: 'Portfolio Builder SaaS', category: 'Web Apps', description: 'A full-featured SaaS portfolio builder with credit-based publish system, bKash/Nagad/Rocket payment flow, and Cloudinary image hosting.', tags: ['React', 'Supabase', 'Cloudinary', 'TypeScript'], image_url: null, github_url: 'https://github.com/mehedyk', live_url: 'https://mehedy.netlify.app', featured: true, visible: true, sort_order: 1 },
  { id: '2', title: 'هادي (Hadi) — Quran Assistant', category: 'Web Apps', description: 'Bilingual Quran reference web app with React 18 + Vite. Supports Arabic and English with fast search and clean UI.', tags: ['React', 'Vite', 'TypeScript', 'Tailwind'], image_url: null, github_url: 'https://github.com/mehedyk/Quran-Assistant', live_url: null, featured: true, visible: true, sort_order: 2 },
  { id: '3', title: 'JomiMap — Land Measurement App', category: 'Web Apps', description: 'Bilingual EN/BN land measurement tool with Tangail unit system, polygon drawing, PDF export, and verified stamp.', tags: ['React', 'Vite', 'TSX', 'Tailwind'], image_url: null, github_url: 'https://github.com/mehedyk', live_url: null, featured: false, visible: true, sort_order: 3 },
];

const FALLBACK_SKILLS: SkillCategory[] = [
  { id: '1', title: 'Frontend', sort_order: 1, visible: true, skills: [{ id: '1', category_id: '1', name: 'React/Next.js', level: 95, sort_order: 1, visible: true }, { id: '2', category_id: '1', name: 'TypeScript', level: 90, sort_order: 2, visible: true }, { id: '3', category_id: '1', name: 'Tailwind CSS', level: 95, sort_order: 3, visible: true }, { id: '4', category_id: '1', name: 'Framer Motion', level: 85, sort_order: 4, visible: true }] },
  { id: '2', title: 'Backend', sort_order: 2, visible: true, skills: [{ id: '5', category_id: '2', name: 'Node.js/Express', level: 88, sort_order: 1, visible: true }, { id: '6', category_id: '2', name: 'Supabase', level: 90, sort_order: 2, visible: true }, { id: '7', category_id: '2', name: 'PostgreSQL', level: 85, sort_order: 3, visible: true }, { id: '8', category_id: '2', name: 'REST APIs', level: 90, sort_order: 4, visible: true }] },
  { id: '3', title: 'DevOps & Tools', sort_order: 3, visible: true, skills: [{ id: '9', category_id: '3', name: 'Git/GitHub', level: 92, sort_order: 1, visible: true }, { id: '10', category_id: '3', name: 'Vite', level: 88, sort_order: 2, visible: true }, { id: '11', category_id: '3', name: 'Netlify/Vercel', level: 85, sort_order: 3, visible: true }, { id: '12', category_id: '3', name: 'Linux/Bash', level: 80, sort_order: 4, visible: true }] },
];

const FALLBACK_TIMELINE: TimelineEvent[] = [
  { id: '1', year: '2024', title: 'Software Engineering Student', organization: 'Daffodil International University', description: 'SE 331 — Building Portfolio Builder SaaS with React + Supabase + Cloudinary.', event_type: 'education', visible: true, sort_order: 1 },
  { id: '2', year: '2024', title: 'Full Stack Developer', organization: 'Freelance', description: 'Building web applications for clients — React, Supabase, REST APIs.', event_type: 'work', visible: true, sort_order: 2 },
  { id: '3', year: '2021', title: 'Started Software Engineering', organization: 'Daffodil International University', description: 'Began the journey into software engineering with a focus on modern web development.', event_type: 'education', visible: true, sort_order: 3 },
];

const FALLBACK_BLOG: BlogPost[] = [
  { id: '1', title: 'Building Secure APIs: Best Practices', excerpt: 'Dive deep into modern API security patterns, authentication strategies, and common pitfalls to avoid.', content: null, category: 'Security', tags: ['API', 'Security', 'Backend'], image_url: null, external_url: null, read_time: '8 min', published: true, visible: true, sort_order: 1, published_at: '2024-01-15' },
  { id: '2', title: 'React Performance Optimization', excerpt: 'Advanced React optimization techniques including code splitting, memoization, and virtual DOM optimization.', content: null, category: 'Development', tags: ['React', 'Performance', 'Frontend'], image_url: null, external_url: null, read_time: '12 min', published: true, visible: true, sort_order: 2, published_at: '2024-01-05' },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sarah Johnson', role: 'CTO', company: 'TechCorp', content: "Kawser's expertise transformed our application. His code quality is exceptional and he brings a security-first mindset that's rare to find.", rating: 5, image_url: null, visible: true, sort_order: 1 },
  { id: '2', name: 'Michael Chen', role: 'Lead Developer', company: 'StartupXYZ', content: 'Working with Kawser on our full-stack project was incredible. Outstanding problem-solving and deep technical knowledge.', rating: 5, image_url: null, visible: true, sort_order: 2 },
];

const FALLBACK_SERVICES: Service[] = [
  { id: '1', title: 'Web Development', description: 'Building responsive, performant web applications with modern frameworks like React, Next.js, and TypeScript.', icon_name: 'Code', features: ['Full-stack development', 'API design', 'UI/UX implementation', 'Performance optimization'], visible: true, sort_order: 1 },
  { id: '2', title: 'Backend Architecture', description: 'Designing scalable, reliable backend systems with robust database design and API development.', icon_name: 'Database', features: ['Database design', 'RESTful APIs', 'Supabase/PostgreSQL', 'Performance tuning'], visible: true, sort_order: 2 },
  { id: '3', title: 'Technical Consulting', description: 'Expert guidance on technology stack selection, architecture decisions, and best practices.', icon_name: 'Terminal', features: ['Tech stack advice', 'Code review', 'Architecture planning', 'Team training'], visible: true, sort_order: 3 },
];

// ─── Data fetchers ────────────────────────────────────────────────────────────
// When Supabase is configured (Netlify env vars) → live DB data
// When not configured (local dev, no .env) → static fallback data above

export async function fetchPortfolioMeta(): Promise<PortfolioMeta | null> {
  if (!isSupabaseConfigured) return FALLBACK_META;
  const { data } = await supabase.from('portfolio_meta').select('*').limit(1).single();
  return data ?? FALLBACK_META;
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return FALLBACK_PROJECTS;
  const { data } = await supabase.from('projects').select('*').order('sort_order');
  return data?.length ? data : FALLBACK_PROJECTS;
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  if (!isSupabaseConfigured) return FALLBACK_SKILLS;
  const { data: categories } = await supabase.from('skill_categories').select('*').order('sort_order');
  const { data: skills } = await supabase.from('skills').select('*').order('sort_order');
  const merged = (categories || []).map(cat => ({ ...cat, skills: (skills || []).filter(s => s.category_id === cat.id) }));
  return merged.length ? merged : FALLBACK_SKILLS;
}

export async function fetchTimeline(): Promise<TimelineEvent[]> {
  if (!isSupabaseConfigured) return FALLBACK_TIMELINE;
  const { data } = await supabase.from('timeline_events').select('*').order('sort_order');
  return data?.length ? data : FALLBACK_TIMELINE;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return FALLBACK_BLOG;
  const { data } = await supabase.from('blog_posts').select('*').order('sort_order');
  return data?.length ? data : FALLBACK_BLOG;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return FALLBACK_TESTIMONIALS;
  const { data } = await supabase.from('testimonials').select('*').order('sort_order');
  return data?.length ? data : FALLBACK_TESTIMONIALS;
}

export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) return FALLBACK_SERVICES;
  const { data } = await supabase.from('services').select('*').order('sort_order');
  return data?.length ? data : FALLBACK_SERVICES;
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.from('site_settings').select('*').limit(1).single();
  return data;
}
