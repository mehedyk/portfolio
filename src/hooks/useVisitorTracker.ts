import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

function maskIp(rawIp?: string): string {
  if (!rawIp || typeof rawIp !== 'string') return 'unknown';
  const trimmed = rawIp.trim();
  if (trimmed.includes('.')) {
    const parts = trimmed.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }
  if (trimmed.includes(':')) {
    const parts = trimmed.split(':');
    return `${parts.slice(0, 3).join(':')}:xxxx`;
  }
  return 'masked';
}

export function useVisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      // 1. Check if already tracked in this session to prevent spamming
      if (sessionStorage.getItem('visitor_tracked')) return;
      if (!isSupabaseConfigured) return;

      try {
        // 2. Fetch location data from free IP API
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) return;
        
        const data = await response.json();

        // 3. Insert anonymized data into Supabase
        const { error } = await supabase.from('visitors').insert([{
          ip_address: maskIp(data.ip),
          city: (data.city || 'unknown').toString().slice(0, 100),
          country: (data.country_name || 'unknown').toString().slice(0, 100)
        }]);

        if (!error) {
          sessionStorage.setItem('visitor_tracked', 'true');
        } else {
          console.warn('Visitor tracking table might not be set up yet.');
        }
      } catch (err) {
        // Silently fail on ad-blockers or network errors
        console.warn('Visitor tracking prevented or failed.');
      }
    };

    trackVisitor();
  }, []);
}
