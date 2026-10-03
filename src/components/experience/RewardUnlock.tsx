import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter, GlowButton } from "./ui";

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
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-primary/30"
                animate={
                  ready
                    ? {
                        boxShadow: [
                          "0 0 0px var(--rose)",
                          "0 0 60px var(--rose)",
                          "0 0 0px var(--rose)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                <span className="text-3xl text-primary">
                  {ready ? "🗝" : "🔒"}
                </span>
              </motion.div>

              <p className="eyebrow mt-8">
                {ready ? "Ready" : CONFIG.reward.lockedTitle}
              </p>

              <h2 className="display mt-4 text-3xl sm:text-4xl">
                {CONFIG.reward.lockedNote}
              </h2>

              <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left">
                {requirements.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className={
                        r.done
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      }
                    >
                      {r.done ? "✦" : "○"}
                    </span>

                    <span className={r.done ? "text-blush" : undefined}>
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                {ready ? (
                  <GlowButton onClick={() => setUnlocked(true)}>
                    Unlock it
                  </GlowButton>
                ) : (
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">
                    Keep exploring…
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{
                opacity: 0,
                scale: 0.9,
                filter: "blur(24px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <motion.span
                className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, var(--champagne), transparent 65%)",
                }}
                initial={{ opacity: 0.8, scale: 0.2 }}
                animate={{ opacity: 0, scale: 9 }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <p className="eyebrow text-champagne">
                {CONFIG.reward.unlockedTitle}
              </p>

              {/* TWO REWARD IMAGES */}
              {CONFIG.reward.images?.length > 0 && (
                <div className="mb-10 mt-8 rounded-3xl border border-white/10 bg-black/30 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {CONFIG.reward.images.map((src, index) => (
                      <motion.div
                        key={src}
                        initial={{
                          opacity: 0,
                          y: 20,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group relative overflow-hidden rounded-2xl"
                      >
                        <img
                          src={src}
                          alt={`Our reward memory ${index + 1}`}
                          className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Cinematic overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />

                        {/* Shine effect */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                {CONFIG.reward.couponBody}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-dashed border-border pt-6">
                <span className="eyebrow text-[0.55rem]">
                  Redeem code
                </span>

                <span className="font-display text-xl text-champagne">
                  {CONFIG.reward.couponCode}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
