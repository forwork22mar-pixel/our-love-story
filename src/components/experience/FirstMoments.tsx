import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter, SmartImage } from "./ui";

export function FirstMoments() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Chapter
      id="firsts"
      index="05"
      eyebrow="Our firsts"
      title="Every beginning, kept."
      subtitle="Tap a card to open the moment."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONFIG.firsts.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={f.title}
              layout
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass overflow-hidden rounded-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-baseline justify-between gap-4 p-6 text-left"
              >
                <span>
                  <span className="block font-display text-2xl text-blush">{f.title}</span>
                  <span className="eyebrow mt-2 block text-[0.58rem]">{f.date}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-primary"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 px-6 pb-6">
                      {f.image && (
                        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
                          <SmartImage src={f.image} alt={f.title} />
                        </div>
                      )}
                      {f.video && (
                        <video src={f.video} controls playsInline className="w-full rounded-xl border border-border" />
                      )}
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">{f.story}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Chapter>
  );
}
