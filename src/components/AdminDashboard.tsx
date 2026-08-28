import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { LogOutIcon, UsersIcon, GlobeIcon } from 'lucide-react';

interface Visitor {
  id: string;
  ip_address: string;
  city: string;
  country: string;
  visited_at: string;
}

export function AdminDashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(50);
      
    if (!error && data) {
      setVisitors(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">System Core</h1>
            <p className="text-muted-foreground">Admin Telemetry Dashboard</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOutIcon className="w-4 h-4 mr-2" />
            End Session
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <UsersIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Total Unique Hits</h3>
            </div>
            <p className="text-3xl font-bold">{loading ? '...' : visitors.length}</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <GlobeIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Latest Region</h3>
            </div>
            <p className="text-3xl font-bold truncate">
              {loading ? '...' : (visitors[0]?.country || 'N/A')}
            </p>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border font-semibold">
            Recent Traffic Log
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3">Timestamp (UTC)</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">IP Node</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                      Intercepting signals...
                    </td>
                  </tr>
                ) : visitors.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                      No traffic data intercepted yet.
                    </td>
                  </tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 font-mono">{new Date(v.visited_at).toLocaleString()}</td>
                      <td className="px-4 py-3">{v.city}, {v.country}</td>
                      <td className="px-4 py-3 font-mono opacity-50">{v.ip_address}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
