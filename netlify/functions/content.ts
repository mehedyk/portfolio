import { ObjectId, type Document } from 'mongodb';
import { getDb } from './_lib/mongo';
import { requireAdmin } from './_lib/auth';
import { cleanText, json, originOk, readJson } from './_lib/http';

/** Allowed collections. */
const COLLECTIONS = { posts: 'posts', testimonials: 'testimonials' } as const;
type Kind = keyof typeof COLLECTIONS;
const isKind = (v: string | null): v is Kind => v === 'posts' || v === 'testimonials';

const isHttpUrl = (v: string) => { try { return ['http:', 'https:'].includes(new URL(v).protocol); } catch { return false; } };

/** Validate and build a document from request JSON (null if invalid). */
function build(kind: Kind, body: Record<string, unknown>): Document | null {
  if (kind === 'posts') {
    const title = cleanText(body.title, 3, 140);
    const excerpt = cleanText(body.excerpt, 10, 400);
    if (!title || !excerpt) return null;
    const urlRaw = typeof body.url === 'string' ? body.url.trim() : '';
    if (urlRaw && (urlRaw.length > 500 || !isHttpUrl(urlRaw))) return null;
    const tags = Array.isArray(body.tags) ? body.tags.slice(0, 8).map((t) => cleanText(t, 1, 30)).filter((t): t is string => !!t) : [];
    return { title, excerpt, tags, ...(urlRaw ? { url: urlRaw } : {}), publishedAt: new Date() };
  }
  const name = cleanText(body.name, 2, 80);
  const role = cleanText(body.role, 2, 80);
  const quote = cleanText(body.quote, 20, 600);
  if (!name || !role || !quote) return null;
  const company = body.company ? cleanText(body.company, 1, 80) : null;
  if (body.company && !company) return null;
  return { name, role, quote, ...(company ? { company } : {}) };
}

/**
 * GET    ?type=posts|testimonials            (public)  visible items only
 * GET    ?type=...&all=1                     (admin)   includes hidden
 * POST   {type, ...fields}                   (admin)   create
 * PATCH  ?type=...&id=...  {visible:boolean} (admin)   show/hide
 * DELETE ?type=...&id=...                    (admin)   remove
 */
export default async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    if (request.method === 'GET') {
      const type = url.searchParams.get('type');
      if (!isKind(type)) return json(400, { error: 'Unknown type' });
      const wantAll = url.searchParams.get('all') === '1';
      if (wantAll) {
        const auth = await requireAdmin(request);
        if (!auth.ok) return json(auth.status, { error: auth.status === 500 ? 'Admin is not configured' : 'Unauthorized' });
      }
      const db = await getDb();
      const items = await db.collection(COLLECTIONS[type])
        .find(wantAll ? {} : { visible: { $ne: false } })
        .sort({ createdAt: -1 }).limit(100).toArray();
      return json(200, { items: items.map((d) => ({ ...d, _id: d._id.toString() })) },
        wantAll ? {} : { 'Cache-Control': 'public, max-age=60, s-maxage=120' });
    }

    // ───── writes: admin + same-origin ─────
    if (!['POST', 'PATCH', 'DELETE'].includes(request.method)) return json(405, { error: 'Method not allowed' }, { Allow: 'GET, POST, PATCH, DELETE' });
    if (!originOk(request)) return json(403, { error: 'Forbidden' });
    const auth = await requireAdmin(request);
    if (!auth.ok) return json(auth.status, { error: auth.status === 500 ? 'Admin is not configured' : 'Unauthorized' });
    const db = await getDb();

    if (request.method === 'POST') {
      const body = (await readJson(request, 20_000)) as Record<string, unknown> | null;
      const type = typeof body?.type === 'string' ? body.type : null;
      if (!body || !isKind(type)) return json(400, { error: 'Invalid request' });
      const doc = build(type, body);
      if (!doc) return json(400, { error: 'Please check the fields.' });
      const res = await db.collection(COLLECTIONS[type]).insertOne({ ...doc, visible: true, createdAt: new Date() });
      return json(201, { ok: true, id: res.insertedId.toString() });
    }

    const type = url.searchParams.get('type');
    const id = url.searchParams.get('id') ?? '';
    if (!isKind(type) || !/^[a-f\d]{24}$/i.test(id)) return json(400, { error: 'Invalid request' });
    const col = db.collection(COLLECTIONS[type]);
    const _id = new ObjectId(id);

    if (request.method === 'PATCH') {
      const body = (await readJson(request, 1_000)) as { visible?: unknown } | null;
      if (typeof body?.visible !== 'boolean') return json(400, { error: 'Invalid request' });
      await col.updateOne({ _id }, { $set: { visible: body.visible } });
      return json(200, { ok: true });
    }
    await col.deleteOne({ _id });
    return json(200, { ok: true });
  } catch (err) {
    console.error('content error', err instanceof Error ? err.message : err);
    return json(500, { error: 'Something went wrong' });
  }
};
