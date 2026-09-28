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

const POP = Array.from({ length: 7 }, (_, i) => {
  const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.round(Math.cos(a) * 34), y: Math.round(Math.sin(a) * 30), size: 10 + (i % 3) * 3, glyph: ["✦", "✧", "⋆"][i % 3] };
});

/** Accessible clickable desk object: button semantics, hover lift + glow,
 *  an always-visible handwritten tag that lights up (and says "open") on hover/focus,
 *  a pool of lamp light underneath, and a pop of sparkles on click. */
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
      aria-label={`${index ? `${index} ` : ""}${label.replace(/[✦✧♡]/g, "").trim()}${featured ? ", featured" : ""}. ${ariaLabel}`}
      aria-describedby={peek ? peekId : undefined}
      className="group pointer-events-auto relative block w-full cursor-pointer text-left"
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
      {/* the art never takes clicks itself: its shadows and glows spill past the
          object, and they must not catch clicks meant for a neighbour's tag */}
      <div aria-hidden className="pointer-events-none transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)] group-focus-visible:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)]">
        {children}
      </div>
      {/* on hover or focus, a warm pool of lamp light brightens on the desk under the object */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[14%] left-1/2 -z-10 h-[46%] w-[125%] -translate-x-1/2 rounded-[50%] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,226,196,0.34), rgba(236,143,189,0.16) 45%, transparent 72%)" }}
      />
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
      {/* a little pop of sparkles where you clicked, so opening a page feels like it landed */}
      {rippleKey > 0 && (
        <span key={rippleKey} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-30">
          {POP.map((p, i) => (
            <span
              key={i}
              className="sparkle-pop absolute select-none text-blush"
              style={{ ["--pop-x" as string]: `${p.x}px`, ["--pop-y" as string]: `${p.y}px`, fontSize: p.size, animationDelay: `${i * 25}ms` }}
            >
              {p.glyph}
            </span>
          ))}
        </span>
      )}
      <span
        aria-hidden
        className={`absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-hand text-hand-md desk-tag leading-snug text-glass-strong shadow-[0_6px_16px_-6px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:border-pink/80 group-hover:bg-plum group-focus-visible:border-pink/80 group-focus-visible:bg-plum ${
          featured ? "border-pink/80 bg-plum/90" : "border-pink/30 bg-deepplum/85"
        } ${
          labelBelow ? "-bottom-9" : "-top-10"
        } ${labelClassName}`}
      >
        {index && <span className="font-mono text-xs text-pink">{index}</span>}
        {label}
        {featured && <span className="rounded-full bg-pink/25 px-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wide text-glass-strong">★ featured</span>}
        {/* an invisible bridge from the tag down to the object, exactly as wide as
            the tag: the object lifts on hover and carries its tag with it, so
            without this the tag would slip out from under the cursor */}
        <span aria-hidden className={`absolute inset-x-0 h-6 ${labelBelow ? "bottom-full" : "top-full"}`} />
        {/* "open ↗" slides out on hover/focus, so the tag reads as a door to a page */}
        <span className="max-w-0 overflow-hidden font-sans text-[0.7rem] font-semibold text-pink opacity-0 transition-all duration-300 group-hover:max-w-[4rem] group-hover:opacity-100 group-focus-visible:max-w-[4rem] group-focus-visible:opacity-100">
          open ↗
        </span>
      </span>
    </motion.button>
  );
}
