import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { CONFIG } from "@/config/experience";
import { Atmosphere } from "@/components/experience/Atmosphere";
import { Opening } from "@/components/experience/Opening";
import { BirthdayReveal } from "@/components/experience/BirthdayReveal";
import { PhotoGallery } from "@/components/experience/PhotoGallery";
import { MemoryMap } from "@/components/experience/MemoryMap";
import { FirstMoments } from "@/components/experience/FirstMoments";
import { SongNotes } from "@/components/experience/SongNotes";
import { QuizTeaser } from "@/components/experience/QuizTeaser";
import { VideoGallery } from "@/components/experience/VideoGallery";
import { LoveLetter } from "@/components/experience/LoveLetter";
import { HiddenStar } from "@/components/experience/HiddenStar";
import { VoiceNote } from "@/components/experience/VoiceNote";
import { OneLastThing, FinalReveal } from "@/components/experience/FinalReveal";
import { RewardUnlock } from "@/components/experience/RewardUnlock";
import { MusicPlayer } from "@/components/experience/MusicPlayer";
import { Chapter, Divider, Reveal } from "@/components/experience/ui";
import bouquetSketch from "@/assets/bouquet-sketch.jpg";

import whyBirthdayPaper from "@/assets/why-birthday-paper.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Love Story — A Birthday Experience" },
      {
        name: "description",
        content:
          "A private, cinematic birthday experience: memories, photos, letters and a hidden surprise, made for one person only.",
      },
      { property: "og:title", content: "Our Love Story — A Birthday Experience" },
      {
        property: "og:description",
        content:
          "A private, cinematic birthday experience: memories, photos, letters and a hidden surprise, made for one person only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

function Sunflower({ size }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 140" width={size ?? "100%"} height={size ? size * 1.4 : undefined} aria-hidden>
      <path d="M52 62 Q60 100 48 140" stroke="var(--sage)" strokeWidth="3" fill="none" />
      <path d="M54 95 Q75 85 80 100 Q65 106 54 95Z" fill="var(--sage)" />
      <path d="M50 115 Q28 105 22 118 Q38 124 50 115Z" fill="var(--sage)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="22" rx="7" ry="18"
          fill={i % 2 ? "var(--marigold)" : "var(--champagne)"}
          transform={`rotate(${(i * 360) / 14} 50 45)`} />
      ))}
      <circle cx="50" cy="45" r="15" fill="oklch(0.3 0.06 40)" />
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={50 + Math.cos(i * 2.4) * (i * 0.7)} cy={45 + Math.sin(i * 2.4) * (i * 0.7)} r="1.1" fill="var(--marigold)" opacity="0.7" />
      ))}
    </svg>
  );
}

