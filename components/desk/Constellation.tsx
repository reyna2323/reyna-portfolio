"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections, type PageId } from "@/lib/content";
import { onAllVisited, useVisited } from "@/lib/visited";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/* One star per numbered page, in reading order, loosely shaped like a real
   constellation. Reading a page lights its star; two lit neighbours get a
   line of light drawn between them. Decorative, so the drawing is hidden
   from screen readers and the caption carries the meaning. */
const STARS: readonly (readonly [number, number])[] = [
  [12, 36],
  [44, 16],
  [78, 30],
  [110, 9],
  [142, 26],
  [176, 13],
  [208, 34],
];

const BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return { x: Math.cos(a) * (46 + (i % 3) * 14), y: Math.sin(a) * (26 + (i % 3) * 8), glyph: ["✦", "✧", "⋆"][i % 3] };
});

export function Constellation({ current, compact = false }: { current: PageId | null; compact?: boolean }) {
  const visited = useVisited();
  const reduced = usePrefersReducedMotion();
  const lit = sections.map((s) => visited.includes(s.id));
  const count = lit.filter(Boolean).length;
  const complete = count === sections.length;

  // a one-time burst the moment the seventh star lights up
  const [burst, setBurst] = useState(0);
  useEffect(() => onAllVisited(() => setBurst((b) => b + 1)), []);

  const caption = complete
    ? "constellation complete ✦ thank you for reading"
    : count === 0
      ? "✦ every page you read lights a star"
      : `${count} of ${sections.length} stars lit`;

  return (
    <div className={`relative flex flex-col items-center ${compact ? "w-[168px]" : "w-[210px]"}`}>
      <svg viewBox="0 0 220 44" className="w-full overflow-visible" aria-hidden>
        {/* lines of light between neighbouring pages you've read */}
        {STARS.slice(0, -1).map(([x, y], i) => {
          const [x2, y2] = STARS[i + 1];
          if (!lit[i] || !lit[i + 1]) {
            return (
              <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="var(--lavender)" strokeWidth="0.7" strokeDasharray="1.5 3" opacity="0.5" />
            );
          }
          return (
            <motion.line
              key={`lit-${i}`}
              x1={x}
              y1={y}
              x2={x2}
              y2={y2}
              stroke="var(--pink)"
              strokeWidth="1.1"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 2px rgba(236,143,189,0.9))" }}
            />
          );
        })}

        {STARS.map(([x, y], i) => {
          const id = sections[i].id;
          const on = lit[i];
          const here = current === id;
          return (
            <g key={id}>
              {here && (
                <circle cx={x} cy={y} r="6.5" fill="none" stroke="var(--pink)" strokeWidth="0.8" className="anim-pulse-glow" />
              )}
              {on ? (
                <motion.circle
                  cx={x}
                  cy={y}
                  fill="var(--petal)"
                  initial={reduced ? false : { r: 0 }}
                  animate={{ r: 2.8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="anim-twinkle"
                  style={{ filter: "drop-shadow(0 0 3px rgba(253,242,247,0.95))", animationDelay: `${i * 0.4}s`, animationDuration: "4s" }}
                />
              ) : (
                <circle cx={x} cy={y} r="2" fill="var(--lilac)" opacity="0.75" style={{ filter: "drop-shadow(0 0 2px rgba(195,168,232,0.8))" }} />
              )}
            </g>
          );
        })}
      </svg>

      <p
        className={`mt-0.5 whitespace-nowrap font-hand leading-none ${compact ? "text-hand-sm" : "text-hand-md"} ${complete ? "text-glass-strong" : "text-glass-muted"}`}
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
      >
        {caption}
      </p>

      {/* completion burst */}
      <AnimatePresence>
        {burst > 0 && !reduced && (
          <motion.div
            key={burst}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[40%]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            onAnimationComplete={() => setBurst(0)}
          >
            <motion.span
              className="absolute -left-10 -top-10 h-20 w-20 rounded-full border-2 border-pink"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {BURST.map((b, i) => (
              <motion.span
                key={i}
                className={`absolute -translate-x-1/2 -translate-y-1/2 select-none ${i % 2 ? "text-pink" : "text-lilac"}`}
                style={{ fontSize: 12 + (i % 3) * 3 }}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
                animate={{ x: b.x, y: b.y, scale: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeOut", delay: (i % 4) * 0.05 }}
              >
                {b.glyph}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
