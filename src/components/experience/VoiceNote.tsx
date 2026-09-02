import { motion } from "motion/react";
import { useRef, useState } from "react";
import { CONFIG } from "@/config/experience";
import { Reveal } from "./ui";

export function VoiceNote() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setMissing(true));
    }
  };

  const bars = Array.from({ length: 34 }, (_, i) => 0.25 + ((i * 37) % 70) / 100);

  return (
    <section id="voice" data-chapter="voice" className="relative px-5 py-28 sm:px-8 md:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Listen to this</p>
        <h2 className="display mt-5 text-3xl leading-tight sm:text-4xl">{CONFIG.voiceNote.button}</h2>

        <button
          onClick={toggle}
          className="group mx-auto mt-10 flex w-full max-w-md items-center gap-4 rounded-full border border-primary/35 bg-primary/10 px-5 py-4 transition-colors hover:border-primary/70"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose/80 text-blush shadow-[0_0_30px_var(--rose)]">
            {playing ? "❚❚" : "▶"}
          </span>
          <span className="flex h-9 flex-1 items-center gap-[3px]">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-full bg-blush/60"
                animate={playing ? { scaleY: [h, 1, h * 0.6, h] } : { scaleY: h }}
                transition={{ duration: 1.1 + (i % 5) * 0.13, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
                style={{ height: "100%", transformOrigin: "center" }}
              />
            ))}
          </span>
        </button>

        <p className="mt-5 text-xs text-muted-foreground">
          {missing ? "Add your recording at public/music/voice-note.mp3" : CONFIG.voiceNote.caption}
        </p>

        <audio
          ref={ref}
          src={CONFIG.voiceNote.src}
          preload="none"
          onEnded={() => setPlaying(false)}
          onError={() => setMissing(true)}
        />
      </Reveal>
    </section>
  );
}