function WhyIMadeThis() {
  const [bursts, setBursts] = useState<number[]>([]);
  const pluck = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 3500);
  };
  return (
    <Chapter id="why" index="01" eyebrow="Before anything else" title={CONFIG.why.title}>
      <div className="mx-auto max-w-2xl" style={{ perspective: 1200 }}>
        <motion.div
          initial={{ rotateX: -55, opacity: 0, y: 40 }}
          whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformOrigin: "top center" }}
          className="why-birthday-note relative px-9 pb-20 pt-12 sm:px-16 sm:pb-24 sm:pt-16"
        >
          <img src={whyBirthdayPaper} alt="" aria-hidden loading="lazy" width={1024} height={1536} className="pointer-events-none absolute inset-0 h-full w-full" />
          <div className="relative">
            <p className="why-birthday-heading">HAPPY<span>Birthday</span></p>

          <Button
            type="button"
            variant="ghost"
            onClick={pluck}
            aria-label="Pluck the sunflower"
            title="A little sunflower for you"
            className="why-note-flower absolute -bottom-16 -left-7 h-auto p-0 sm:-left-12 [&_svg]:size-auto"
          >
            <motion.div whileTap={{ scale: 0.92 }} className="animate-sway">
              <div className="w-[55px] sm:w-[75px]"><Sunflower /></div>
            </motion.div>
            {bursts.map((id) =>
              Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={`${id}-${i}`}
                  className="pointer-events-none absolute left-1/2 top-1/4 h-3 w-2 rounded-full"
                  style={{
                    background: i % 2 ? "var(--marigold)" : "var(--champagne)",
                    ["--dx" as string]: `${(i - 4) * 22}px`,
                    animation: `petalFall ${2 + (i % 4) * 0.4}s ease-in forwards`,
                  }}
                />
              )),
            )}
          </Button>

          <p className="why-note-salutation font-hand">
            a little note, just for you ♡
          </p>
          <div className="why-note-copy mt-6 space-y-6">
            {CONFIG.why.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.5, duration: 0.8 }}
                className="font-hand"
              >
                {p}
              </motion.p>
            ))}
          </div>
          <p className="why-note-signature font-hand mt-8 text-right">
            — always yours ❤️
          </p>
          </div>
        </motion.div>
        <div className="mt-14"><Divider /></div>
      </div>
    </Chapter>
  );
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [openedMemories, setOpenedMemories] = useState<string[]>([]);
  const [foundSecrets, setFoundSecrets] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("quizDone") === "1") {
      setQuizDone(true);
      setEntered(true);
    }
  }, []);

  const onOpenMemory = useCallback((id: string) => {
    setOpenedMemories((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const replay = useCallback(() => {
    setEntered(false);
    setQuizDone(false);
    setOpenedMemories([]);
    setFoundSecrets(0);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("quizDone");
      window.sessionStorage.removeItem("quizScore");
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const hidden = CONFIG.hidden;

  const requirements = [
    { label: "Explore the memory map", done: openedMemories.length >= 3 },
    { label: "Finish our little quiz", done: quizDone },
    { label: "Find the hidden surprises", done: foundSecrets >= Math.min(2, hidden.length) },
  ];

  if (!entered) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <Atmosphere intensity={0.7} />
        <Opening onEnter={() => setEntered(true)} />
      </main>
    );
  }

  return (
    <main className="relative w-full overflow-x-hidden">
      <Atmosphere />
      <MusicPlayer started={entered} />

      <h1 className="sr-only">{CONFIG.birthdayMessage}</h1>

      <WhyIMadeThis />
      <BirthdayReveal />

      <div className="relative">
        <PhotoGallery />
        {hidden[0] && (
          <HiddenStar
            surprise={hidden[0]}
            className="absolute right-6 top-16 sm:right-12"
            onFound={() => setFoundSecrets((n) => n + 1)}
          />
        )}
      </div>

      <div className="relative">
        <MemoryMap onOpenMemory={onOpenMemory} />
        {hidden[1] && (
          <HiddenStar
            surprise={hidden[1]}
            className="absolute left-6 top-24 sm:left-14"
            onFound={() => setFoundSecrets((n) => n + 1)}
          />
        )}
      </div>

      <FirstMoments />
      <SongNotes />

      <QuizTeaser done={quizDone} />

      <div className="relative">
        <VideoGallery />
        {hidden[2] && (
          <HiddenStar
            surprise={hidden[2]}
            className="absolute right-8 bottom-24 sm:right-16"
            onFound={() => setFoundSecrets((n) => n + 1)}
          />
        )}
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow text-center">a few flowers for you</p>
          <h2 className="display mt-3 text-center text-4xl sm:text-5xl">Every bloom, for you</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-center">
          {[
  bouquetSketch,
  "/images/bouquet-neon.png",
  "/images/bouquet-photo.png",
].map((src, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <img
                src={src}
                alt="A bouquet of flowers"
                loading="lazy"
                className={`mx-auto w-full max-w-xs object-cover transition-transform duration-700 hover:scale-105 ${i === 1 ? "sm:-translate-y-6" : ""}`}
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 50%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 75%)",
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="relative">
        <LoveLetter />
        {hidden[3] && (
          <HiddenStar
            surprise={hidden[3]}
            className="absolute left-8 bottom-20 sm:left-16"
            onFound={() => setFoundSecrets((n) => n + 1)}
          />
        )}
      </div>

      <VoiceNote />    

      <OneLastThing />
      <FinalReveal onReplay={replay} />

      <RewardUnlock requirements={requirements} />
    </main>
  );
}
