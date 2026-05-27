// Auth state + API client wrapper for GloveUp.
//
// Session token lives in localStorage. The SPA also ships with a build-time
// VITE_PUBLIC_READ_TOKEN that authorizes only the read endpoints — the API
// rejects any other call made with that token, so leaking it is bounded.

const STORAGE_KEY = "gloveup.session";

export type Session = {
  token: string;
  expiresAt: number; // unix seconds
  member: Member;
};

export type Member = {
  id: string;
  email: string;
  name: string | null;
  athlete_id: string | null;
  tier: "free" | "pro" | "club";
  created_at: number;
  updated_at: number;
};

export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "https://gloveup-api.cfpe397.workers.dev";

const PUBLIC_READ_TOKEN = (import.meta.env.VITE_PUBLIC_READ_TOKEN as string | undefined) ?? "";

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (parsed.expiresAt < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setSession(s: Session): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Picks the appropriate bearer for a request:
//   - member session if logged in
//   - public-read token otherwise
//
// Pass forceUnauth=true to omit Authorization entirely (used by /verify, which
// the API treats as a public route — sending a stale token would 401 it).
export function authHeaders(forceUnauth = false): Record<string, string> {
  if (forceUnauth) return {};
  const session = getSession();
  const token = session?.token ?? PUBLIC_READ_TOKEN;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function apiFetch(
  path: string,
  init: RequestInit = {},
  opts: { forceUnauth?: boolean } = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  for (const [k, v] of Object.entries(authHeaders(opts.forceUnauth))) headers.set(k, v);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}

// --- Auth endpoints ---------------------------------------------------------

export async function requestLink(email: string, turnstileToken: string): Promise<void> {
  const res = await apiFetch("/api/auth/request-link", {
    method: "POST",
    body: JSON.stringify({ email, turnstileToken }),
  }, { forceUnauth: true });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    throw new Error(err.error ?? `request_failed_${res.status}`);
  }
}

export async function verifyToken(token: string): Promise<Session> {
  const res = await apiFetch(`/api/auth/verify?token=${encodeURIComponent(token)}`, {}, { forceUnauth: true });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `verify_failed_${res.status}`);
  }
  const session = (await res.json()) as Session;
  setSession(session);
  return session;
}

export async function logout(): Promise<void> {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } finally {
    clearSession();
  }
}

export async function fetchMe(): Promise<Member> {
  const res = await apiFetch("/api/me");
  if (!res.ok) throw new Error(`me_failed_${res.status}`);
  const j = (await res.json()) as { member: Member };
  return j.member;
}

export async function postCheckout(tier: "pro" | "club"): Promise<{ url: string }> {
  const res = await apiFetch("/api/stripe/checkout", {
    method: "POST",
    body: JSON.stringify({ tier }),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `checkout_failed_${res.status}`);
  }
  return res.json();
}

export async function postPortal(): Promise<{ url: string }> {
  const res = await apiFetch("/api/stripe/portal", { method: "POST" });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `portal_failed_${res.status}`);
  }
  return res.json();
}
