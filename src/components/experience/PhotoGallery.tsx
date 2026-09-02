import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CONFIG, type Photo } from "@/config/experience";
import { Chapter, SmartImage } from "./ui";
import { cn } from "@/lib/utils";

const shapeClass: Record<NonNullable<Photo["shape"]>, string> = {
  hero: "sm:col-span-6 aspect-[16/9]",
  wide: "sm:col-span-4 aspect-[4/3]",
  tall: "sm:col-span-2 aspect-[3/4]",
  square: "sm:col-span-2 aspect-square",
};

export function PhotoGallery() {
  const photos = CONFIG.photos;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) => setOpenIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <Chapter
      id="memories"
      index="03"
      eyebrow="Our memories"
      title="Moments I kept."
      subtitle="Some of these you've seen. Some you forgot. All of them I saved."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:gap-7">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotate: `${p.tilt ?? 0}deg` }}
            className={cn(
              "group relative block w-full overflow-hidden rounded-xl border border-border text-left shadow-[var(--shadow-cinematic)] transition-all duration-700",
              "hover:z-10 hover:shadow-[0_0_70px_-18px_var(--rose)]",
              "aspect-[4/5]",
              shapeClass[p.shape ?? "square"],
              p.polaroid && "bg-paper p-2 pb-10",
            )}
          >
            <div className={cn("h-full w-full overflow-hidden", p.polaroid ? "rounded-sm" : "rounded-xl")}>
              <SmartImage
                src={p.src}
                alt={p.caption ?? "memory"}
                className="scale-100 transition-transform duration-[1400ms] ease-[var(--ease-cinematic)] group-hover:scale-[1.07]"
              />
            </div>

            {p.polaroid ? (
              <span className="absolute bottom-3 left-0 right-0 text-center font-display text-sm text-paper-foreground">
                {p.caption}
              </span>
            ) : (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-[linear-gradient(0deg,var(--ink),transparent)] p-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block font-display text-lg text-blush">{p.caption}</span>
                <span className="eyebrow text-[0.58rem]">
                  {[p.date, p.location].filter(Boolean).join(" · ")}
                </span>
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_92%,transparent)] p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.figure
              className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[62vh] w-full overflow-hidden">
                <SmartImage src={active.src} alt={active.caption ?? "memory"} className="max-h-[62vh] object-contain" />
              </div>
              <figcaption className="space-y-2 p-6">
                <p className="eyebrow">{[active.date, active.location].filter(Boolean).join(" · ")}</p>
                <p className="font-display text-2xl text-blush">{active.caption}</p>
                {active.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{active.description}</p>
                )}
              </figcaption>

              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-blush"
              >
                ✕
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Previous"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 text-blush"
              >
                ‹
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 text-blush"
              >
                ›
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}
