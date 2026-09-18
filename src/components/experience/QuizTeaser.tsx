import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

export function QuizTeaser({ done }: { done?: boolean }) {
  return (
    <Chapter id="quiz" index="07" eyebrow="The quiz" title={CONFIG.quiz.title}>
      <div className="mx-auto max-w-2xl">
        <Link to="/quiz" className="block">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-10 text-center shadow-[var(--shadow-cinematic)] transition-all duration-700 hover:border-primary/60 sm:p-14"
          >
            <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--champagne)_22%,transparent),transparent_70%)]" />
            <motion.div
              aria-hidden
              animate={{ opacity: [0.5, 1, 0.55], scale: [1, 1.12, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gradient-rose)] blur-3xl opacity-40"
            />
            <p className="eyebrow relative z-10">Candlelit · just the two of us</p>
            <h3 className="display relative z-10 mt-5 text-3xl leading-snug text-blush sm:text-4xl">
              {done ? "Want to play again?" : "How well do you know us?"}
            </h3>
            <p className="relative z-10 mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Step into a quieter room. A few questions, a little teasing, and one answer I already know you remember.
            </p>
            <span className="relative z-10 mt-9 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-blush transition-all duration-700 group-hover:border-primary/80 group-hover:bg-primary/20 group-hover:shadow-[0_0_60px_-12px_var(--rose)]">
              {done ? "Replay the quiz" : "Enter the quiz"} <span aria-hidden>→</span>
            </span>
            {done && (
              <p className="relative z-10 mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-primary/80">Completed ✓</p>
            )}
          </motion.div>
        </Link>
      </div>
    </Chapter>
  );
}
