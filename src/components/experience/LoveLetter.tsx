import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter, GlowButton } from "./ui";

const WORDS = CONFIG.letter.heartWords;

// Hand-placed positions around a heart outline (percent-based, responsive),
// ordered to trace the shape as the words appear one by one.
const POINTS = [
  { left: 22, top: 28 },
  { left: 36, top: 13 },
  { left: 64, top: 13 },
  { left: 78, top: 28 },
  { left: 87, top: 48 },
  { left: 78, top: 68 },
  { left: 64, top: 79 },
  { left: 50, top: 94 },
  { left: 36, top: 88 },
  { left: 13, top: 48 },
];

const HEART_STEP = 0.35;
const EARNED_AT = 1.2 + WORDS.length * HEART_STEP;

export function LoveLetter() {
  const [stage, setStage] = useState<"why" | "heart">("why");
  const [open, setOpen] = useState(false);

  return (
    <Chapter id="letter" index="09" eyebrow="A letter" title={CONFIG.letter.whyTitle}>
      {stage === "why" && (
        <div className="mx-auto max-w-xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-lg italic text-muted-foreground"
          >
            {CONFIG.letter.whySubtitle}
          </motion.p>

          <ul className="mt-10 space-y-4">
            {CONFIG.letter.whyReasons.map((reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-lg text-blush sm:text-xl"
              >
                <span className="text-rose">✦</span> {reason}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <GlowButton onClick={() => setStage("heart")}>{CONFIG.letter.whyMore}</GlowButton>
          </motion.div>
        </div>
      )}

      {stage === "heart" && (
        <div className="mx-auto max-w-xl text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl text-rose sm:text-3xl"
          >
            {CONFIG.letter.tooEarly}
          </motion.p>

          <div className="relative mx-auto mt-4 h-64 w-full max-w-sm sm:h-80" aria-label="A heart made of words">
            {WORDS.map((word, i) => {
              const pt = POINTS[i]!;
              return (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + i * HEART_STEP, ease: [0.16, 1, 0.3, 1] }}
                  style={{ left: `${pt.left}%`, top: `${pt.top}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-blush ${
                    i === WORDS.length - 1 ? "text-sm text-rose sm:text-lg" : "text-[0.65rem] sm:text-base"
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: EARNED_AT }}
            className="font-display text-xl italic text-blush"
          >
            {CONFIG.letter.earnedIt}
          </motion.p>

          {/* ---------- Existing letter (envelope + open letter) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: EARNED_AT + 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-10"
          >
            <div className="relative mx-auto max-w-xl">
              {!open && (
                <motion.button
                  type="button"
                  onClick={() => setOpen(true)}
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
          </motion.div>
        </div>
      )}
    </Chapter>
  );
}
