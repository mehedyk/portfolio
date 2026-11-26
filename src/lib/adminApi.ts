import { API } from '@/config/site';

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export type GetToken = () => Promise<string | null>;

/** Authenticated call to our serverless API. */
export async function adminFetch<T>(getToken: GetToken, path: string, init: RequestInit = {}): Promise<T> {
  const token = await getToken();
  if (!token) throw new ApiError(401, 'Not signed in');
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error ?? `Request failed (${res.status})`);
  return data as T;
}

export const endpoints = { content: API.content, contact: API.contact };
