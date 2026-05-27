import { useState } from "react";
import { SectionLabel } from "./HowItWorks";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "https://gloveup-api.cfpe397.workers.dev";

type Tier = {
  id: "free" | "pro" | "club";
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    id: "free",
    name: "Open mat",
    price: "£0",
    period: "forever",
    blurb: "Public matchmaker + Sport80 verified identity. Read-only.",
    features: ["Find sparring partners", "View your record", "FunCoin viewing only", "1 invite per week"],
    cta: "Current plan",
  },
  {
    id: "pro",
    name: "Pro",
    price: "£6",
    period: "/month",
    blurb: "Built for athletes training week-in week-out.",
    features: [
      "Unlimited sparring invites",
      "3 auto-backups per bout",
      "1,000 FunCoins monthly stipend",
      "Push notifications + calendar sync",
      "Priority matchmaking",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    id: "club",
    name: "Club",
    price: "£24",
    period: "/month",
    blurb: "For gym owners managing 10+ active competitors.",
    features: [
      "Everything in Pro",
      "Whole-gym leaderboard",
      "Coach view of every member's matches",
      "Bulk import from your federation feed",
      "Branded gym profile page",
    ],
    cta: "Start Club plan",
  },
];

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState<"pro" | "club" | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function upgrade(tier: "pro" | "club") {
    setErr(null);
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErr("Enter your email above first.");
      return;
    }
    setBusy(tier);
    try {
      const res = await fetch(`${API_BASE}/api/stripe/checkout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed, tier }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        if (json.error === "billing_disabled") {
          setErr("Billing isn't configured yet on this Worker — Stripe secrets pending.");
        } else {
          setErr(json.error ?? `HTTP ${res.status}`);
        }
        return;
      }
      if (json.url) window.location.assign(json.url);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-canvas to-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel>Membership</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
          Free to sign up. <span className="gradient-text">Pro</span> when you're training hard.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          Pricing in GBP. Cancel any time from the Stripe billing portal — your data stays put.
        </p>

        <div className="mt-10 max-w-md">
          <label className="text-xs uppercase tracking-widest text-muted">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gym.email"
            className="mt-1 w-full px-4 py-3 rounded-full bg-canvas/70 border border-white/10 focus:border-accent focus:outline-none"
            autoComplete="email"
          />
          {err && <div className="mt-2 text-rose-400 text-sm">{err}</div>}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border p-6 flex flex-col ${
                t.highlight
                  ? "border-accent/50 bg-gradient-to-br from-accent/15 via-card to-accent-2/5 shadow-xl shadow-accent/10"
                  : "border-white/10 bg-card"
              }`}
            >
              <div className="text-xs uppercase tracking-widest text-muted">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
                <span className="text-muted">{t.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{t.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {t.id === "free" ? (
                  <button
                    disabled
                    className="w-full px-4 py-3 rounded-full border border-white/10 text-muted text-sm font-semibold cursor-not-allowed"
                  >
                    {t.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => upgrade(t.id as "pro" | "club")}
                    disabled={busy !== null}
                    className={`w-full px-4 py-3 rounded-full text-sm font-semibold transition disabled:opacity-60 ${
                      t.highlight
                        ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                        : "bg-white/5 border border-white/10 text-ink hover:bg-white/10"
                    }`}
                  >
                    {busy === t.id ? "Opening Stripe…" : t.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-xs text-muted">
          Powered by Stripe Checkout. Card details never touch GloveUp servers. Cancel from your billing portal.
        </div>
      </div>
    </section>
  );
}
