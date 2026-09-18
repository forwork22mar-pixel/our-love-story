import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback } from "react";
import { Atmosphere } from "@/components/experience/Atmosphere";
import { Quiz } from "@/components/experience/Quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Our Little Quiz — A Birthday Experience" },
      {
        name: "description",
        content: "A candlelit corner of our story: a few questions about us, and the answers only you would know.",
      },
      { property: "og:title", content: "Our Little Quiz — A Birthday Experience" },
      {
        property: "og:description",
        content: "A candlelit corner of our story: a few questions about us, and the answers only you would know.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const onComplete = useCallback((score: number, total: number) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("quizDone", "1");
      window.sessionStorage.setItem("quizScore", `${score}/${total}`);
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Atmosphere intensity={0.5} />

      {/* candlelit warmth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 [background:radial-gradient(70%_50%_at_50%_0%,color-mix(in_oklab,var(--champagne)_16%,transparent),transparent_70%),radial-gradient(60%_50%_at_20%_100%,color-mix(in_oklab,var(--burgundy)_45%,transparent),transparent_70%)]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed left-1/2 top-[-12rem] z-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--gradient-rose)] opacity-30 blur-[120px]"
      />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-6xl px-5 pt-10 sm:px-8">
          <Link
            to="/"
            className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-blush"
          >
            ← Back to our story
          </Link>
        </div>

        <Quiz onComplete={onComplete} />

        <div className="flex justify-center pb-24">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-blush transition-all duration-700 hover:border-primary/80 hover:bg-primary/20 hover:shadow-[0_0_60px_-12px_var(--rose)]"
          >
            Return to our story
          </Link>
        </div>
      </div>
    </main>
  );
}
