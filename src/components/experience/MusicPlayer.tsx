import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/config/experience";

export function MusicPlayer({ started }: { started: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !started || !CONFIG.music.startAfterEnter) return;
    el.volume = CONFIG.music.volume;
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.volume = CONFIG.music.volume;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={ref} src={CONFIG.music.src} loop preload="none" />
      <motion.button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="glass fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full text-blush shadow-[var(--shadow-cinematic)] transition-colors hover:border-primary/60 sm:h-14 sm:w-14"
      >
        <span
          className="text-base"
          style={{ animation: playing ? "spinSlow 6s linear infinite" : undefined, display: "block" }}
        >
          ♪
        </span>
        {playing && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full border border-primary/40"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
