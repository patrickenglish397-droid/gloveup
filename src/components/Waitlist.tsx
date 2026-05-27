import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="waitlist" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden border border-accent/30 bg-gradient-to-br from-accent/15 via-card to-accent-2/10 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Be there day one.
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Closed beta launches with England Boxing's Sport80 instance.
              Waitlist gets early invites + first dibs on gym leaderboards.
            </p>

            {submitted ? (
              <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm">
                <span className="text-lg">✓</span> You're on the list. We'll email when invites open.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubmitted(true);
                }}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gym.email"
                  className="flex-1 px-4 py-3 rounded-full bg-canvas/70 border border-white/10 focus:border-accent focus:outline-none text-ink placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition shadow-lg shadow-accent/20"
                >
                  Join waitlist
                </button>
              </form>
            )}

            <div className="mt-6 text-xs text-muted">
              No spam. Unsubscribe anytime. Email used only for beta invites.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
