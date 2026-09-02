import { motion, type Variants } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Chapter({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  full = false,
}: {
  id: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      data-chapter={id}
      className={cn(
        "relative w-full px-5 py-28 sm:px-8 md:py-40",
        full && "flex min-h-screen flex-col justify-center",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <Reveal className="mb-12 md:mb-20">
            {eyebrow && (
              <p className="eyebrow mb-5 flex items-center gap-3">
                {index && <span className="text-primary/70">{index}</span>}
                <span className="h-px w-10 bg-border" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="display text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {subtitle}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function SmartImage({
  src,
  alt,
  className,
  label = "[PHOTO]",
}: {
  src?: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-[linear-gradient(140deg,var(--plum),var(--burgundy))]",
          className,
        )}
        aria-label={alt}
      >
        <span className="eyebrow text-[0.6rem] text-blush/60">{label}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

export function GlowButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-xs uppercase tracking-[0.28em] text-blush transition-all duration-700",
        "hover:border-primary/80 hover:bg-primary/20 hover:shadow-[0_0_60px_-12px_var(--rose)]",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--blush)_25%,transparent),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
    </button>
  );
}

export function Divider() {
  return (
    <div className="mx-auto my-4 h-px w-24 bg-[linear-gradient(90deg,transparent,var(--rose),transparent)] opacity-60" />
  );
}
