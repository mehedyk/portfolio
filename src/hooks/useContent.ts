import { useQuery } from '@tanstack/react-query';
import { fetchContent, type ContentMap } from '@/lib/api';

export function useContent<K extends keyof ContentMap>(type: K) {
  return useQuery({
    queryKey: ['content', type],
    queryFn: () => fetchContent(type),
    staleTime: 5 * 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
