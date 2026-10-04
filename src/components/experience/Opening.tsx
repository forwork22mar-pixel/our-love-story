import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/config/experience";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/arti-opening-cutout.png";

export function Opening({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [hearts, setHearts] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => clearTimeout(timer.current), []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    timer.current = setTimeout(onEnter, reduceMotion ? 0 : 900);
  };

  return (
    <motion.section
      className="birthday-opening grain relative z-50 flex min-h-svh flex-col overflow-hidden"
      animate={{ opacity: leaving ? 0 : 1, y: leaving && !reduceMotion ? -30 : 0 }}
      transition={{ duration: 0.9 }}
    >
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10 sm:pt-9">
        <span className="font-hand text-2xl text-burgundy">For you, always ♡</span>
        <span className="text-[10px] uppercase text-burgundy/70">A little birthday magic</span>
      </header>

      <div className="birthday-composition relative mx-auto w-full max-w-6xl flex-1">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="birthday-heading absolute inset-x-0 top-10 text-center sm:top-9">
          <p className="mb-1 text-xs uppercase text-burgundy sm:text-sm">Happy</p>
          <h1 className="birthday-type font-display font-normal uppercase text-burgundy">Birthday</h1>
          <p className="birthday-name mt-1 font-hand text-4xl text-burgundy sm:text-5xl">my love, {CONFIG.letter.heartName} ♡</p>
        </motion.div>

        <motion.img
          src={portrait}
          alt="Arti in her beautiful yellow sari"
          fetchPriority="high"
          className="birthday-portrait absolute bottom-0 left-1/2 z-10"
          initial={reduceMotion ? false : { opacity: 0, y: 35, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 1.3, delay: 0.25 }}
        />

        <span aria-hidden="true" className="birthday-bow absolute right-[13%] top-[36%] z-20 text-burgundy">୨୧</span>
        <span aria-hidden="true" className="birthday-side-note absolute bottom-[25%] left-[4%] -rotate-12 font-hand text-2xl text-burgundy sm:left-[19%] sm:text-5xl">my favorite<br />person.</span>
        <span aria-hidden="true" className="birthday-side-note absolute bottom-[18%] right-[3%] rotate-12 font-hand text-2xl text-burgundy sm:right-[18%] sm:text-5xl">all my love<br />is yours ♡</span>
        <Button
          variant="ghost" size="icon" aria-label="Send Arti birthday hearts" title="A little love for Arti"
          className="birthday-heart absolute left-[9%] top-[38%] z-20 h-16 w-16 rounded-full text-5xl text-burgundy hover:bg-burgundy/10 sm:left-[17%]"
          onClick={() => setHearts(true)}
        >♡</Button>
        <AnimatePresence>
          {hearts && Array.from({ length: 12 }, (_, i) => (
            <motion.span key={i} aria-hidden="true" className="pointer-events-none absolute bottom-[40%] left-1/2 z-30 text-3xl text-burgundy"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: (i - 5.5) * 35, y: -100 - (i % 4) * 55, rotate: (i - 6) * 12 }}
              transition={{ duration: reduceMotion ? 0.1 : 2.2, delay: i * 0.06 }}
              onAnimationComplete={() => { if (i === 11) setHearts(false); }}
            >{i % 2 ? "♡" : "♥"}</motion.span>
          ))}
        </AnimatePresence>
      </div>

      <footer className="birthday-footer relative z-20 px-6 pb-7 pt-5 text-center sm:pb-9">
        <p className="mx-auto max-w-md whitespace-pre-line font-hand text-2xl leading-tight text-burgundy sm:text-3xl">{CONFIG.opening.line2}</p>
        <Button onClick={enter} disabled={leaving} className="mt-5 h-auto max-w-full whitespace-normal rounded-full bg-burgundy px-7 py-4 text-sm text-paper hover:bg-burgundy/90">
          {leaving ? "Just for you… ♡" : `${CONFIG.opening.button} →`}
        </Button>
        <p className="mt-4 font-hand text-xl text-burgundy/70">Made with a ridiculous amount of love.</p>
      </footer>
    </motion.section>
  );
}