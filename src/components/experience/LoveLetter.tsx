import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { CONFIG } from "@/config/experience";
import { Chapter } from "./ui";

const HEART_PATH = "M50 32 A21 21 0 0 1 92 32 Q92 60 50 90 Q8 60 8 32 A21 21 0 0 1 50 32 Z";
// [x, y, fontSize] — measured widths, packed per row so nothing touches or clips
const SPOTS: [number, number, number][] = [
  [23,24,3.3],[37,24,3.3],[63,24,3.3],[77,24,3.3],
  [23,32.5,3.3],[40,32.5,3.3],[60,34.5,3.3],[77,32.5,3.3],
  [21,41,3.3],[39.5,41,3.3],[60.5,41,3.3],[79,41,3.1],
  [23.5,49,3.0],[41.5,49,3.0],[59.5,49,3.0],[77.5,49,2.9],
  [31,57,3.3],[51,57,2.8],[70,57,3.0],
  [30.5,64,3.0],[70.5,64,2.7],
  [40,71.5,3.1],[59,71.5,3.1],
  [44.5,77.5,2.6],[56,77.5,2.6],
  [50,82.5,2.5],
];

function Lily({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scale(-1,1) translate(-60,0)" : undefined;
  return (
    <svg viewBox="0 0 60 90" className={`absolute bottom-0 w-[22%] ${side === "left" ? "left-0" : "right-0"}`} aria-hidden>
      <g transform={flip}>
        <motion.path d="M30 90 Q28 60 40 30" stroke="var(--sage)" strokeWidth="1.6" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
        <motion.path d="M29 70 Q14 60 12 48 Q24 54 29 66Z" fill="var(--sage)" opacity={0.8}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} style={{ transformOrigin: "29px 68px" }} />
        <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "40px 30px" }}>
          {[0, 72, 144, 216, 288].map((r) => (
            <path key={r} d="M40 30 Q35 18 40 6 Q45 18 40 30Z" fill="var(--blush)" stroke="var(--rose)" strokeWidth="0.4" opacity={0.92} transform={`rotate(${r} 40 30)`} />
          ))}
          {[-30, 0, 30].map((r) => (
            <line key={r} x1="40" y1="30" x2="40" y2="20" stroke="var(--champagne)" strokeWidth="0.6" transform={`rotate(${r} 40 30)`} />
          ))}
          <circle cx="40" cy="30" r="1.6" fill="var(--champagne)" />
        </motion.g>
      </g>
    </svg>
  );
}

const FALLING_BLOOMS = [
  { left: 7, delay: 0, duration: 5.6, symbol: "❤", size: "text-lg" },
  { left: 17, delay: 1.1, duration: 6.4, symbol: "❀", size: "text-xl" },
  { left: 29, delay: 0.5, duration: 5.2, symbol: "♥", size: "text-sm" },
  { left: 42, delay: 1.8, duration: 6.8, symbol: "✿", size: "text-lg" },
  { left: 54, delay: 0.8, duration: 5.9, symbol: "❤", size: "text-xl" },
  { left: 66, delay: 2.2, duration: 6.2, symbol: "❀", size: "text-sm" },
  { left: 79, delay: 0.3, duration: 5.4, symbol: "♥", size: "text-lg" },
  { left: 91, delay: 1.5, duration: 6.6, symbol: "✿", size: "text-xl" },
];

