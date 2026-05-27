import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section id="top" className="relative grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-2 bg-accent-2/10 border border-accent-2/30 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
            Closed beta · waitlist open
          </div>
          <h1 className="mt-5 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Find your perfect <span className="gradient-text">sparring partner</span>.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl">
            GloveUp matches boxers by Sport80 rating, weight class, and availability —
            so every spar lands in your level. Three automatic backups per bout means
            cancellations don't kill your training week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#waitlist" className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition shadow-xl shadow-accent/25">
              Join the waitlist
            </a>
            <a href="#how" className="px-6 py-3 rounded-full border border-white/15 text-ink hover:bg-white/5 transition font-semibold">
              See how it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted">
            <div className="flex items-center gap-2">
              <Sport80Mark /> Connects to Sport80
            </div>
            <div>·</div>
            <div>Made for amateur boxers</div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <PhoneMockup />
          <div className="mt-4 text-center text-xs text-muted">
            ▶ Mockup preview · cycles every 8s
          </div>
        </div>
      </div>
      <div className="scrim absolute inset-x-0 bottom-0 h-32 pointer-events-none" />
    </section>
  );
}

function Sport80Mark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-sky-400 to-blue-600" />
      <span className="font-semibold text-ink">Sport80</span>
    </span>
  );
}
