import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { HiddenSurprise } from "@/config/experience";
import { SmartImage } from "./ui";

/** A small glowing star hidden inside a chapter. Clicking reveals a secret. */
export function HiddenStar({
  surprise,
  className,
  onFound,
}: {
  surprise: HiddenSurprise;
  className?: string;
  onFound?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);

  const click = () => {
    setOpen(true);
    if (!found) {
      setFound(true);
      onFound?.();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={click}
        aria-label="A hidden surprise"
        className={className}
        style={{ position: "absolute" }}
      >
        <motion.span
          className="block text-base text-champagne"
          style={{ filter: "drop-shadow(0 0 12px var(--champagne))" }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_90%,transparent)] p-5 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(18px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass w-full max-w-md rounded-2xl p-8 text-center shadow-[var(--shadow-cinematic)]"
            >
              <p className="eyebrow text-champagne">You found one.</p>
              <h3 className="display mt-4 text-3xl text-blush">{surprise.label}</h3>

              {surprise.image && (
                <div className="mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-border">
                  <SmartImage src={surprise.image} alt={surprise.label} />
                </div>
              )}
              {surprise.video && (
                <video src={surprise.video} controls playsInline className="mt-6 w-full rounded-xl border border-border" />
              )}
              {surprise.audio && <audio src={surprise.audio} controls className="mt-6 w-full" />}

              <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{surprise.message}</p>

              <button
                onClick={() => setOpen(false)}
                className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-blush"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
