import { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { adminFetch, endpoints, type GetToken } from '@/lib/adminApi';

type Kind = 'posts' | 'testimonials';
interface Row { _id: string; visible?: boolean; title?: string; excerpt?: string; name?: string; role?: string; quote?: string }

const EMPTY = { title: '', excerpt: '', url: '', tags: '', name: '', role: '', company: '', quote: '' };

export const ContentTab = ({ kind, getToken, onError }: { kind: Kind; getToken: GetToken; onError: (e: unknown) => void }) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const load = useCallback(async () => {
    try { setRows((await adminFetch<{ items: Row[] }>(getToken, `${endpoints.content}?type=${kind}&all=1`)).items); }
    catch (e) { onError(e); }
  }, [getToken, kind, onError]);
  useEffect(() => { setRows(null); void load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = kind === 'posts'
        ? { type: kind, title: form.title, excerpt: form.excerpt, url: form.url, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }
        : { type: kind, name: form.name, role: form.role, company: form.company, quote: form.quote };
      await adminFetch(getToken, endpoints.content, { method: 'POST', body: JSON.stringify(payload) });
      setForm(EMPTY);
      await load();
    } catch (err) { onError(err); } finally { setSaving(false); }
  };

  const toggle = async (r: Row) => {
    try { await adminFetch(getToken, `${endpoints.content}?type=${kind}&id=${r._id}`, { method: 'PATCH', body: JSON.stringify({ visible: r.visible === false }) }); await load(); }
    catch (err) { onError(err); }
  };
  const remove = async (r: Row) => {
    if (!window.confirm('Delete permanently?')) return;
    try { await adminFetch(getToken, `${endpoints.content}?type=${kind}&id=${r._id}`, { method: 'DELETE' }); await load(); }
    catch (err) { onError(err); }
  };

  return (
    <div className="space-y-8">
      <Card className="p-5">
        <form onSubmit={create} className="grid gap-3">
          {kind === 'posts' ? (
            <>
              <Input required minLength={3} maxLength={140} placeholder="Title" value={form.title} onChange={set('title')} />
              <Textarea required minLength={10} maxLength={400} rows={3} placeholder="Short excerpt (10–400 characters)" value={form.excerpt} onChange={set('excerpt')} />
              <Input type="url" maxLength={500} placeholder="Link to the full post (https://…) — optional" value={form.url} onChange={set('url')} />
              <Input maxLength={200} placeholder="Tags, comma-separated — optional" value={form.tags} onChange={set('tags')} />
            </>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <Input required minLength={2} maxLength={80} placeholder="Name" value={form.name} onChange={set('name')} />
                <Input required minLength={2} maxLength={80} placeholder="Role" value={form.role} onChange={set('role')} />
                <Input maxLength={80} placeholder="Company — optional" value={form.company} onChange={set('company')} />
              </div>
              <Textarea required minLength={20} maxLength={600} rows={4} placeholder="Their words (only add real, permitted testimonials)" value={form.quote} onChange={set('quote')} />
            </>
          )}
          <Button type="submit" disabled={saving} className="justify-self-start">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : <Plus className="mr-2 h-4 w-4" aria-hidden="true" />}
            Add {kind === 'posts' ? 'post' : 'testimonial'}
          </Button>
        </form>
      </Card>

      {!rows ? (
        <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : rows.length === 0 ? (
        <p className="text-center text-muted-foreground">Nothing yet — the public site shows “Coming soon”.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r._id}>
              <Card className={`flex items-start justify-between gap-3 p-4 ${r.visible === false ? 'opacity-60' : ''}`}>
                <div className="min-w-0">
                  <p className="font-ui">{r.title ?? `${r.name} — ${r.role}`}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.excerpt ?? r.quote}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" aria-label={r.visible === false ? 'Show on site' : 'Hide from site'} onClick={() => toggle(r)}>
                    {r.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" aria-label="Delete" onClick={() => remove(r)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
