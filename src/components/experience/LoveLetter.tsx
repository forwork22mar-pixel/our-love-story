import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

export function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <Chapter id="letter" index="09" eyebrow="A letter" title={CONFIG.letter.teaser}>
      <div className="relative mx-auto max-w-xl">
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
