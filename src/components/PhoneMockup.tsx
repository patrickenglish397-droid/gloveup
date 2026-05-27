// Animated "video" mockup: a phone frame cycling through four app screens.
// Each screen is a CSS opacity/keyframe loop synced on an 8s cycle.

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 280, height: 580 }}>
      {/* Glow */}
      <div className="absolute inset-0 -m-10 rounded-[60px] blur-3xl opacity-50"
           style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.35), transparent 70%)" }} />
      {/* Phone frame */}
      <div className="relative w-full h-full rounded-[44px] bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20" />
        {/* Screen */}
        <div className="absolute inset-2 rounded-[36px] overflow-hidden bg-canvas">
          <Screen1 />
          <Screen2 />
          <Screen3 />
          <Screen4 />
          <ScreenDots />
        </div>
      </div>
    </div>
  );
}

function ScreenBase({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return (
    <div
      className="absolute inset-0 px-4 pt-12 pb-6 flex flex-col"
      style={style}
    >
      {children}
    </div>
  );
}

function Screen1() {
  // PROFILE screen
  return (
    <ScreenBase style={{ animation: "screenCycle1 8s ease-in-out infinite" }}>
      <div className="text-[10px] uppercase tracking-widest text-muted">Profile</div>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-12 h-12 rounded-full" style={{ background: "conic-gradient(from 0deg, #10b981, #84cc16, #10b981)" }} />
        <div>
          <div className="font-semibold text-sm">Mia Okafor</div>
          <div className="text-[10px] text-muted">Lightweight · Manchester</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[["12", "W"], ["2", "L"], ["1", "D"]].map(([n, l]) => (
          <div key={l} className="rounded-lg bg-card-2 py-2">
            <div className="font-bold text-base">{n}</div>
            <div className="text-[9px] text-muted">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-card-2 p-2.5">
        <div className="text-[10px] text-muted mb-1">Sport80 rating</div>
        <div className="font-bold text-lg gradient-text">1640</div>
        <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[68%] bg-gradient-to-r from-accent to-accent-2" />
        </div>
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-widest text-muted">Recent</div>
      {["W vs T.Bell", "W vs A.Karim", "L vs M.Adeyemi"].map((r) => (
        <div key={r} className="mt-1 text-[11px] flex items-center gap-2">
          <span className={r.startsWith("W") ? "text-emerald-400" : "text-rose-400"}>●</span>
          {r}
        </div>
      ))}
    </ScreenBase>
  );
}

function Screen2() {
  // MATCHMAKING screen
  return (
    <ScreenBase style={{ animation: "screenCycle2 8s ease-in-out infinite" }}>
      <div className="text-[10px] uppercase tracking-widest text-muted">Finding sparring partner…</div>
      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border border-accent" style={{ animation: "pulseRing 1.6s ease-out infinite" }} />
        <div className="absolute w-28 h-28 rounded-full border border-accent" style={{ animation: "pulseRing 1.6s ease-out infinite", animationDelay: "0.5s" }} />
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-xl">🥊</div>
      </div>
      <div className="rounded-lg bg-card-2 p-2.5">
        <div className="text-[10px] text-muted">Scanning</div>
        <div className="text-[11px] font-medium">±50 rating · Lightweight · &lt;30km</div>
        <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-2/3 bg-accent" />
        </div>
      </div>
    </ScreenBase>
  );
}

function Screen3() {
  // BACKUPS screen
  return (
    <ScreenBase style={{ animation: "screenCycle3 8s ease-in-out infinite" }}>
      <div className="text-[10px] uppercase tracking-widest text-muted">Bout · Sat 18:30</div>
      <div className="mt-2 rounded-lg p-2.5 bg-gradient-to-br from-accent/20 to-accent-2/10 border border-accent/30">
        <div className="text-[9px] uppercase tracking-widest text-accent-2">Opponent</div>
        <div className="font-semibold text-sm">Priya Shah · 1655</div>
        <div className="text-[10px] text-muted">Δ +15 · same class</div>
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-widest text-muted">Backups</div>
      {[
        ["Lara Brennan", "1675", "Δ +35"],
        ["K. Cannonball", "1620", "Δ −20"],
        ["A. Karim", "1560", "Δ −80"],
      ].map(([n, r, d]) => (
        <div key={n} className="mt-1.5 rounded-md bg-card-2 px-2.5 py-1.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium">{n}</div>
            <div className="text-[9px] text-muted">{d}</div>
          </div>
          <div className="text-[11px] font-semibold">{r}</div>
        </div>
      ))}
    </ScreenBase>
  );
}

function Screen4() {
  // ODDS screen
  return (
    <ScreenBase style={{ animation: "screenCycle4 8s ease-in-out infinite" }}>
      <div className="text-[10px] uppercase tracking-widest text-muted">FunCoin Odds · play money</div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[
          ["Mia", "1.92", "from-accent to-accent-2"],
          ["Priya", "1.88", "from-sky-500 to-cyan-400"],
        ].map(([n, o, g]) => (
          <div key={n} className={`rounded-lg bg-gradient-to-br ${g} p-2.5`}>
            <div className="text-[10px] text-white/80">{n}</div>
            <div className="font-extrabold text-xl text-white">{o}×</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-card-2 p-2.5">
        <div className="text-[10px] text-muted">Your stake</div>
        <div className="font-bold text-lg">🪙 200 FC</div>
        <div className="mt-1 text-[10px] text-muted">Potential return · 384 FC</div>
      </div>
      <div className="mt-auto rounded-full bg-accent py-2 text-center text-[11px] font-semibold" style={{ animation: "bob 1.4s ease-in-out infinite" }}>
        Tap to lock in
      </div>
    </ScreenBase>
  );
}

function ScreenDots() {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
      ))}
    </div>
  );
}
