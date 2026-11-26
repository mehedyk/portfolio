/** Shared helpers for the functions: JSON responses, origin checks, body limits, rate limiting. */

const BASE_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
} as const;

export function json(status: number, body: unknown, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...BASE_HEADERS, ...extra },
  });
}

/** Origins allowed to call write endpoints. */
export function allowedOrigins(): string[] {
  const list = [process.env.SITE_URL, process.env.URL, process.env.DEPLOY_PRIME_URL]
    .filter((v): v is string => !!v)
    .map((v) => v.replace(/\/$/, ''));
  if (process.env.CONTEXT === 'dev' || process.env.NETLIFY_DEV === 'true') {
    list.push('http://localhost:8888', 'http://localhost:5173', 'http://localhost:4173');
  }
  return [...new Set(list)];
}

/** Same-origin check for write requests. */
export function originOk(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return allowedOrigins().includes(origin.replace(/\/$/, ''));
}

/** Reads a JSON body, refusing anything larger than `maxBytes`. */
export async function readJson(request: Request, maxBytes: number): Promise<unknown | null> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > maxBytes) return null;
  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) return null;
  try { return JSON.parse(text); } catch { return null; }
}

export function clientIp(request: Request): string {
  return request.headers.get('x-nf-client-connection-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? 'unknown';
}

/** Simple in-memory limiter (per warm instance; resets on cold start). */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const entry = hits.get(key);
  if (!entry || entry.reset < now) { hits.set(key, { count: 1, reset: now + windowMs }); return false; }
  entry.count += 1;
  return entry.count > max;
}

/** Trim, strip control characters (keep \n and \t), cap the length. */
export function cleanText(value: unknown, min: number, max: number): string | null {
  if (typeof value !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return v.length >= min && v.length <= max ? v : null;
}
