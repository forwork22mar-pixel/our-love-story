import { useMemo } from "react";

function seeded(n: number) {
  const x = Math.sin(n * 9973.13) * 10000;
  return x - Math.floor(x);
}

/** Animated dark gradient + stars + drifting particles + occasional hearts. */
export function Atmosphere({ intensity = 1 }: { intensity?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        left: seeded(i + 1) * 100,
        top: seeded(i + 51) * 100,
        size: 0.6 + seeded(i + 101) * 1.7,
        delay: seeded(i + 151) * 8,
        dur: 3 + seeded(i + 201) * 6,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: seeded(i + 301) * 100,
        size: 1.5 + seeded(i + 351) * 3.5,
        delay: seeded(i + 401) * 26,
        dur: 26 + seeded(i + 451) * 30,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        left: 6 + seeded(i + 501) * 88,
        delay: seeded(i + 551) * 40,
        dur: 34 + seeded(i + 601) * 26,
        scale: 0.5 + seeded(i + 651) * 0.7,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--gradient-night)" }}
    >
      {/* nebula blooms */}
      <div
        className="absolute -left-[20%] top-[8%] h-[60vh] w-[60vw] rounded-full opacity-45 blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--burgundy), transparent 68%)",
          animation: "drift 34s ease-in-out infinite",
          opacity: 0.45 * intensity,
        }}
      />
      <div
        className="absolute -right-[15%] top-[45%] h-[55vh] w-[55vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--plum), transparent 70%)",
          animation: "drift 46s ease-in-out infinite reverse",
          opacity: 0.55 * intensity,
        }}
      />
      <div
        className="absolute left-[30%] top-[75%] h-[45vh] w-[50vw] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--rose), transparent 72%)",
          animation: "drift 52s ease-in-out infinite",
          opacity: 0.22 * intensity,
        }}
      />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full bg-blush"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={`p${i}`}
          className="absolute bottom-[-10vh] rounded-full bg-champagne/70 blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* occasional hearts */}
      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="absolute bottom-[-10vh] text-rose/40"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.scale}rem`,
            animation: `floatUp ${h.dur}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_35%,var(--ink)_100%)]" />
    </div>
  );
}
