import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CONFIG } from "@/config/experience";
import { GlowButton } from "./ui";

export function OneLastThing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      id="last"
      data-chapter="last"
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center"
    >
      {CONFIG.final.build.map((line, i) => (
        <motion.p
          key={i}
          className={
            i === CONFIG.final.build.length - 1
              ? "display text-4xl text-gradient-rose sm:text-6xl"
              : "font-display text-2xl text-muted-foreground sm:text-3xl"
          }
          initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.6, delay: 0.4 + i * 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
        </motion.p>
      ))}
    </section>
  );
}

export function FinalReveal({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const lines = [CONFIG.final.line1, CONFIG.final.line2, CONFIG.final.line3, CONFIG.final.line4];

  return (
    <section
      ref={ref}
      id="final"
      data-chapter="final"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.span
        className="mb-12 block text-5xl text-rose"
        style={{ filter: "drop-shadow(0 0 50px var(--rose))" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ❤
      </motion.span>

      <div className="max-w-2xl space-y-7">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            className={
              i === 0
                ? "display text-4xl leading-tight text-blush sm:text-6xl"
                : "text-sm leading-loose text-muted-foreground sm:text-lg"
            }
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.6, delay: 0.3 + i * 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {l}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 6 }}
        className="mt-16"
      >
        <GlowButton onClick={onReplay}>{CONFIG.final.replay} ↻</GlowButton>
      </motion.div>
    </section>
  );
}
