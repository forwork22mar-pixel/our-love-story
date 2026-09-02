import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { CONFIG, type Memory } from "@/config/experience";
import { Chapter, SmartImage } from "./ui";

/** Interactive constellation of memories. */
export function MemoryMap({ onOpenMemory }: { onOpenMemory?: (id: string) => void }) {
  const memories = CONFIG.memories;
  const [active, setActive] = useState<Memory | null>(null);
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);

  // constellation edges: each node links to the centre or to its neighbour
  const edges = useMemo(
    () =>
      memories.map((m, i) => {
        const prev = memories[i - 1];
        return {
          from: prev ? { x: prev.x, y: prev.y } : { x: 0, y: 0 },
          to: { x: m.x, y: m.y },
          delay: i * 0.25,
        };
      }),
    [memories],
  );

  const open = (m: Memory) => {
    setActive(m);
    setFocus({ x: m.x, y: m.y });
    onOpenMemory?.(m.id);
  };

  const close = () => {
    setActive(null);
    setFocus(null);
  };

  return (
    <Chapter
      id="map"
      index="04"
      eyebrow="Memory map"
      title="Our story, as a constellation."
      subtitle="Every light is a moment. Touch one and it comes back."
    >
      <div className="relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="relative mx-auto aspect-square w-[760px] max-w-none sm:w-full sm:max-w-3xl">
          <motion.div
            className="absolute inset-0"
            animate={
              focus
                ? { scale: 1.18, x: `${-focus.x * 0.32}%`, y: `${-focus.y * 0.32}%` }
                : { scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* glowing links */}
            <svg viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {edges.map((e, i) => (
                <motion.line
                  key={i}
                  x1={e.from.x}
                  y1={e.from.y}
                  x2={e.to.x}
                  y2={e.to.y}
                  stroke="url(#line)"
                  strokeWidth={0.45}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: e.delay, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
              {memories.map((m, i) => (
                <motion.line
                  key={`c${i}`}
                  x1={0}
                  y1={0}
                  x2={m.x}
                  y2={m.y}
                  stroke="var(--rose)"
                  strokeOpacity={0.12}
                  strokeWidth={0.25}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, delay: 0.4 + i * 0.08 }}
                />
              ))}
            </svg>

            {/* centre */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <motion.div
                className="mx-auto h-24 w-24 rounded-full blur-xl"
                style={{ background: "radial-gradient(circle, var(--rose), transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="eyebrow -mt-14 text-[0.62rem] text-blush">Our story</p>
            </div>

            {/* nodes */}
            {memories.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => open(m)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + m.x * 0.45}%`, top: `${50 + m.y * 0.45}%` }}
              >
                <motion.span
                  className="relative grid h-4 w-4 place-items-center rounded-full bg-blush"
                  style={{ boxShadow: "0 0 18px var(--rose)" }}
                  animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.25, 1] }}
                  transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="absolute h-8 w-8 rounded-full border border-primary/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.span>
                <span className="pointer-events-none absolute left-1/2 top-6 w-32 -translate-x-1/2 text-center text-[0.55rem] uppercase leading-tight tracking-[0.2em] text-muted-foreground transition-colors duration-500 group-hover:text-blush">
                  {m.type}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground sm:hidden">Drag sideways to explore the map →</p>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-[color-mix(in_oklab,var(--ink)_88%,transparent)] p-3 backdrop-blur-xl sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.article
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 shadow-[var(--shadow-cinematic)] sm:p-8"
            >
              <p className="eyebrow flex items-center gap-3">
                <span className="text-primary">{active.icon ?? "✦"}</span>
                {active.type}
              </p>
              <h3 className="display mt-4 text-3xl text-blush">{active.title}</h3>
              <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground">{active.date}</p>

              {active.image && (
                <div className="mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-border">
                  <SmartImage src={active.image} alt={active.title} />
                </div>
              )}
              {active.video && (
                <video src={active.video} controls playsInline className="mt-4 w-full rounded-xl border border-border" />
              )}

              <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {active.description}
              </p>

              {active.song && <p className="mt-4 text-xs text-muted-foreground">♪ {active.song}</p>}

              <button
                onClick={close}
                className="mt-8 w-full rounded-full border border-border py-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-blush"
              >
                Back to the map
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}
