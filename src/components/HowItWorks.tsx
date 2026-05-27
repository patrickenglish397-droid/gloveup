const steps = [
  {
    n: "01",
    title: "Connect Sport80",
    body: "Link your Sport80 athlete profile. We pull your verified record, weight class, and federation rating — no manual entry, no fibs about your record.",
    icon: "🔗",
  },
  {
    n: "02",
    title: "Set your window",
    body: "Tell GloveUp when you're free and how far you'll travel. We surface boxers within ±50 rating in your weight class first, then widen the search if needed.",
    icon: "🗓",
  },
  {
    n: "03",
    title: "Spar — with backups",
    body: "Every match comes with three pre-vetted backups of similar ability. If your opponent drops out, the next-best is one tap away. Optional FunCoin odds on the side.",
    icon: "🥊",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
          Three steps from <span className="gradient-text">app install</span> to gloves on.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="group relative rounded-2xl border border-white/10 bg-card p-6 hover:border-accent/40 transition">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-mono text-xs text-muted">{s.n}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-2">
      <span className="w-6 h-px bg-accent-2" />
      {children}
    </div>
  );
}
