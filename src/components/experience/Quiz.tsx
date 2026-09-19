import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter, SmartImage } from "./ui";
import { cn } from "@/lib/utils";

type Petal = {
  id: number;
  x: number;
  y: number;
  drift: number;
  fall: number;
  rotate: number;
  delay: number;
  scale: number;
};

function FloralSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden>
      <motion.path
        d="M8 214C65 178 74 119 111 84C137 60 165 46 211 39"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {[
        { cx: 54, cy: 168, r: -28 },
        { cx: 80, cy: 130, r: 25 },
        { cx: 112, cy: 84, r: -20 },
        { cx: 153, cy: 56, r: 28 },
        { cx: 198, cy: 41, r: -18 },
      ].map((leaf, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px` }}
          initial={{ scale: 0, rotate: leaf.r }}
          animate={{ scale: 1, rotate: leaf.r }}
          transition={{ delay: 0.45 + i * 0.22, duration: 0.8, type: "spring" }}
        >
          <ellipse cx={leaf.cx} cy={leaf.cy} rx="8" ry="20" fill="currentColor" opacity="0.34" />
        </motion.g>
      ))}
      {[{ x: 109, y: 77 }, { x: 171, y: 49 }, { x: 210, y: 38 }].map((flower, i) => (
        <motion.g
          key={`flower-${i}`}
          transform={`translate(${flower.x} ${flower.y})`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2 + i * 0.28, duration: 0.9, type: "spring" }}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse key={angle} ry="11" rx="5" cy="-9" fill="currentColor" transform={`rotate(${angle})`} />
          ))}
          <circle r="3.5" className="fill-accent" />
        </motion.g>
      ))}
    </svg>
  );
}

export function Quiz({ onComplete }: { onComplete?: (score: number, total: number) => void }) {
  const questions = CONFIG.quiz.questions;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [burstId, setBurstId] = useState(0);

  const q = questions[index];
  const total = questions.length;

  const showerPetals = useCallback((x: number, y: number) => {
    const stamp = Date.now();
    const nextPetals = Array.from({ length: 16 }, (_, i) => ({
      id: stamp + i,
      x,
      y,
      drift: ((i % 5) - 2) * 28 + (i % 2 ? 18 : -14),
      fall: 110 + (i % 4) * 26,
      rotate: (i % 2 ? 1 : -1) * (90 + i * 23),
      delay: (i % 4) * 0.04,
      scale: 0.65 + (i % 3) * 0.18,
    }));
    setPetals((current) => [...current.slice(-24), ...nextPetals]);
    setBurstId((value) => value + 1);
    window.setTimeout(() => {
      setPetals((current) => current.filter((petal) => petal.id < stamp || petal.id >= stamp + 16));
    }, 2200);
  }, []);

  const choose = (i: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
    showerPetals(event.clientX, event.clientY);
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
      <AnimatePresence>
        {petals.map((petal, i) => (
          <motion.span
            key={petal.id}
            aria-hidden
            className={cn(
              "pointer-events-none fixed z-50 block h-3 w-2 rounded-[70%_30%_65%_35%]",
              i % 3 === 0 ? "bg-champagne" : i % 2 === 0 ? "bg-blush" : "bg-primary",
            )}
            style={{ left: petal.x, top: petal.y }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: petal.scale }}
            animate={{ opacity: [0, 0.9, 0.75, 0], x: petal.drift, y: petal.fall, rotate: petal.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.75, delay: petal.delay, ease: [0.2, 0.7, 0.25, 1] }}
          />
        ))}
      </AnimatePresence>

      <div className="relative mx-auto max-w-3xl px-1 py-8 sm:px-8 sm:py-12">
        <motion.button
          type="button"
          aria-label="Release flower petals"
          onClick={(event) => showerPetals(event.clientX, event.clientY)}
          className="absolute -left-8 -top-14 z-20 h-48 w-48 cursor-pointer text-primary/60 transition-colors hover:text-primary sm:-left-24 sm:-top-20 sm:h-64 sm:w-64"
          whileHover={{ scale: 1.05, rotate: -3 }}
          whileTap={{ scale: 0.96 }}
        >
          <FloralSprig className="h-full w-full" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Release flower petals"
          onClick={(event) => showerPetals(event.clientX, event.clientY)}
          className="absolute -bottom-16 -right-8 z-20 h-52 w-52 rotate-180 cursor-pointer text-primary/50 transition-colors hover:text-primary sm:-bottom-24 sm:-right-24 sm:h-72 sm:w-72"
          whileHover={{ scale: 1.05, rotate: 174 }}
          whileTap={{ scale: 0.96 }}
        >
          <FloralSprig className="h-full w-full" />
        </motion.button>

        <div className="absolute inset-6 rotate-2 border border-primary/15 bg-muted/35 shadow-[var(--shadow-cinematic)] sm:inset-10" />
        <motion.div
          animate={{ rotate: picked === null ? -1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="quiz-letter relative z-10 min-h-[32rem] overflow-hidden border-l-4 border-primary/25 bg-paper px-6 py-9 text-paper-foreground shadow-[var(--shadow-cinematic)] sm:min-h-[38rem] sm:px-12 sm:py-12"
        >
          <div aria-hidden className="absolute right-6 top-5 font-hand text-2xl text-primary/35">❤</div>
        <AnimatePresence mode="wait">
          {!done && q ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="font-sans text-[0.58rem] uppercase tracking-[0.3em] text-paper-foreground/50">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-paper-foreground/15">
                  <motion.div
                    className="h-px bg-[var(--gradient-rose)]"
                    animate={{ width: `${((index + 1) / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              <h3 className="font-hand text-3xl leading-snug text-paper-foreground sm:text-4xl">{q.question}</h3>

              {q.image && (
                <div className="mt-6 aspect-[16/9] overflow-hidden rounded-sm border border-paper-foreground/15 p-2 shadow-md">
                  <SmartImage src={q.image} alt="question" />
                </div>
              )}

              <div className="mt-9 space-y-3">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answerIndex;
                  const revealed = picked !== null;
                  return (
                    <button
                      key={i}
                      onClick={(event) => choose(i, event)}
                      disabled={revealed}
                      className={cn(
                        "group flex w-full items-center gap-4 border-b border-paper-foreground/10 px-2 py-3 text-left font-hand text-xl transition-all duration-500 sm:text-2xl",
                        !revealed && "hover:border-primary/45 hover:text-primary",
                        revealed && isAnswer && "border-primary/50 text-primary",
                        revealed && !isAnswer && picked === i && "text-paper-foreground/45",
                        revealed && !isAnswer && picked !== i && "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-paper-foreground/25 font-sans text-[0.58rem]",
                          revealed && isAnswer && "border-primary bg-primary text-primary-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
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
                    className="relative mt-8 flex flex-col items-center gap-4 border border-primary/20 bg-primary/5 px-5 py-5 text-center shadow-sm"
                  >
                    <span aria-hidden className="absolute -top-3 left-5 bg-paper px-2 text-primary">✿</span>
                    <p className="font-hand text-2xl text-primary">
                      {picked === q.answerIndex ? CONFIG.quiz.correct : CONFIG.quiz.wrong}
                    </p>
                    {q.afterNote && <p className="font-hand text-xl text-paper-foreground/65">{q.afterNote}</p>}
                    <button
                      type="button"
                      onClick={next}
                      className="mt-1 font-display text-sm italic text-primary underline decoration-primary/30 underline-offset-8 transition-colors hover:text-paper-foreground"
                    >
                      {index + 1 >= total ? "Open the final note →" : "Turn the page →"}
                    </button>
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
              className="flex min-h-[27rem] flex-col items-center justify-center py-6 text-center sm:min-h-[33rem]"
            >
              <motion.div
                key={burstId}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1.1 }}
                className="mb-5 text-4xl text-primary"
                aria-hidden
              >
                ❀
              </motion.div>
              <p className="font-sans text-[0.62rem] uppercase tracking-[0.32em] text-paper-foreground/50">Your score</p>
              <p className="font-hand mt-3 text-7xl text-primary sm:text-8xl">
                {score} / {total}
              </p>
              <p className="mt-6 max-w-md font-hand text-3xl leading-snug text-paper-foreground">{verdict}</p>
              <button
                onClick={restart}
                className="mt-9 font-display text-sm italic text-primary underline decoration-primary/30 underline-offset-8 transition-colors hover:text-paper-foreground"
              >
                Read the questions again ↻
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </div>
    </Chapter>
  );
}
