import type { Boxer } from "../data/boxers";

export type RankedCandidate = {
  boxer: Boxer;
  score: number;
  ratingDelta: number;
  weightDelta: number;
};

// Lower score = better match.
// Rating delta dominates; weight delta is a strong secondary; availability nudges ties.
export function rankCandidates(primary: Boxer, pool: Boxer[]): RankedCandidate[] {
  return pool
    .filter(b => b.id !== primary.id)
    .map(b => {
      const ratingDelta = Math.abs(b.rating - primary.rating);
      const weightDelta = Math.abs(b.weightClassKg - primary.weightClassKg);
      const availabilityPenalty = (100 - b.availabilityScore) * 0.4;
      const score = ratingDelta + weightDelta * 8 + availabilityPenalty;
      return { boxer: b, score, ratingDelta, weightDelta };
    })
    .sort((a, b) => a.score - b.score);
}

export type MatchProposal = {
  primary: Boxer;
  opponent: Boxer;
  backups: Boxer[]; // exactly 3
  oddsPrimary: number; // decimal odds
  oddsOpponent: number;
};

export function proposeMatch(primary: Boxer, pool: Boxer[]): MatchProposal {
  const ranked = rankCandidates(primary, pool);
  const opponent = ranked[0].boxer;
  const backups = ranked.slice(1, 4).map(r => r.boxer);

  // Decimal odds derived from rating delta. Closer ratings -> closer to evens.
  const diff = opponent.rating - primary.rating;
  const pPrimary = 1 / (1 + Math.pow(10, diff / 400)); // ELO win prob for primary
  const pOpp = 1 - pPrimary;
  const margin = 1.08; // bookmaker overround
  const oddsPrimary = +(1 / (pPrimary * margin)).toFixed(2);
  const oddsOpponent = +(1 / (pOpp * margin)).toFixed(2);

  return { primary, opponent, backups, oddsPrimary, oddsOpponent };
}
