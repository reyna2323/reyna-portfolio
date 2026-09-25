"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** GSAP-driven entrance: the notebook "cover" splits open like double doors
 *  to reveal the desk underneath. Skips straight through for reduced motion. */
export function Entrance({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !leftRef.current || !rightRef.current || !rootRef.current) return;
      const tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) onDone();
        },
      });
      tl.set([leftRef.current, rightRef.current], { transformOrigin: "center" })
        .fromTo(
          [leftRef.current, rightRef.current],
          { opacity: 1 },
          { opacity: 1, duration: 0.4 },
        )
        // a seam of light finds its way through the cover just before it splits
        .fromTo(seamRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.in" }, 0.15)
        .to(leftRef.current, { xPercent: -100, rotateY: -12, duration: 1.05, ease: "power3.inOut" }, 0.5)
        .to(rightRef.current, { xPercent: 100, rotateY: 12, duration: 1.05, ease: "power3.inOut" }, 0.5)
        .to(seamRef.current, { opacity: 0, duration: 0.3 }, 0.5)
        .fromTo(
          sparkRef.current,
          { opacity: 1, scale: 0.4 },
          { opacity: 0, scale: 2.4, duration: 0.7, ease: "power2.out" },
          0.5,
        )
        .to(rootRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" }, "-=0.15");
    });
    return () => {
      cancelled = true;
    };
  }, [reduced, onDone]);

  if (reduced) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex" style={{ perspective: 1200 }}>
      <div ref={leftRef} className="h-full w-1/2 bg-gradient-to-br from-plum to-deepplum shadow-2xl">
        <div className="flex h-full items-center justify-end pr-2">
          <span className="font-hand text-entrance-mark text-glass-strong">R</span>
        </div>
      </div>
      <div ref={rightRef} className="h-full w-1/2 bg-gradient-to-bl from-plum to-deepplum shadow-2xl">
        <div className="flex h-full items-center justify-start pl-2">
          <span className="font-hand text-entrance-mark text-glass-strong">P</span>
        </div>
      </div>
      {/* seam glow + a small burst of light, right where the cover splits */}
      <div
        ref={seamRef}
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 opacity-0"
        style={{ boxShadow: "0 0 40px 6px rgba(253,242,247,0.65)", background: "rgba(253,242,247,0.9)" }}
        aria-hidden
      />
      <div
        ref={sparkRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(253,242,247,0.9), rgba(236,143,189,0.3) 45%, transparent 75%)" }}
        aria-hidden
      />
    </div>
  );
}
