import type { Boxer } from "../data/boxers";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "https://gloveup-api.cfpe397.workers.dev";

type ApiAthlete = {
  id: string;
  name: string;
  handle: string;
  gym: string;
  city: string;
  weight_class_kg: number;
  weight_class_name: string;
  rating: number;
  wins: number;
  losses: number;
  draws: number;
  stance: "Orthodox" | "Southpaw";
  age: number;
  availability_score: number;
  avatar_hue: number;
  federation: string;
  source: string;
};

function toBoxer(a: ApiAthlete): Boxer {
  return {
    id: a.id,
    name: a.name,
    handle: a.handle,
    gym: a.gym,
    city: a.city,
    weightClassKg: a.weight_class_kg,
    weightClassName: a.weight_class_name,
    rating: a.rating,
    wins: a.wins,
    losses: a.losses,
    draws: a.draws,
    stance: a.stance,
    age: a.age,
    availabilityScore: a.availability_score,
    avatarHue: a.avatar_hue,
  };
}

export async function fetchAthletes(): Promise<Boxer[]> {
  const res = await fetch(`${API_BASE}/api/athletes`);
  if (!res.ok) throw new Error(`athletes failed: ${res.status}`);
  const json = (await res.json()) as { athletes: ApiAthlete[] };
  // Preserve the seed ordering (b1, b2, …) for predictable demos.
  return json.athletes.map(toBoxer).sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
}

export type ApiMatchProposal = {
  primary: Boxer;
  opponent: Boxer;
  backups: Boxer[];
  ratingDelta: number;
  oddsPrimary: number;
  oddsOpponent: number;
};

export async function fetchMatch(primaryId: string): Promise<ApiMatchProposal> {
  const res = await fetch(`${API_BASE}/api/match/propose?primaryId=${encodeURIComponent(primaryId)}`);
  if (!res.ok) throw new Error(`match failed: ${res.status}`);
  const j = (await res.json()) as {
    primary: ApiAthlete;
    opponent: ApiAthlete;
    backups: ApiAthlete[];
    ratingDelta: number;
    odds: { primary: number; opponent: number };
  };
  return {
    primary: toBoxer(j.primary),
    opponent: toBoxer(j.opponent),
    backups: j.backups.map(toBoxer),
    ratingDelta: j.ratingDelta,
    oddsPrimary: j.odds.primary,
    oddsOpponent: j.odds.opponent,
  };
}
