import { useState } from "react";
import { Link } from "react-router-dom";
import Turnstile from "../components/Turnstile";
import { requestLink } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = email.length > 0 && turnstileToken.length > 0 && state !== "submitting";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setState("submitting");
    setErrorMsg("");
    try {
      await requestLink(email.trim().toLowerCase(), turnstileToken);
      setState("sent");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "request_failed");
    }
  }

  if (state === "sent") {
    return (
      <CenteredCard>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-muted">
          We sent a sign-in link to <span className="text-ink font-semibold">{email}</span>.
          The link expires in 15 minutes.
        </p>
        <p className="text-sm text-muted mt-6">
          Didn't get it?{" "}
          <button
            type="button"
            onClick={() => { setState("idle"); setTurnstileToken(""); }}
            className="text-accent hover:underline"
          >
            Try again
          </button>
        </p>
      </CenteredCard>
    );
  }

  return (
    <CenteredCard>
      <h1 className="text-2xl font-bold mb-2">Sign in to GloveUp</h1>
      <p className="text-muted mb-6">We'll email you a one-time link — no password.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-sm text-muted mb-1">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:border-accent"
            placeholder="you@gym.com"
          />
        </label>
        <Turnstile onVerify={setTurnstileToken} onError={() => setTurnstileToken("")} />
        {state === "error" && (
          <p className="text-sm text-red-400">Could not send link: {errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full font-semibold px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "submitting" ? "Sending…" : "Send sign-in link"}
        </button>
      </form>
      <p className="text-sm text-muted mt-6">
        <Link to="/" className="hover:text-ink">← Back to gloveup.app</Link>
      </p>
    </CenteredCard>
  );
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-canvas/80 border border-white/10 rounded-2xl p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
