export default function Avatar({ name, hue, size = 48 }: { name: string; hue: number; size?: number }) {
  const initials = name
    .split(" ")
    .filter(s => !s.startsWith("'") && !s.endsWith("'"))
    .map(s => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shadow-inner shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from 0deg, hsl(${hue} 80% 55%), hsl(${(hue + 60) % 360} 80% 55%), hsl(${hue} 80% 55%))`,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}
