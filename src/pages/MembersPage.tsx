import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import { logout, postCheckout, postPortal, type Member } from "../lib/auth";
import { fetchAthletes, fetchMatch, type ApiMatchProposal } from "../lib/api";
import type { Boxer } from "../data/boxers";

export default function MembersPage() {
  return <AuthGuard>{(m) => <MembersDashboard member={m} />}</AuthGuard>;
}

function MembersDashboard({ member }: { member: Member }) {
  const navigate = useNavigate();
  const [athletes, setAthletes] = useState<Boxer[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(member.athlete_id);
  const [match, setMatch] = useState<ApiMatchProposal | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [billingError, setBillingError] = useState<string | null>(null);

  useEffect(() => {
    fetchAthletes().then(setAthletes).catch(() => setAthletes([]));
  }, []);

  async function findMatch() {
    if (!selectedId) return;
    setMatchLoading(true);
    setMatchError(null);
    try {
      const m = await fetchMatch(selectedId);
      setMatch(m);
    } catch (err) {
      setMatchError(err instanceof Error ? err.message : "match_failed");
    } finally {
      setMatchLoading(false);
    }
  }

  async function manageBilling() {
    setBillingError(null);
    try {
      const { url } = await postPortal();
      window.location.href = url;
    } catch (err) {
      setBillingError(err instanceof Error ? err.message : "portal_failed");
    }
  }

  async function upgrade(tier: "pro" | "club") {
    setBillingError(null);
    try {
      const { url } = await postCheckout(tier);
      window.location.href = url;
    } catch (err) {
      setBillingError(err instanceof Error ? err.message : "checkout_failed");
    }
  }

  async function signOut() {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-bold tracking-tight text-lg">GloveUp</a>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">{member.email}</span>
            <TierBadge tier={member.tier} />
            <button onClick={signOut} className="text-muted hover:text-ink transition">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted">
            Your members area. Pick your fighter profile, find a match, manage your subscription.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Find me a match</h2>
          <p className="text-muted text-sm mb-4">
            Pick the athlete profile you spar as. We'll suggest a fair opponent and three backups
            from the same federation.
          </p>
          {athletes === null && <p className="text-muted text-sm">Loading athletes…</p>}
          {athletes && athletes.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedId ?? ""}
                onChange={(e) => setSelectedId(e.target.value || null)}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent"
              >
                <option value="">Select your profile…</option>
                {athletes.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.gym} ({a.rating})
                  </option>
                ))}
              </select>
              <button
                onClick={findMatch}
                disabled={!selectedId || matchLoading}
                className="font-semibold px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition disabled:opacity-50"
              >
                {matchLoading ? "Finding…" : "Find me a match"}
              </button>
            </div>
          )}
          {matchError && <p className="text-sm text-red-400 mt-3">{matchError}</p>}
          {match && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <MatchCard label="You" boxer={match.primary} odds={match.oddsPrimary} />
              <MatchCard label="Opponent" boxer={match.opponent} odds={match.oddsOpponent} />
              <div className="sm:col-span-2 text-sm text-muted">
                Rating delta: {match.ratingDelta > 0 ? "+" : ""}{match.ratingDelta} · Backups:{" "}
                {match.backups.map((b) => b.name).join(", ")}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Subscription</h2>
          <p className="text-muted text-sm mb-4">
            You're on the <span className="text-ink font-semibold">{member.tier}</span> tier.
          </p>
          <div className="flex flex-wrap gap-3">
            {member.tier === "free" ? (
              <>
                <button
                  onClick={() => upgrade("pro")}
                  className="font-semibold px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition"
                >
                  Upgrade to Pro
                </button>
                <button
                  onClick={() => upgrade("club")}
                  className="font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 transition"
                >
                  Upgrade to Club
                </button>
              </>
            ) : (
              <button
                onClick={manageBilling}
                className="font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 transition"
              >
                Manage billing
              </button>
            )}
          </div>
          {billingError && <p className="text-sm text-red-400 mt-3">{billingError}</p>}
        </section>
      </main>
    </div>
  );
}

function TierBadge({ tier }: { tier: Member["tier"] }) {
  const styles =
    tier === "club"
      ? "bg-amber-400/15 text-amber-300 border-amber-400/30"
      : tier === "pro"
      ? "bg-accent/15 text-accent border-accent/30"
      : "bg-white/10 text-muted border-white/10";
  return (
    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full border ${styles}`}>
      {tier}
    </span>
  );
}

function MatchCard({ label, boxer, odds }: { label: string; boxer: Boxer; odds: number }) {
  return (
    <div className="border border-white/10 rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-muted mb-1">{label}</div>
      <div className="font-semibold">{boxer.name}</div>
      <div className="text-sm text-muted">{boxer.gym} · {boxer.weightClassName} · ELO {boxer.rating}</div>
      <div className="text-sm text-accent mt-2">Implied odds: {(odds * 100).toFixed(0)}%</div>
    </div>
  );
}
