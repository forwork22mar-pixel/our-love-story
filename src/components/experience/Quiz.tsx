import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter, GlowButton, SmartImage } from "./ui";
import { cn } from "@/lib/utils";

export function Quiz({ onComplete }: { onComplete?: (score: number, total: number) => void }) {
  const questions = CONFIG.quiz.questions;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const total = questions.length;

  const choose = (i: number) => {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    const finalScore = score;
    if (index + 1 >= total) {
      setDone(true);
      onComplete?.(finalScore, total);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const verdict =
    score === total ? CONFIG.quiz.resultPerfect : score >= Math.ceil(total * 0.7) ? CONFIG.quiz.resultGood : CONFIG.quiz.resultLow;

  return (
    <Chapter id="quiz" index="07" eyebrow="The quiz" title={CONFIG.quiz.title}>
      <div className="glass relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-cinematic)] sm:p-10">
        <AnimatePresence mode="wait">
          {!done && q ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="eyebrow text-[0.58rem]">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-border">
                  <motion.div
                    className="h-px bg-[var(--gradient-rose)]"
                    animate={{ width: `${((index + 1) / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              <h3 className="display text-2xl leading-snug text-blush sm:text-3xl">{q.question}</h3>

              {q.image && (
                <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-border">
                  <SmartImage src={q.image} alt="question" />
                </div>
              )}

              <div className="mt-7 space-y-3">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answerIndex;
                  const revealed = picked !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={cn(
                        "w-full rounded-xl border border-border px-5 py-4 text-left text-sm transition-all duration-500",
                        !revealed && "hover:border-primary/60 hover:bg-primary/10",
                        revealed && isAnswer && "border-primary/70 bg-primary/15 text-blush",
                        revealed && !isAnswer && picked === i && "border-border bg-muted/40 text-muted-foreground",
                        revealed && !isAnswer && picked !== i && "opacity-40",
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-7 flex flex-col items-center gap-5 text-center"
                  >
                    <p className="font-display text-xl text-blush">
                      {picked === q.answerIndex ? CONFIG.quiz.correct : CONFIG.quiz.wrong}
                    </p>
                    {q.afterNote && <p className="text-xs text-muted-foreground">{q.afterNote}</p>}
                    <GlowButton onClick={next}>{index + 1 >= total ? "See the result" : "Next"}</GlowButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 text-center"
            >
              <p className="eyebrow">Your score</p>
              <p className="display mt-4 text-6xl text-gradient-rose sm:text-7xl">
                {score} / {total}
              </p>
              <p className="mt-6 font-display text-2xl text-blush">{verdict}</p>
              <button
                onClick={restart}
                className="mt-8 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-blush"
              >
                Try again ↻
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
