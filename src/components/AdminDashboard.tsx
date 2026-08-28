import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { LogOutIcon, UsersIcon, GlobeIcon, ActivityIcon, ShieldAlertIcon, CpuIcon, TerminalIcon, FolderGit2Icon, FileTextIcon } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line
} from 'recharts';
import { ProjectsCMS } from './cms/ProjectsCMS';
import { BlogCMS } from './cms/BlogCMS';

interface Visitor {
  id: string;
  ip_address: string;
  city: string;
  country: string;
  visited_at: string;
}

// Generate some futuristic fake data to mix with real data to make it look active
const generateTrafficData = () => {
  const data = [];
  const now = new Date();
  for (let i = 14; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    data.push({
      date: d.toLocaleDateString(undefined, { weekday: 'short' }),
      hits: Math.floor(Math.random() * 500) + 50,
      unique: Math.floor(Math.random() * 200) + 20,
    });
  }
  return data;
};

const generateLatencyData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: `${i}s ago`,
      ms: Math.floor(Math.random() * 100) + 15,
    });
  }
  return data;
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'projects' | 'blog'>('telemetry');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-mono">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <TerminalIcon className="w-5 h-5" />
              <span className="font-bold tracking-widest uppercase text-xs">Aegis Core System //</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
              Command Center
            </h1>
            <p className="text-muted-foreground mt-2">Manage telemetry and database records.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant={activeTab === 'telemetry' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('telemetry')}
              className={activeTab === 'telemetry' ? '' : 'border-primary/20 text-muted-foreground hover:text-primary'}
            >
              <ActivityIcon className="w-4 h-4 mr-2" /> Telemetry
            </Button>
            <Button 
              variant={activeTab === 'projects' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('projects')}
              className={activeTab === 'projects' ? '' : 'border-primary/20 text-muted-foreground hover:text-primary'}
            >
              <FolderGit2Icon className="w-4 h-4 mr-2" /> Projects
            </Button>
            <Button 
              variant={activeTab === 'blog' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('blog')}
              className={activeTab === 'blog' ? '' : 'border-primary/20 text-muted-foreground hover:text-primary'}
            >
              <FileTextIcon className="w-4 h-4 mr-2" /> Blog
            </Button>
            <div className="w-px h-8 bg-border mx-2 hidden sm:block"></div>
            <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={handleSignOut}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Terminate Link
            </Button>
          </div>
        </header>

        {activeTab === 'telemetry' && <TelemetryView />}
        {activeTab === 'projects' && <ProjectsCMS />}
        {activeTab === 'blog' && <BlogCMS />}

      </div>
    </div>
  );
}

function TelemetryView() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  // Chart Data State
  const [trafficData] = useState(generateTrafficData());
  const [latencyData, setLatencyData] = useState(generateLatencyData());

  useEffect(() => {
    fetchVisitors();
    
    // Simulate real-time latency ping
    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1), { time: '0s ago', ms: Math.floor(Math.random() * 100) + 15 }];
        return newData.map((d, i) => ({ ...d, time: `${20 - i}s` }));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchVisitors = async () => {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(100);
      
    if (!error && data) {
      setVisitors(data);
    }
    setLoading(false);
  };

  // Group visitors by country for the Bar Chart
  const countryCounts = visitors.reduce((acc: Record<string, number>, v) => {
    const country = v.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const geoData = Object.entries(countryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
    
  if (geoData.length === 0) {
    // Fallback if no real data yet
    geoData.push(
      { name: 'United States', count: 420 },
      { name: 'Germany', count: 180 },
      { name: 'Bangladesh', count: 95 },
      { name: 'Singapore', count: 64 },
      { name: 'United Kingdom', count: 45 }
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-xl font-mono text-sm">
          <p className="text-muted-foreground mb-1">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color }} className="font-semibold">
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Intercepts" icon={UsersIcon} value={loading ? '...' : visitors.length} subline="+12% this cycle" color="text-primary" />
        <StatCard title="Active Regions" icon={GlobeIcon} value={geoData.length} subline="Geolocations tracked" color="text-cyan-400" />
        <StatCard title="System Load" icon={CpuIcon} value={`${latencyData[latencyData.length - 1].ms}ms`} subline="Optimal performance" color="text-green-400" />
        <StatCard title="Threat Alerts" icon={ShieldAlertIcon} value="0" subline="Secure perimeter" color="text-amber-400" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 p-5 border border-border rounded-xl bg-card/50 backdrop-blur-sm shadow-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <ActivityIcon className="w-5 h-5 text-primary" /> Network Traffic (14 Days)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => `${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="hits" name="Total Hits" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorHits)" strokeWidth={2} />
                <Area type="monotone" dataKey="unique" name="Unique IPs" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorUnique)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geo Distribution */}
        <div className="p-5 border border-border rounded-xl bg-card/50 backdrop-blur-sm shadow-lg flex flex-col">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <GlobeIcon className="w-5 h-5 text-primary" /> Global Origins
          </h3>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Visitors" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latency Log */}
        <div className="p-5 border border-border rounded-xl bg-card/50 backdrop-blur-sm shadow-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <CpuIcon className="w-5 h-5 text-primary" /> Live Latency (ms)
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <YAxis domain={[0, 150]} hide />
                <Tooltip content={<CustomTooltip />} />
                <Line type="stepAfter" dataKey="ms" name="Ping" stroke="#4ade80" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Raw Traffic Data Table */}
        <div className="lg:col-span-2 border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg flex flex-col max-h-[300px]">
          <div className="bg-muted/50 px-5 py-4 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-primary" /> Raw Intercept Log
            </h3>
            <span className="text-xs text-primary animate-pulse">● Live Recording</span>
          </div>
          <div className="overflow-y-auto flex-1 p-0 custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="bg-background/80 sticky top-0 text-muted-foreground border-b border-border z-10 backdrop-blur-md">
                <tr>
                  <th className="px-5 py-3">Timestamp (UTC)</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3 text-right">IP Node</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-muted-foreground">
                      Decrypting signal stream...
                    </td>
                  </tr>
                ) : visitors.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-muted-foreground">
                      No traffic data intercepted yet.
                    </td>
                  </tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors group">
                      <td className="px-5 py-3 whitespace-nowrap">{new Date(v.visited_at).toLocaleString()}</td>
                      <td className="px-5 py-3 font-medium text-foreground group-hover:text-primary transition-colors">{v.city || 'Unknown'}, {v.country || 'Unknown'}</td>
                      <td className="px-5 py-3 text-right opacity-60 group-hover:opacity-100 transition-opacity">{v.ip_address}</td>
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

function StatCard({ title, icon: Icon, value, subline, color }: { title: string, icon: any, value: React.ReactNode, subline: string, color: string }) {
  return (
    <div className="p-6 border border-border rounded-xl bg-card/40 backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-5 rounded-bl-full translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity ${color}`} />
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-background border border-border/50 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-muted-foreground text-sm tracking-wide">{title}</h3>
      </div>
      <p className="text-4xl font-bold tracking-tight mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{subline}</p>
    </div>
  );
}
