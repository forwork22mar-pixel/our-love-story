import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { CONFIG } from "@/config/experience";
import { Atmosphere } from "@/components/experience/Atmosphere";
import { Opening } from "@/components/experience/Opening";
import { BirthdayReveal } from "@/components/experience/BirthdayReveal";
import { PhotoGallery } from "@/components/experience/PhotoGallery";
import { MemoryMap } from "@/components/experience/MemoryMap";
import { FirstMoments } from "@/components/experience/FirstMoments";
import { SongNotes } from "@/components/experience/SongNotes";
import { Quiz } from "@/components/experience/Quiz";
import { VideoGallery } from "@/components/experience/VideoGallery";
import { LoveLetter } from "@/components/experience/LoveLetter";
import { HiddenStar } from "@/components/experience/HiddenStar";
import { VoiceNote } from "@/components/experience/VoiceNote";
import { OneLastThing, FinalReveal } from "@/components/experience/FinalReveal";
import { RewardUnlock } from "@/components/experience/RewardUnlock";
import { MusicPlayer } from "@/components/experience/MusicPlayer";
import { Chapter, Divider, Reveal } from "@/components/experience/ui";

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

function WhyIMadeThis() {
  return (
    <Chapter id="why" index="01" eyebrow="Before anything else" title={CONFIG.why.title}>
      <div className="mx-auto max-w-2xl space-y-8">
        {CONFIG.why.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <p className="text-base leading-loose text-muted-foreground sm:text-lg">{p}</p>
          </Reveal>
        ))}
        <Divider />
      </div>
    </Chapter>
  );
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [openedMemories, setOpenedMemories] = useState<string[]>([]);
  const [foundSecrets, setFoundSecrets] = useState(0);

  const onOpenMemory = useCallback((id: string) => {
    setOpenedMemories((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const replay = useCallback(() => {
    setEntered(false);
    setQuizDone(false);
    setOpenedMemories([]);
    setFoundSecrets(0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
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

      <Quiz
        onComplete={() => {
          setQuizDone(true);
        }}
      />

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
