import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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

        // 3. Insert into Supabase
        // We wrap this in a try-catch so the app doesn't break if the table hasn't been created yet.
        const { error } = await supabase.from('visitors').insert([{
          ip_address: data.ip || 'unknown',
          city: data.city || 'unknown',
          country: data.country_name || 'unknown'
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