function FallingLove({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {FALLING_BLOOMS.map((item, i) => (
        <motion.span
          key={`${item.symbol}-${i}`}
          className={`absolute -top-10 ${item.size} ${i % 2 === 0 ? "text-rose" : "text-blush"}`}
          style={{ left: `${item.left}%` }}
          initial={{ y: "-8vh", opacity: 0, rotate: -25 }}
          animate={active ? { y: "108vh", opacity: [0, 0.9, 0.9, 0], rotate: [0, 45, -35, 90], x: [0, 18, -14, 8] } : {}}
          transition={{ delay: item.delay, duration: item.duration, ease: "easeInOut" }}
        >
          {item.symbol}
        </motion.span>
      ))}
    </div>
  );
}
function Bouquet() {
  const petals = [0, 72, 144, 216, 288];
  const sunflowerPetals = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <motion.svg
      viewBox="0 0 180 112"
      className="absolute left-1/2 top-[79%] z-10 w-[72%] -translate-x-1/2 overflow-visible drop-shadow-[0_10px_18px_var(--ink)]"
      aria-label="A bouquet of lilies, sunflowers, and roses"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 3.6,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* stems */}
      <g fill="none" stroke="var(--sage)" strokeWidth="2">
        <path d="M90 106 Q70 70 39 28" />
        <path d="M90 106 Q79 59 71 21" />
        <path d="M90 106 Q101 58 111 18" />
        <path d="M90 106 Q119 72 143 31" />
        <path d="M90 106 Q90 63 91 13" />
      </g>

      {/* leaves */}
      <g fill="var(--sage)" opacity=".9">
        <path d="M78 76 Q54 66 50 51 Q72 55 82 70Z" />
        <path d="M100 79 Q124 65 131 51 Q108 55 96 71Z" />
      </g>

      {/* sunflowers */}
      {[{ x: 42, y: 29, r: -18 }, { x: 139, y: 31, r: 20 }].map(
        (flower, fi) => (
          <motion.g
            key={fi}
            style={{
              transformOrigin: `${flower.x}px ${flower.y}px`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 4 + fi * 0.25,
              duration: 0.9,
            }}
          >
            <g
              transform={`translate(${flower.x} ${flower.y}) rotate(${flower.r})`}
            >
              {sunflowerPetals.map((r) => (
                <ellipse
                  key={r}
                  cx="0"
                  cy="-11"
                  rx="4.2"
                  ry="10"
                  fill="var(--champagne)"
                  transform={`rotate(${r})`}
                />
              ))}
              <circle r="7" fill="var(--burgundy)" />
              <circle r="3.5" fill="var(--ink)" opacity=".8" />
            </g>
          </motion.g>
        ),
      )}

      {/* lilies */}
      {[{ x: 70, y: 23 }, { x: 111, y: 20 }].map((flower, fi) => (
        <motion.g
          key={fi}
          style={{
            transformOrigin: `${flower.x}px ${flower.y}px`,
          }}
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 4.25 + fi * 0.2,
            duration: 1,
          }}
        >
          {petals.map((r) => (
            <path
              key={r}
              d={`M${flower.x} ${flower.y} Q${flower.x - 7} ${
                flower.y - 15
              } ${flower.x} ${flower.y - 25} Q${flower.x + 7} ${
                flower.y - 15
              } ${flower.x} ${flower.y}Z`}
              fill="var(--blush)"
              stroke="var(--rose)"
              strokeWidth=".7"
              transform={`rotate(${r} ${flower.x} ${flower.y})`}
            />
          ))}
          <circle
            cx={flower.x}
            cy={flower.y}
            r="3"
            fill="var(--champagne)"
          />
        </motion.g>
      ))}

      {/* roses */}
      {[{ x: 91, y: 19 }, { x: 58, y: 49 }, { x: 122, y: 49 }].map(
        (rose, ri) => (
          <motion.g
            key={ri}
            style={{
              transformOrigin: `${rose.x}px ${rose.y}px`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 4.5 + ri * 0.16,
              duration: 0.8,
            }}
          >
            <circle
              cx={rose.x}
              cy={rose.y}
              r="11"
              fill="var(--rose)"
            />
            <path
              d={`M${rose.x - 7} ${rose.y} Q${rose.x} ${
                rose.y - 10
              } ${rose.x + 7} ${rose.y} Q${rose.x} ${
                rose.y + 9
              } ${rose.x - 5} ${rose.y + 2} Q${rose.x} ${
                rose.y - 5
              } ${rose.x + 4} ${rose.y + 1}`}
              fill="none"
              stroke="var(--blush)"
              strokeWidth="1.3"
            />
          </motion.g>
        ),
      )}

      {/* wrapping */}
      <path
        d="M73 91 Q90 101 107 91 L101 109 Q90 104 79 109Z"
        fill="var(--burgundy)"
      />
      <path
        d="M90 99 Q78 87 70 96 Q79 105 90 100 Q102 105 111 96 Q102 87 90 99Z"
        fill="var(--rose)"
      />
    </motion.svg>
  );
}


function WordHeart() {
  const words = CONFIG.letter.heartWords;
  const heartRef = useRef<HTMLDivElement>(null);
  const isForming = useInView(heartRef, { once: true, amount: 0.25 });
  return (
    <div ref={heartRef} className="relative mx-auto mb-28 w-full max-w-md sm:mb-32">
      <FallingLove active={isForming} />
      <svg viewBox="0 0 100 100" className="w-full drop-shadow-[0_0_30px_var(--rose)]">
        <defs><clipPath id="heart-clip"><path d={HEART_PATH} /></clipPath></defs>
        <motion.path d={HEART_PATH} fill="color-mix(in oklab, var(--rose) 12%, transparent)" stroke="var(--rose)" strokeWidth="0.7"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
        <g clipPath="url(#heart-clip)">
          {words.map((w, i) => {
            const spot = SPOTS[i]!;
            return (
              <motion.text key={w + i} x={spot[0]} y={spot[1]} textAnchor="middle" dominantBaseline="middle"
                fontSize={spot[2]} fill={i % 3 === 0 ? "var(--champagne)" : "var(--rose)"}
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.13, duration: 0.6 }}>
                {w}
              </motion.text>
            );
          })}
          <motion.text x="50" y="63.5" textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill="var(--blush)"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.4 + words.length * 0.13, duration: 1 }}>
            {CONFIG.letter.heartName} ❤
          </motion.text>
        </g>
      </svg>
      <Lily side="left" />
      <Lily side="right" />
      <Bouquet />
      
    </div>
  );
}

export function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <Chapter id="letter" index="09" eyebrow="A letter" title={CONFIG.letter.teaser}>
      <div className="relative mx-auto max-w-xl">
        <WordHeart />
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative mx-auto block aspect-[3/2] w-full max-w-md"
            aria-label="Open the letter"
          >
            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(150deg,var(--burgundy),var(--plum))] shadow-[var(--shadow-cinematic)]" />
            <div
              className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-lg border-b border-border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--rose)_35%,var(--plum)),var(--plum))] transition-transform duration-700 group-hover:[transform:rotateX(20deg)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose/80 text-lg text-blush shadow-[0_0_40px_var(--rose)]">
              ❤
            </span>
            <span className="absolute -bottom-10 left-0 right-0 text-center text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              Tap to open
            </span>
          </motion.button>
        )}

        <AnimatePresence>
          {open && (
            <motion.article
              initial={{ opacity: 0, y: 90, rotateX: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-sm bg-paper px-7 py-10 text-paper-foreground shadow-[var(--shadow-cinematic)] sm:px-12 sm:py-14"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, color-mix(in oklab, var(--paper-foreground) 5%, transparent) 0 1px, transparent 1px 34px)",
              }}
            >
              <p className="font-display text-3xl">{CONFIG.letter.greeting}</p>
              <div className="mt-6 space-y-5">
                {CONFIG.letter.body.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.7 + i * 0.5 }}
                    className="font-display text-lg leading-8"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <p className="mt-10 text-right font-display text-xl">{CONFIG.letter.signature}</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-paper-foreground/60 transition-opacity hover:opacity-100"
              >
                Fold it back
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
