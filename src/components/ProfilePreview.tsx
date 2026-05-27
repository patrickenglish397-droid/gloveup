import { BOXERS } from "../data/boxers";
import Avatar from "./Avatar";
import { SectionLabel } from "./HowItWorks";

export default function ProfilePreview() {
  const boxer = BOXERS[0]; // Mia
  const totalFights = boxer.wins + boxer.losses + boxer.draws;
  const winRate = Math.round((boxer.wins / totalFights) * 100);

  return (
    <section id="profile" className="relative py-24 bg-gradient-to-b from-canvas to-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel>Athlete dashboard</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
          Your record, pulled from <span className="gradient-text">Sport80</span>.
        </h2>
        <p className="mt-3 text-muted max-w-xl">
          No more screenshots of your card. Every fight on your Sport80 profile is verified,
          dated, and counted toward your matchmaking rating.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-card overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-card-2/50">
            <div className="flex items-center gap-4">
              <Avatar name={boxer.name} hue={boxer.avatarHue} size={56} />
              <div>
                <div className="text-lg font-bold">{boxer.name}</div>
                <div className="text-xs text-muted">{boxer.handle} · {boxer.gym} · {boxer.city}</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
              <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-sky-400 to-blue-600" />
              <span className="font-semibold text-ink">Sport80</span> verified
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/5">
            <Stat label="Wins" value={boxer.wins} color="text-emerald-400" />
            <Stat label="Losses" value={boxer.losses} color="text-rose-400" />
            <Stat label="Draws" value={boxer.draws} color="text-zinc-300" />
            <Stat label="Weight class" value={boxer.weightClassName} sub={`${boxer.weightClassKg}kg`} />
            <Stat label="Sport80 rating" value={boxer.rating} sub={`win rate ${winRate}%`} highlight />
          </div>

          {/* Form chart */}
          <div className="px-6 py-6 border-t border-white/5">
            <div className="text-xs uppercase tracking-widest text-muted">Last 8 bouts (newest →)</div>
            <div className="mt-4 flex items-end gap-3 h-32">
              {[
                ["W", 0.7], ["L", 0.4], ["W", 0.8], ["W", 0.75],
                ["W", 0.85], ["D", 0.5], ["W", 0.9], ["W", 0.95],
              ].map(([result, h], i) => {
                const isWin = result === "W";
                const isLoss = result === "L";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-white/5 rounded-md overflow-hidden flex items-end" style={{ height: 96 }}>
                      <div
                        className={`w-full origin-bottom ${isWin ? "bg-gradient-to-t from-emerald-600 to-emerald-400" : isLoss ? "bg-gradient-to-t from-rose-700 to-rose-500" : "bg-gradient-to-t from-zinc-600 to-zinc-400"}`}
                        style={{
                          height: `${(h as number) * 100}%`,
                          animation: `barGrow 0.6s ease-out ${i * 0.05}s both`,
                        }}
                      />
                    </div>
                    <div className="text-[10px] font-bold text-muted">{result as string}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted">
          Demo data shown · live app pulls directly from your linked Sport80 athlete record.
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub, highlight, color }: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  color?: string;
}) {
  return (
    <div className={`px-5 py-5 bg-card ${highlight ? "bg-gradient-to-br from-accent/10 to-accent-2/5" : ""}`}>
      <div className="text-[11px] uppercase tracking-widest text-muted">{label}</div>
      <div className={`mt-1 font-extrabold text-2xl ${color || (highlight ? "gradient-text" : "")}`}>
        {value}
      </div>
      {sub && <div className="text-[11px] text-muted mt-0.5">{sub}</div>}
    </div>
  );
}
