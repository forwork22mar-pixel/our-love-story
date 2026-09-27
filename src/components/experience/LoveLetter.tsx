import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

const HEART_PATH = "M50 32 A21 21 0 0 1 92 32 Q92 60 50 90 Q8 60 8 32 A21 21 0 0 1 50 32 Z";
const SPOTS: [number, number][] = [
  [22,24],[36,24],[64,24],[78,24],[16,34],[32,34],[68,34],[84,34],
  [20,44],[38,44],[62,44],[80,44],[14,52],[30,52],[70,52],[86,52],
  [26,66],[42,68],[58,68],[74,66],[34,75],[50,77],[66,75],[42,83],[58,83],
];

function Lily({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale(-1,1) translate(-60,0)" : undefined;
  return (
    <svg viewBox="0 0 60 90" className={`absolute bottom-0 w-[22%] ${side === "left" ? "left-0" : "right-0"}`} aria-hidden>
      <g transform={flip}>
        <motion.path d="M30 90 Q28 60 40 30" stroke="var(--sage)" strokeWidth="1.6" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
        <motion.path d="M29 70 Q14 60 12 48 Q24 54 29 66Z" fill="var(--sage)" opacity={0.8}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} style={{ transformOrigin: "29px 68px" }} />
        <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "40px 30px" }}>
          {[0, 72, 144, 216, 288].map((r) => (
            <path key={r} d="M40 30 Q35 18 40 6 Q45 18 40 30Z" fill="var(--blush)" stroke="var(--rose)" strokeWidth="0.4" opacity={0.92} transform={`rotate(${r} 40 30)`} />
          ))}
          {[-30, 0, 30].map((r) => (
            <line key={r} x1="40" y1="30" x2="40" y2="20" stroke="var(--champagne)" strokeWidth="0.6" transform={`rotate(${r} 40 30)`} />
          ))}
          <circle cx="40" cy="30" r="1.6" fill="var(--champagne)" />
        </motion.g>
      </g>
    </svg>
  );
}

function WordHeart() {
  const words = CONFIG.letter.heartWords;
  return (
    <div className="relative mx-auto mb-16 w-full max-w-md">
      <svg viewBox="0 0 100 100" className="w-full drop-shadow-[0_0_30px_var(--rose)]">
        <defs><clipPath id="heart-clip"><path d={HEART_PATH} /></clipPath></defs>
        <motion.path d={HEART_PATH} fill="color-mix(in oklab, var(--rose) 12%, transparent)" stroke="var(--rose)" strokeWidth="0.7"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
        <g clipPath="url(#heart-clip)">
          {words.map((w, i) => {
            const pt = SPOTS[i % SPOTS.length]!;
            return (
              <motion.text key={w + i} x={pt[0]} y={pt[1]} textAnchor="middle" dominantBaseline="middle"
                fontSize={w.length > 7 ? 3.4 : 4.2} fill={i % 3 === 0 ? "var(--champagne)" : "var(--rose)"}
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.13, duration: 0.6 }}>
                {w}
              </motion.text>
            );
          })}
          <motion.text x="50" y="59" textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill="var(--blush)"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.4 + words.length * 0.13, duration: 1 }}>
            {CONFIG.letter.heartName} ❤
          </motion.text>
        </g>
      </svg>
      <Lily side="left" />
      <Lily side="right" />
    </div>
  );
}

export function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <Chapter id="letter" index="09" eyebrow="A letter" title={CONFIG.letter.teaser}>
      <div className="relative mx-auto max-w-xl">
        <WordHeart />
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative mx-auto block aspect-[3/2] w-full max-w-md"
            aria-label="Open the letter"
          >
            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(150deg,var(--burgundy),var(--plum))] shadow-[var(--shadow-cinematic)]" />
            <div
              className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-lg border-b border-border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--rose)_35%,var(--plum)),var(--plum))] transition-transform duration-700 group-hover:[transform:rotateX(20deg)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose/80 text-lg text-blush shadow-[0_0_40px_var(--rose)]">
              ❤
            </span>
            <span className="absolute -bottom-10 left-0 right-0 text-center text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              Tap to open
            </span>
          </motion.button>
        )}

        <AnimatePresence>
          {open && (
            <motion.article
              initial={{ opacity: 0, y: 90, rotateX: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-sm bg-paper px-7 py-10 text-paper-foreground shadow-[var(--shadow-cinematic)] sm:px-12 sm:py-14"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, color-mix(in oklab, var(--paper-foreground) 5%, transparent) 0 1px, transparent 1px 34px)",
              }}
            >
              <p className="font-display text-3xl">{CONFIG.letter.greeting}</p>
              <div className="mt-6 space-y-5">
                {CONFIG.letter.body.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.7 + i * 0.5 }}
                    className="font-display text-lg leading-8"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <p className="mt-10 text-right font-display text-xl">{CONFIG.letter.signature}</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-paper-foreground/60 transition-opacity hover:opacity-100"
              >
                Fold it back
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
