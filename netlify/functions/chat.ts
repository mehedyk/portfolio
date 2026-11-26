import { SYSTEM_PROMPT } from './_lib/persona';
import { clientIp, cleanText, json, originOk, rateLimited, readJson } from './_lib/http';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const MAX_TURNS = 8;          // how much history we forward
const MAX_CHARS = 600;        // per message
const MAX_BODY = 12_000;      // bytes

/** Proxy to Groq: adds the system prompt server-side and returns only the reply text. */
export default async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' }, { Allow: 'POST' });
  if (!originOk(request)) return json(403, { error: 'Forbidden' });
  if (rateLimited(`chat:${clientIp(request)}`, 15, 10 * 60_000)) return json(429, { error: 'Too many messages — try again in a few minutes.' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json(503, { error: 'Chat is not configured' });

  const body = await readJson(request, MAX_BODY);
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return json(400, { error: 'Invalid request' });

  const history: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    const role = (m as { role?: unknown })?.role;
    const content = cleanText((m as { content?: unknown })?.content, 1, MAX_CHARS);
    if ((role !== 'user' && role !== 'assistant') || content === null) return json(400, { error: 'Invalid message' });
    history.push({ role, content });
  }
  if (history[history.length - 1].role !== 'user') return json(400, { error: 'Invalid request' });

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
        max_tokens: 300,
        temperature: 0.6,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!upstream.ok) {
      console.error('groq upstream status', upstream.status);
      return json(502, { error: 'The assistant is unavailable right now.' });
    }
    const data = (await upstream.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return json(502, { error: 'The assistant is unavailable right now.' });
    return json(200, { reply });
  } catch (err) {
    console.error('chat error', err instanceof Error ? err.message : err);
    return json(502, { error: 'The assistant is unavailable right now.' });
  }
};
