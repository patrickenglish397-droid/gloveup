import { useState } from "react";
import { useAthletes, useMatch } from "../lib/useApi";
import Avatar from "./Avatar";
import { SectionLabel } from "./HowItWorks";

export default function OddsPreview() {
  const { data: boxers } = useAthletes();
  const primaryId = boxers?.[0]?.id ?? null;
  const { data: match, loading } = useMatch(primaryId);

  const [stake, setStake] = useState<number>(200);
  const [pick, setPick] = useState<"primary" | "opponent">("primary");

  return (
    <section id="odds" className="relative py-24 bg-gradient-to-b from-canvas via-card/20 to-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel>FunCoin odds · play money</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl">
          Friendly stakes on every <span className="gradient-text">sparring</span>.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          GloveUp generates odds from the Sport80 rating delta, so a tight matchup is close to evens.
          Stake play-money <strong className="text-ink">FunCoins</strong>, climb the gym leaderboard.
          No real wagering. No payouts.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-6 min-h-[360px]">
          {(loading || !match) ? (
            <>
              <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
              <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
            </>
          ) : (() => {
            const odds = pick === "primary" ? match.oddsPrimary : match.oddsOpponent;
            const ret = +(stake * odds).toFixed(0);
            const picked = pick === "primary" ? match.primary : match.opponent;
            return (
              <>
                {/* Bout card */}
                <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
                  <div className="px-5 py-3 bg-card-2/60 border-b border-white/5 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-muted">Sat · 18:30 · Northside BC</div>
                    <div className="text-[10px] uppercase tracking-widest text-accent-2">Upcoming spar</div>
                  </div>
                  <div className="p-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <Side boxer={match.primary} odds={match.oddsPrimary} active={pick === "primary"} onPick={() => setPick("primary")} />
                    <div className="text-center text-muted font-mono text-sm">vs</div>
                    <Side boxer={match.opponent} odds={match.oddsOpponent} active={pick === "opponent"} onPick={() => setPick("opponent")} />
                  </div>
                </div>

                {/* Slip */}
                <div className="rounded-2xl border border-white/10 bg-card p-6">
                  <div className="text-xs uppercase tracking-widest text-muted">Your slip</div>
                  <div className="mt-3 flex items-center gap-3">
                    <Avatar name={picked.name} hue={picked.avatarHue} size={40} />
                    <div>
                      <div className="text-sm font-semibold">{picked.name.split(" ").slice(0, -1).join(" ")}</div>
                      <div className="text-[11px] text-muted">to win · {odds.toFixed(2)}×</div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Stake</span>
                      <span>🪙 {stake} FC</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={1000}
                      step={10}
                      value={stake}
                      onChange={(e) => setStake(parseInt(e.target.value))}
                      className="mt-2 w-full accent-[var(--color-accent)]"
                    />
                    <div className="mt-4 flex gap-2">
                      {[50, 100, 200, 500].map(v => (
                        <button
                          key={v}
                          onClick={() => setStake(v)}
                          className={`flex-1 text-xs py-2 rounded-md border ${stake === v ? "border-accent bg-accent/10 text-ink" : "border-white/10 bg-card-2 text-muted hover:text-ink"}`}
                        >
                          {v} FC
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/10 border border-accent/30 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-muted">Potential return</div>
                      <div className="font-extrabold text-2xl gradient-text">🪙 {ret} FC</div>
                    </div>
                    <button className="px-5 py-2.5 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                      Lock in (demo)
                    </button>
                  </div>
                  <p className="mt-4 text-[11px] text-muted leading-relaxed">
                    FunCoins are virtual currency for entertainment between gym mates. No purchase, no payouts,
                    no transferability. v1 is play-money only — real-money wagering on amateur sparring is not on
                    the roadmap.
                  </p>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

function Side({ boxer, odds, active, onPick }: {
  boxer: import("../data/boxers").Boxer;
  odds: number;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      onClick={onPick}
      className={`text-center rounded-xl p-3 border transition ${active ? "border-accent bg-accent/10" : "border-white/10 hover:border-white/25 bg-card-2"}`}
    >
      <Avatar name={boxer.name} hue={boxer.avatarHue} size={56} />
      <div className="mt-2 text-sm font-bold leading-tight">{boxer.name.split(" ").slice(0, -1).join(" ")}</div>
      <div className="text-[11px] text-muted">{boxer.rating} · {boxer.weightClassName}</div>
      <div className="mt-2 inline-block rounded-md bg-canvas/60 px-2 py-1 font-extrabold text-base">{odds.toFixed(2)}×</div>
    </button>
  );
}
