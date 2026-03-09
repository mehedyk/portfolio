import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// ─── Data fetchers ───────────────────────────────────────────────────────────

export async function fetchPortfolioMeta(): Promise<PortfolioMeta | null> {
  const { data } = await supabase.from('portfolio_meta').select('*').limit(1).single();
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await supabase.from('projects').select('*').order('sort_order');
  return data || [];
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  const { data: categories } = await supabase.from('skill_categories').select('*').order('sort_order');
  const { data: skills } = await supabase.from('skills').select('*').order('sort_order');
  return (categories || []).map(cat => ({
    ...cat,
    skills: (skills || []).filter(s => s.category_id === cat.id),
  }));
}

export async function fetchTimeline(): Promise<TimelineEvent[]> {
  const { data } = await supabase.from('timeline_events').select('*').order('sort_order');
  return data || [];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase.from('blog_posts').select('*').order('sort_order');
  return data || [];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase.from('testimonials').select('*').order('sort_order');
  return data || [];
}

export async function fetchServices(): Promise<Service[]> {
  const { data } = await supabase.from('services').select('*').order('sort_order');
  return data || [];
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await supabase.from('site_settings').select('*').limit(1).single();
  return data;
}
