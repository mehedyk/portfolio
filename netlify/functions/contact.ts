import { ObjectId } from 'mongodb';
import { getDb } from './_lib/mongo';
import { requireAdmin } from './_lib/auth';
import { clientIp, cleanText, json, originOk, rateLimited, readJson } from './_lib/http';

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

/**
 * POST   (public) — store a message from the contact form
 * GET    (admin)  — list messages
 * PATCH  (admin)  — mark one as read   (?id=...)
 * DELETE (admin)  — delete one         (?id=...)
 */
export default async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    if (request.method === 'POST') {
      if (!originOk(request)) return json(403, { error: 'Forbidden' });
      if (rateLimited(`contact:${clientIp(request)}`, 5, 10 * 60_000)) return json(429, { error: 'Too many messages — try again later.' });

      const body = (await readJson(request, 10_000)) as Record<string, unknown> | null;
      if (!body) return json(400, { error: 'Invalid request' });

      // Hidden field must stay empty.
      if (typeof body.website === 'string' && body.website.trim() !== '') return json(200, { ok: true });

      const name = cleanText(body.name, 1, 100);
      const email = cleanText(body.email, 3, 254);
      const message = cleanText(body.message, 10, 4000);
      if (!name || !email || !message || !EMAIL_RE.test(email)) return json(400, { error: 'Please check the form fields.' });

      const db = await getDb();
      await db.collection('messages').insertOne({ name, email, message, read: false, createdAt: new Date() });
      return json(201, { ok: true });
    }

    // ───── everything below is admin-only ─────
    const auth = await requireAdmin(request);
    if (!auth.ok) return json(auth.status, { error: auth.status === 500 ? 'Admin is not configured' : 'Unauthorized' });
    const db = await getDb();
    const col = db.collection('messages');

    if (request.method === 'GET') {
      const items = await col.find({}).sort({ createdAt: -1 }).limit(200).toArray();
      return json(200, { items: items.map((m) => ({ ...m, _id: m._id.toString() })) });
    }

    if (request.method === 'PATCH' || request.method === 'DELETE') {
      if (!originOk(request)) return json(403, { error: 'Forbidden' });
      const id = url.searchParams.get('id') ?? '';
      if (!/^[a-f\d]{24}$/i.test(id)) return json(400, { error: 'Invalid id' });
      const _id = new ObjectId(id);
      if (request.method === 'PATCH') await col.updateOne({ _id }, { $set: { read: true } });
      else await col.deleteOne({ _id });
      return json(200, { ok: true });
    }

    return json(405, { error: 'Method not allowed' }, { Allow: 'GET, POST, PATCH, DELETE' });
  } catch (err) {
    console.error('contact error', err instanceof Error ? err.message : err);
    return json(500, { error: 'Something went wrong' });
  }
};
