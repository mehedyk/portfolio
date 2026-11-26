import { useCallback, useEffect, useState } from 'react';
import { Trash2, MailOpen, Mail, Loader2, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { adminFetch, endpoints, type GetToken } from '@/lib/adminApi';

interface Message { _id: string; name: string; email: string; message: string; read: boolean; createdAt: string }

export const MessagesTab = ({ getToken, onError }: { getToken: GetToken; onError: (e: unknown) => void }) => {
  const [items, setItems] = useState<Message[] | null>(null);

  const load = useCallback(async () => {
    try { setItems((await adminFetch<{ items: Message[] }>(getToken, endpoints.contact)).items); }
    catch (e) { onError(e); }
  }, [getToken, onError]);
  useEffect(() => { void load(); }, [load]);

  const act = async (id: string, method: 'PATCH' | 'DELETE') => {
    if (method === 'DELETE' && !window.confirm('Delete this message permanently?')) return;
    try { await adminFetch(getToken, `${endpoints.contact}?id=${id}`, { method }); await load(); }
    catch (e) { onError(e); }
  };

  if (!items) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (items.length === 0) return (
    <div className="py-16 text-center text-muted-foreground"><Inbox className="mx-auto mb-3 h-10 w-10" aria-hidden="true" />No messages yet.</div>
  );

  return (
    <ul className="space-y-3">
      {items.map((m) => (
        <li key={m._id}>
          <Card className={`p-4 ${m.read ? 'opacity-70' : 'border-primary/50'}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-ui">{m.name} <a className="text-sm text-primary hover:underline" href={`mailto:${m.email}`}>&lt;{m.email}&gt;</a></p>
                <time className="text-xs text-muted-foreground" dateTime={m.createdAt}>{new Date(m.createdAt).toLocaleString()}</time>
              </div>
              <div className="flex gap-2">
                {!m.read && <Button size="sm" variant="outline" onClick={() => act(m._id, 'PATCH')}><MailOpen className="mr-1 h-4 w-4" aria-hidden="true" />Mark read</Button>}
                {m.read && <span className="inline-flex items-center text-xs text-muted-foreground"><Mail className="mr-1 h-4 w-4" aria-hidden="true" />read</span>}
                <Button size="sm" variant="outline" aria-label="Delete message" onClick={() => act(m._id, 'DELETE')}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap break-words font-body text-sm">{m.message}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
};
