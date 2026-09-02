import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { GlowButton } from "./ui";

export function Opening({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    setLeaving(true);
    window.setTimeout(onEnter, 1400);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="opening"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 -z-10"
          animate={leaving ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, color-mix(in oklab, var(--burgundy) 60%, transparent), transparent 70%)",
          }}
        />

        <div className="text-center">
          <motion.h1
            className="display text-6xl leading-none sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, filter: "blur(24px)", scale: 1.08 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <span className="text-gradient-rose">{CONFIG.opening.line1}</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-10 max-w-md whitespace-pre-line text-sm leading-loose tracking-wide text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
          >
            {CONFIG.opening.line2}
          </motion.p>

          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 4.4 }}
          >
            <GlowButton onClick={enter}>{CONFIG.opening.button} →</GlowButton>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, var(--blush), transparent 65%)" }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={leaving ? { opacity: [0.6, 0], scale: 14 } : { opacity: 0, scale: 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
