import { useState } from "react";
import { SectionLabel } from "./HowItWorks";

const faqs = [
  {
    q: "How is my rating calculated?",
    a: "We pull your federation rating directly from your linked Sport80 profile. There's no parallel GloveUp rating to game — if your federation says you're a 1640, we say you're a 1640.",
  },
  {
    q: "What happens if my opponent cancels?",
    a: "Every bout ships with three pre-vetted backups within ±100 rating and the same (or adjacent) weight class. One tap promotes the next-best to your primary opponent and pings them.",
  },
  {
    q: "Is the gambling for real money?",
    a: "No. v1 uses FunCoins — a virtual, non-purchasable, non-redeemable score. It's a leaderboard between gym mates, not a sportsbook. Real-money wagering on amateur sparring isn't on the roadmap.",
  },
  {
    q: "Do I need to be a registered athlete?",
    a: "For matchmaking on verified records, yes — you'll connect a Sport80 account. We're building an unverified track for fresh starters too, but those bouts won't influence rated boxers' rating pools.",
  },
  {
    q: "Where does GloveUp operate?",
    a: "Initial closed beta is UK-only via England Boxing's Sport80 instance. Expansion to other federations (USA Boxing, Boxing Australia) is on the roadmap once the matchmaking heuristics stabilise.",
  },
  {
    q: "What about safety / sanctioning?",
    a: "Sparring sessions arranged through GloveUp aren't sanctioned bouts — they're training sessions between consenting registered athletes. Gym-of-record approval and medical clearance still apply.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Common questions</h2>
        <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left py-5"
                >
                  <span className="font-semibold pr-4">{f.q}</span>
                  <span className={`text-muted text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="pb-5 text-muted leading-relaxed text-sm animate-fade-up">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
