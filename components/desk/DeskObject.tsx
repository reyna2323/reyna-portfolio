"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface DeskObjectProps {
  label: string; // handwritten tag, always visible so visitors know what's clickable
  index?: string; // page number shown on the tag, e.g. "01"
  ariaLabel: string;
  onOpen: () => void;
  tilt?: number; // hover rotation, degrees
  labelBelow?: boolean;
  labelClassName?: string; // nudge the tag when a neighbour is in the way
  featured?: boolean; // spotlight: brighter tag, a star, and a slow halo behind the object
  peek?: string[]; // headline facts from the page, shown on a little index card on hover/focus
  peekSide?: "left" | "right"; // which side the card appears on (toward the middle of the desk)
  children: React.ReactNode;
}

/** Accessible clickable desk object: button semantics, hover lift + glow,
 *  an always-visible handwritten tag that lights up on hover/focus, and a one-shot
 *  ring pulse on click so opening a panel feels like it landed. */
export function DeskObject({
  label,
  index,
  ariaLabel,
  onOpen,
  tilt = -1.5,
  labelBelow = false,
  labelClassName = "",
  featured = false,
  peek,
  peekSide = "right",
  children,
}: DeskObjectProps) {
  const peekId = useId();
  const reduced = usePrefersReducedMotion();
  const [rippleKey, setRippleKey] = useState(0);
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!reduced) setRippleKey((k) => k + 1);
        onOpen();
      }}
      aria-label={ariaLabel}
      aria-describedby={peek ? peekId : undefined}
      className="group relative block w-full cursor-pointer text-left"
      whileHover={reduced ? undefined : { y: -9, scale: 1.045, rotate: tilt }}
      whileTap={{ scale: 0.965 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
    >
      {featured && (
        <span
          aria-hidden
          className="anim-breathe pointer-events-none absolute -inset-[12%] -z-10 rounded-[40%] opacity-60 blur-2xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(236,143,189,0.55), transparent 70%)" }}
        />
      )}
      <div className="transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)] group-focus-visible:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)]">
        {children}
      </div>
      {/* a pencil circle that sketches itself around the object on hover or
          keyboard focus, like annotating a page in the notebook */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="scribble pointer-events-none absolute -inset-[9%] z-10 h-[118%] w-[118%] overflow-visible"
      >
        <path
          d="M14 30 C22 9 78 3 91 27 C102 50 93 86 56 94 C21 100 3 78 6 51 C9 31 24 15 44 9"
          pathLength={1}
          fill="none"
          stroke="var(--pink)"
          strokeWidth="2.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* index-card peek: the page's headline facts, before you open it */}
      {peek && (
        <span
          id={peekId}
          className={`peek pointer-events-none absolute top-1/2 z-30 block w-52 -translate-y-1/2 ${
            peekSide === "left" ? "right-full mr-4 -rotate-2" : "left-full ml-4 rotate-2"
          }`}
        >
          <span className="relative block rounded-md border border-pink/30 bg-paper px-3.5 pb-3 pt-3.5 text-left shadow-[0_18px_36px_-14px_rgba(0,0,0,0.7)] ruled-lines">
            {/* a strip of washi tape holding the card down */}
            <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-lavender/70" />
            {index && <span className="mb-1 block font-mono text-[0.68rem] text-rose-ink">{index} · at a glance</span>}
            {peek.map((fact) => (
              <span key={fact} className="flex gap-1.5 text-[0.8rem] font-medium leading-snug text-ink-strong">
                <span aria-hidden className="text-rose-ink">✦</span>
                {fact}
              </span>
            ))}
            <span className="mt-1.5 block font-hand text-[0.95rem] leading-none text-ink-muted">click to open →</span>
          </span>
        </span>
      )}
      {rippleKey > 0 && (
        <span
          key={rippleKey}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-hotpink/70"
          style={{ animation: "ring-pulse 0.6s ease-out" }}
        />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-hand text-hand-md desk-tag leading-snug text-glass-strong shadow-[0_6px_16px_-6px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 group-hover:border-pink/80 group-hover:bg-plum group-focus-visible:border-pink/80 group-focus-visible:bg-plum ${
          featured ? "border-pink/80 bg-plum/90" : "border-pink/30 bg-deepplum/75"
        } ${
          labelBelow ? "-bottom-9" : "-top-10"
        } ${labelClassName}`}
      >
        {index && <span className="font-mono text-xs text-pink">{index}</span>}
        {label}
        {featured && <span className="rounded-full bg-pink/25 px-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wide text-glass-strong">★ featured</span>}
      </span>
    </motion.button>
  );
}
