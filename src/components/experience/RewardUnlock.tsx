import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import foreverLoveCoupon from "@/assets/forever-love-coupon.png";
import { CONFIG } from "@/config/experience";
import { Chapter, GlowButton } from "./ui";

const COUPON_HEARTS = [
  { x: "5%", y: "14%", delay: 0.15, glyph: "♥" },
  { x: "88%", y: "8%", delay: 0.4, glyph: "♡" },
  { x: "94%", y: "58%", delay: 0.7, glyph: "♥" },
  { x: "3%", y: "72%", delay: 0.95, glyph: "♡" },
  { x: "82%", y: "88%", delay: 1.2, glyph: "♥" },
];

export function RewardUnlock({
  requirements,
}: {
  requirements: { label: string; done: boolean }[];
}) {
  const [unlocked, setUnlocked] = useState(false);
  const ready = requirements.every((r) => r.done);

  return (
    <Chapter id="reward" index="10" full className="text-center">
      <div className="mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-primary/30"
                animate={ready ? { boxShadow: ["0 0 0px var(--rose)", "0 0 60px var(--rose)", "0 0 0px var(--rose)"] } : {}}
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                <span className="text-3xl text-primary">{ready ? "🗝" : "🔒"}</span>
              </motion.div>

              <p className="eyebrow mt-8">{ready ? "Ready" : CONFIG.reward.lockedTitle}</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">{CONFIG.reward.lockedNote}</h2>

              <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left">
                {requirements.map((r) => (
                  <li key={r.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className={r.done ? "text-primary" : "text-muted-foreground/50"}>{r.done ? "✦" : "○"}</span>
                    <span className={r.done ? "text-blush" : undefined}>{r.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                {ready ? (
                  <GlowButton onClick={() => setUnlocked(true)}>Unlock it</GlowButton>
                ) : (
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">Keep exploring…</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(24px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.span
                className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, var(--champagne), transparent 65%)" }}
                initial={{ opacity: 0.8, scale: 0.2 }}
                animate={{ opacity: 0, scale: 9 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <p className="eyebrow text-champagne">{CONFIG.reward.unlockedTitle}</p>

              <div className="relative mt-8">
                {COUPON_HEARTS.map((heart) => (
                  <motion.span
                    key={`${heart.x}-${heart.y}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute z-10 font-display text-xl text-primary sm:text-2xl"
                    style={{ left: heart.x, top: heart.y }}
                    initial={{ opacity: 0, scale: 0, y: 12 }}
                    animate={{ opacity: [0, 0.9, 0.45], scale: [0, 1.15, 0.9], y: [12, -8, -18] }}
                    transition={{ duration: 2.8, delay: heart.delay, repeat: Infinity, repeatDelay: 1.4 }}
                  >
                    {heart.glyph}
                  </motion.span>
                ))}

                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-[var(--shadow-cinematic)]"
                  initial={{ rotate: -2, y: 22 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.015, rotate: 0.35 }}
                >
                  <img
                    src={foreverLoveCoupon}
                    alt="A romantic coupon for Arti promising unlimited love and unlimited kisses forever"
                    className="block aspect-[4/3] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-blush/15" />
                </motion.div>

                <div className="mx-auto mt-7 max-w-md px-4">
                  <h3 className="display text-3xl leading-snug text-blush sm:text-4xl">{CONFIG.reward.couponTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{CONFIG.reward.couponBody}</p>
                  <div className="mt-6 flex items-center justify-center gap-4 border-t border-dashed border-border pt-5">
                    <span className="eyebrow text-[0.55rem]">Made only for you</span>
                    <span aria-hidden="true" className="text-primary">♥</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
