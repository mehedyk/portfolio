import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClerkProvider, Show, SignIn, SignOutButton, UserButton, useAuth } from '@clerk/react';
import { ArrowLeft, Inbox, BookOpen, MessageSquareQuote, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MessagesTab } from '@/components/admin/MessagesTab';
import { ContentTab } from '@/components/admin/ContentTab';
import { ApiError } from '@/lib/adminApi';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
type Tab = 'messages' | 'posts' | 'testimonials';
const TABS: { id: Tab; label: string; icon: typeof Inbox }[] = [
  { id: 'messages', label: 'Messages', icon: Inbox },
  { id: 'posts', label: 'Blog posts', icon: BookOpen },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
];

const Dashboard = () => {
  const { getToken } = useAuth();
  const [tab, setTab] = useState<Tab>('messages');
  const [denied, setDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useCallback(() => getToken(), [getToken]);

  const onError = useCallback((e: unknown) => {
    if (e instanceof ApiError && (e.status === 403 || e.status === 401)) setDenied(true);
    else setError(e instanceof Error ? e.message : 'Something went wrong');
  }, []);

  if (denied) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-destructive" aria-hidden="true" />
        <h2 className="font-heading text-2xl">Not an admin account</h2>
        <p className="mt-2 text-sm text-muted-foreground">You're signed in, but this account isn't on the admin allow-list.</p>
        <div className="mt-6"><SignOutButton><Button variant="outline">Sign out</Button></SignOutButton></div>
      </div>
    );
  }

  return (
    <div>
      <div role="tablist" className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => { setTab(t.id); setError(null); }}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${tab === t.id ? 'bg-primary text-primary-foreground' : 'border border-primary/30 hover:border-primary'}`}
          >
            <t.icon className="h-4 w-4" aria-hidden="true" />{t.label}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm">{error}</p>}
      {tab === 'messages' ? <MessagesTab getToken={token} onError={onError} /> : <ContentTab key={tab} kind={tab} getToken={token} onError={onError} />}
    </div>
  );
};

const Admin = () => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to site</Link>
        <h1 className="font-heading text-lg">Admin</h1>
        {PUBLISHABLE_KEY ? <Show when="signed-in"><UserButton /></Show> : <span />}
      </div>
    </header>
    <main className="container mx-auto max-w-4xl px-4 py-8">
      {!PUBLISHABLE_KEY ? (
        <p className="py-24 text-center text-muted-foreground">Admin isn't configured (missing VITE_CLERK_PUBLISHABLE_KEY).</p>
      ) : (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/admin">
          <Show when="signed-out"><div className="flex justify-center py-12"><SignIn routing="hash" /></div></Show>
          <Show when="signed-in"><Dashboard /></Show>
        </ClerkProvider>
      )}
    </main>
  </div>
);

export default Admin;
