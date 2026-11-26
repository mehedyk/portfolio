import { verifyToken } from '@clerk/backend';
import { allowedOrigins } from './http';

export type AuthResult = { ok: true; userId: string } | { ok: false; status: 401 | 403 | 500 };

/** Verifies the Clerk session token and that the user is listed in ADMIN_USER_IDS. */
export async function requireAdmin(request: Request): Promise<AuthResult> {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const admins = (process.env.ADMIN_USER_IDS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!secretKey || admins.length === 0) return { ok: false, status: 500 };

  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return { ok: false, status: 401 };

  const result = await verifyToken(token, {
    secretKey,
    // Token must have been issued for one of our own origins.
    authorizedParties: allowedOrigins(),
  });
  const sub = (result.data as { sub?: string } | undefined)?.sub;
  if (result.errors || !sub) return { ok: false, status: 401 };
  if (!admins.includes(sub)) return { ok: false, status: 403 };
  return { ok: true, userId: sub };
}
