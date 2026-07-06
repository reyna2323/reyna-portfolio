"use client";

import { motion, useReducedMotion } from "framer-motion";

interface DeskObjectProps {
  label: string; // handwritten hover label
  ariaLabel: string;
  onOpen: () => void;
  tilt?: number; // hover rotation, degrees
  labelBelow?: boolean;
  children: React.ReactNode;
}

/** Accessible clickable desk object: button semantics, hover lift + glow,
 *  handwritten tooltip revealed on hover/keyboard focus. */
export function DeskObject({
  label,
  ariaLabel,
  onOpen,
  tilt = -1.5,
  labelBelow = false,
  children,
}: DeskObjectProps) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      className="group relative block w-full cursor-pointer text-left"
      whileHover={reduced ? undefined : { y: -9, scale: 1.045, rotate: tilt }}
      whileTap={{ scale: 0.965 }}
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
    >
      <div className="transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)] group-focus-visible:drop-shadow-[0_14px_34px_rgba(239,156,196,0.5)]">
        {children}
      </div>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-hand text-hand-md text-glass-strong opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
          labelBelow
            ? "-bottom-8 translate-y-1 group-hover:translate-y-0"
            : "-top-9 -translate-y-1 group-hover:translate-y-0"
        }`}
        style={{ textShadow: "0 2px 12px rgba(42,24,48,0.9)" }}
      >
        {label}
      </span>
    </motion.button>
  );
}
