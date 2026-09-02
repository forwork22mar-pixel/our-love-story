import { motion, useInView } from "motion/react";
import { useMemo, useRef } from "react";
import { CONFIG } from "@/config/experience";

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 12) * 0.14,
        dur: 3.6 + ((i * 13) % 20) / 10,
        rot: (i * 47) % 360,
        hue: i % 3,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute top-[-6%] block h-3 w-[3px] rounded-full"
          style={{
            left: `${b.left}%`,
            background: b.hue === 0 ? "var(--rose)" : b.hue === 1 ? "var(--champagne)" : "var(--blush)",
            opacity: 0.75,
          }}
          initial={{ y: "-10vh", rotate: b.rot, opacity: 0 }}
          animate={{ y: "115vh", rotate: b.rot + 320, opacity: [0, 0.85, 0] }}
          transition={{ duration: b.dur, delay: 4.6 + b.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export function BirthdayReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const line = (text: string, delay: number, cls: string) => (
    <motion.p
      className={cls}
      initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.p>
  );

  return (
    <section
      id="birthday"
      data-chapter="birthday"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
    >
      <motion.div
        className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, var(--burgundy), transparent 68%)" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 0.75, scale: 1 } : {}}
        transition={{ duration: 3.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 max-w-3xl">
        {line("Today isn't just another day.", 0.4, "text-lg text-muted-foreground sm:text-2xl")}
        {line("It's your day.", 2.4, "display mt-8 text-3xl text-blush sm:text-5xl")}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 2.4, delay: 4.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <motion.span
            className="mx-auto mb-8 block text-4xl text-rose"
            animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 28px var(--rose))" }}
          >
            ❤
          </motion.span>
          <h2 className="display text-balance text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
            <span className="text-gradient-rose">{CONFIG.reveal.line3}</span>
          </h2>
        </motion.div>
      </div>

      {inView && <Confetti />}
    </section>
  );
}
