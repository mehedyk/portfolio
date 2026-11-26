import { API } from '@/config/site';

export interface Post {
  _id: string; title: string; excerpt: string; url?: string; tags: string[]; publishedAt: string;
}
export interface Testimonial {
  _id: string; name: string; role: string; company?: string; quote: string;
}
export type ContentMap = { posts: Post; testimonials: Testimonial };

/** Public, read-only. Resolves to [] on any failure so the page falls back to "Coming soon". */
export async function fetchContent<K extends keyof ContentMap>(type: K): Promise<ContentMap[K][]> {
  try {
    const res = await fetch(`${API.content}?type=${type}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const items = (data as { items?: unknown }).items;
    return Array.isArray(items) ? (items as ContentMap[K][]) : [];
  } catch {
    return [];
  }
}

export interface ContactPayload { name: string; email: string; message: string; website: string }

export async function sendContact(payload: ContactPayload): Promise<boolean> {
  try {
    const res = await fetch(API.contact, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
