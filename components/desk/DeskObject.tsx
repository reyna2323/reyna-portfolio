"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DeskObjectProps {
  label: string; // handwritten tag, always visible so visitors know what's clickable
  index?: string; // page number shown on the tag, e.g. "01"
  ariaLabel: string;
  onOpen: () => void;
  tilt?: number; // hover rotation, degrees
  labelBelow?: boolean;
  labelClassName?: string; // nudge the tag when a neighbour is in the way
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
  children,
}: DeskObjectProps) {
  const reduced = useReducedMotion();
  const [rippleKey, setRippleKey] = useState(0);
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!reduced) setRippleKey((k) => k + 1);
        onOpen();
      }}
      aria-label={ariaLabel}
      className="group relative block w-full cursor-pointer text-left"
      whileHover={reduced ? undefined : { y: -9, scale: 1.045, rotate: tilt }}
      whileTap={{ scale: 0.965 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
    >
      <div className="transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)] group-focus-visible:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)]">
        {children}
      </div>
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
        className={`pointer-events-none absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-pink/30 bg-deepplum/75 px-2.5 py-0.5 font-hand text-hand-md leading-snug text-glass-strong shadow-[0_6px_16px_-6px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 group-hover:border-pink/80 group-hover:bg-plum group-focus-visible:border-pink/80 group-focus-visible:bg-plum ${
          labelBelow ? "-bottom-9" : "-top-10"
        } ${labelClassName}`}
      >
        {index && <span className="font-mono text-xs text-pink">{index}</span>}
        {label}
      </span>
    </motion.button>
  );
}
