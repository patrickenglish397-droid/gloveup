export type Boxer = {
  id: string;
  name: string;
  handle: string;
  gym: string;
  city: string;
  weightClassKg: number; // upper bound
  weightClassName: string;
  rating: number; // Sport80-style rating, ELO-ish 800-2400
  wins: number;
  losses: number;
  draws: number;
  stance: "Orthodox" | "Southpaw";
  age: number;
  availabilityScore: number; // 0-100, mocked
  avatarHue: number; // for the generated avatar
};

export const BOXERS: Boxer[] = [
  { id: "b1", name: "Mia 'Switchback' Okafor", handle: "@switchback", gym: "Northside BC", city: "Manchester", weightClassKg: 60, weightClassName: "Lightweight", rating: 1640, wins: 12, losses: 2, draws: 1, stance: "Southpaw", age: 24, availabilityScore: 88, avatarHue: 12 },
  { id: "b2", name: "Daniel 'Diesel' Rourke", handle: "@diesel", gym: "Iron Triangle", city: "Liverpool", weightClassKg: 75, weightClassName: "Middleweight", rating: 1820, wins: 18, losses: 3, draws: 0, stance: "Orthodox", age: 27, availabilityScore: 72, avatarHue: 36 },
  { id: "b3", name: "Aisha 'Ace' Karim", handle: "@aceboxes", gym: "Coalfield ABC", city: "Sheffield", weightClassKg: 57, weightClassName: "Featherweight", rating: 1560, wins: 9, losses: 1, draws: 0, stance: "Orthodox", age: 22, availabilityScore: 94, avatarHue: 320 },
  { id: "b4", name: "Tom 'Towpath' Bell", handle: "@towpath", gym: "Lock & Key BC", city: "Leeds", weightClassKg: 75, weightClassName: "Middleweight", rating: 1795, wins: 15, losses: 4, draws: 2, stance: "Orthodox", age: 29, availabilityScore: 65, avatarHue: 200 },
  { id: "b5", name: "Priya 'Pulse' Shah", handle: "@pulse", gym: "Eastside Boxing", city: "Birmingham", weightClassKg: 60, weightClassName: "Lightweight", rating: 1655, wins: 14, losses: 2, draws: 0, stance: "Southpaw", age: 26, availabilityScore: 81, avatarHue: 280 },
  { id: "b6", name: "Marcus 'Mile End' Adeyemi", handle: "@mileend", gym: "Crown Heights BC", city: "London", weightClassKg: 75, weightClassName: "Middleweight", rating: 1840, wins: 21, losses: 2, draws: 1, stance: "Orthodox", age: 28, availabilityScore: 70, avatarHue: 140 },
  { id: "b7", name: "Sara 'Shockwave' Lindqvist", handle: "@shockwave", gym: "Quayside ABC", city: "Newcastle", weightClassKg: 57, weightClassName: "Featherweight", rating: 1580, wins: 11, losses: 3, draws: 0, stance: "Orthodox", age: 25, availabilityScore: 60, avatarHue: 170 },
  { id: "b8", name: "Kofi 'Cannonball' Mensah", handle: "@cannonball", gym: "Royal Mile BC", city: "Edinburgh", weightClassKg: 60, weightClassName: "Lightweight", rating: 1620, wins: 10, losses: 4, draws: 1, stance: "Southpaw", age: 23, availabilityScore: 85, avatarHue: 80 },
  { id: "b9", name: "Lara 'Lightning' Brennan", handle: "@lightning", gym: "Harbour ABC", city: "Cardiff", weightClassKg: 60, weightClassName: "Lightweight", rating: 1675, wins: 13, losses: 2, draws: 1, stance: "Orthodox", age: 26, availabilityScore: 77, avatarHue: 230 },
  { id: "b10", name: "Jay 'Jackhammer' Patel", handle: "@jackhammer", gym: "Mill District BC", city: "Bradford", weightClassKg: 75, weightClassName: "Middleweight", rating: 1810, wins: 17, losses: 3, draws: 0, stance: "Orthodox", age: 27, availabilityScore: 68, avatarHue: 350 },
  { id: "b11", name: "Nia 'Needle' Roberts", handle: "@needle", gym: "Steelyard ABC", city: "Swansea", weightClassKg: 57, weightClassName: "Featherweight", rating: 1545, wins: 8, losses: 2, draws: 1, stance: "Southpaw", age: 21, availabilityScore: 90, avatarHue: 50 },
  { id: "b12", name: "Owen 'Outlaw' Hardy", handle: "@outlaw", gym: "Backstreet BC", city: "Bristol", weightClassKg: 75, weightClassName: "Middleweight", rating: 1860, wins: 22, losses: 1, draws: 0, stance: "Orthodox", age: 30, availabilityScore: 55, avatarHue: 0 },
];

export const findBoxer = (id: string) => BOXERS.find(b => b.id === id)!;
