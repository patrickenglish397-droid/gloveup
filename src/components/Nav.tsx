export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-canvas/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-bold tracking-tight text-lg">GloveUp</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#how" className="hover:text-ink transition">How it works</a>
          <a href="#profile" className="hover:text-ink transition">Profile</a>
          <a href="#match" className="hover:text-ink transition">Matchmaking</a>
          <a href="#odds" className="hover:text-ink transition">Odds</a>
          <a href="#pricing" className="hover:text-ink transition">Pricing</a>
          <a href="#faq" className="hover:text-ink transition">FAQ</a>
        </nav>
        <a
          href="#waitlist"
          className="text-sm font-semibold px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition shadow-lg shadow-accent/20"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="text-accent">
      <defs>
        <linearGradient id="glove" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <path
        fill="url(#glove)"
        d="M9 6c1.5-2 4-2.5 6.5-2 2.5.5 4.5 2 6.5 4.5 1.5 2 2 4.5 1.5 7-.5 2.5-2 5-4 6.5-1 .8-1 2 0 2.5l.5.5c1 1 .5 2.5-1 3H10c-1.5 0-2.5-1-2.5-2.5v-1.5c0-1.5-.5-3-1.5-4-1-1-1.5-2.5-1.5-4 0-2.5 1.5-5 3-7C8.5 7.5 9 6 9 6Z"
      />
    </svg>
  );
}
