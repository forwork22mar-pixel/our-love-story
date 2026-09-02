import { motion } from "motion/react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

export function VideoGallery() {
  return (
    <Chapter
      id="videos"
      index="08"
      eyebrow="Our videos"
      title="The moments I wish I could pause."
      subtitle="Sound is off until you press play."
    >
      <div className="space-y-16">
        {CONFIG.videos.map((v, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <p className="eyebrow mb-4">{v.title}</p>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-cinematic)]">
              <video
                src={v.src}
                poster={v.poster || undefined}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-[linear-gradient(140deg,var(--plum),var(--ink))] object-cover"
              />
            </div>
            {v.caption && (
              <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.caption}</figcaption>
            )}
            <span className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,var(--rose)_18%,transparent),transparent_70%)] blur-2xl" />
          </motion.figure>
        ))}
      </div>
    </Chapter>
  );
}
