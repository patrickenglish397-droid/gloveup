import { useMemo, useState } from "react";
import { BOXERS, type Boxer } from "../data/boxers";
import { proposeMatch } from "../lib/matchmaking";
import Avatar from "./Avatar";
import { SectionLabel } from "./HowItWorks";

export default function MatchmakingDemo() {
  const [primaryId, setPrimaryId] = useState<string>(BOXERS[0].id);
  const primary = BOXERS.find(b => b.id === primaryId)!;

  const result = useMemo(() => proposeMatch(primary, BOXERS), [primary]);

  return (
    <section id="match" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel>Try the matchmaker</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl">
          Pick a boxer. We'll find <span className="gradient-text">one opponent + three backups</span>.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          Ranked by absolute rating delta, then weight-class distance, then availability.
          Cancellations are routed to the next-best automatically — your training week doesn't collapse.
        </p>

        {/* Primary selector */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-card p-5">
          <div className="text-xs uppercase tracking-widest text-muted mb-3">You are…</div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {BOXERS.map(b => (
              <BoxerChip
                key={b.id}
                boxer={b}
                active={b.id === primaryId}
                onClick={() => setPrimaryId(b.id)}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Label>Primary opponent</Label>
            <MatchCard
              you={primary}
              other={result.opponent}
              ratingDelta={result.opponent.rating - primary.rating}
              accent
            />
          </div>
          <div className="lg:col-span-3">
            <Label>Auto-selected backups (if opponent cancels)</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {result.backups.map((b, i) => (
                <BackupCard
                  key={b.id}
                  rank={i + 1}
                  other={b}
                  ratingDelta={b.rating - primary.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-widest text-muted mb-2">{children}</div>;
}

function BoxerChip({ boxer, active, onClick }: { boxer: Boxer; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition ${
        active
          ? "border-accent bg-accent/10 text-ink"
          : "border-white/10 bg-card-2 text-muted hover:text-ink hover:border-white/25"
      }`}
    >
      <Avatar name={boxer.name} hue={boxer.avatarHue} size={28} />
      <span className="text-sm font-semibold whitespace-nowrap">{boxer.name.split(" ")[0]} {boxer.name.split(" ").pop()}</span>
      <span className="text-xs text-muted">· {boxer.rating}</span>
    </button>
  );
}

function MatchCard({ you, other, ratingDelta, accent }: { you: Boxer; other: Boxer; ratingDelta: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "border-accent/40 bg-gradient-to-br from-accent/15 via-card to-accent-2/5" : "border-white/10 bg-card"}`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <BoxerSide boxer={you} />
        <div className="text-center">
          <div className="text-xs font-mono text-muted">vs</div>
          <div className="mt-1 inline-flex flex-col items-center px-2 py-1 rounded bg-white/5 text-xs font-semibold">
            Δ {ratingDelta >= 0 ? "+" : ""}{ratingDelta}
          </div>
        </div>
        <BoxerSide boxer={other} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]">
        <Pill label="Same class" ok={you.weightClassKg === other.weightClassKg} />
        <Pill label="±50 rating" ok={Math.abs(ratingDelta) <= 50} />
        <Pill label="Avail ≥70" ok={other.availabilityScore >= 70} />
      </div>
    </div>
  );
}

function BackupCard({ rank, other, ratingDelta }: { rank: number; other: Boxer; ratingDelta: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-4">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted">
        <span>Backup #{rank}</span>
        <span>Δ {ratingDelta >= 0 ? "+" : ""}{ratingDelta}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Avatar name={other.name} hue={other.avatarHue} size={40} />
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{other.name}</div>
          <div className="text-[11px] text-muted truncate">{other.gym} · {other.city}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className="text-muted">{other.weightClassName}</span>
        <span className="font-bold">{other.rating}</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${other.availabilityScore}%` }} />
      </div>
      <div className="mt-1 text-[10px] text-muted">availability {other.availabilityScore}%</div>
    </div>
  );
}

function BoxerSide({ boxer }: { boxer: Boxer }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Avatar name={boxer.name} hue={boxer.avatarHue} size={64} />
      <div className="mt-2 font-bold text-sm leading-tight">{boxer.name.split(" ").slice(0, -1).join(" ")}</div>
      <div className="text-xs text-muted">{boxer.weightClassName} · {boxer.weightClassKg}kg</div>
      <div className="mt-1 font-extrabold text-lg gradient-text">{boxer.rating}</div>
    </div>
  );
}

function Pill({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className={`rounded-md py-1.5 ${ok ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
      {ok ? "✓ " : "× "}{label}
    </div>
  );
}
