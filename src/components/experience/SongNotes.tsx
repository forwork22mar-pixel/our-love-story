import { motion } from "motion/react";
import { useRef, useState } from "react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

export function SongNotes() {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});

  const toggle = (i: number) => {
    const el = audioRefs.current[i];
    if (!el) return;
    if (playing === i) {
      el.pause();
      setPlaying(null);
      return;
    }
    Object.values(audioRefs.current).forEach((a) => a?.pause());
    void el.play().catch(() => undefined);
    setPlaying(i);
  };

  return (
    <Chapter
      id="songs"
      index="06"
      eyebrow="Songs that remind me of you"
      title="A small soundtrack of us."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {CONFIG.songs.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-700 hover:shadow-[0_0_70px_-24px_var(--rose)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-blush">{s.title}</h3>
                <p className="eyebrow mt-1 text-[0.58rem]">{s.artist}</p>
              </div>
              {s.preview && (
                <button
                  onClick={() => toggle(i)}
                  aria-label={playing === i ? "Pause preview" : "Play preview"}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary/15"
                >
                  {playing === i ? "❚❚" : "▶"}
                </button>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-foreground/80">{s.note}</p>

            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-blush"
              >
                Listen →
              </a>
            )}

            {s.preview && (
              <audio
                ref={(el) => {
                  audioRefs.current[i] = el;
                }}
                src={s.preview}
                onEnded={() => setPlaying(null)}
                preload="none"
              />
            )}

            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,var(--rose),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40" />
          </motion.article>
        ))}
      </div>
    </Chapter>
  );
}
