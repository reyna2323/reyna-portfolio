"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { usePointer } from "./Parallax";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface Bokeh {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  hue: string;
}

interface StarDot {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

interface Sparkle {
  left: number;
  top: number;
  delay: number;
  size: number;
  glyph: string;
}

interface DustMote {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

interface ShootingStar {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

interface TrailSparkle {
  id: number;
  x: number;
  y: number;
  glyph: string;
}

const HUES = ["var(--pink)", "var(--lavender)", "var(--rosegold)", "var(--led)", "var(--lilac)"];
const GLYPHS = ["✦", "✧", "✦", "✧", "⋆"];
const TRAIL_GLYPHS = ["✦", "✧", "⋆"];
const TRAIL_HUES = ["text-lavender", "text-pink", "text-rosegold"];

/** A faint trail of sparkles that follows a real mouse (never a touch scroll or
 *  drag) across the desk. Throttled and capped, never catches pointer events,
 *  and lives in its own component so each new sparkle re-renders only itself. */
function CursorTrail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailSparkle[]>([]);
  const lastSpawn = useRef(0);
  const trailId = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 130) return;
      lastSpawn.current = now;
      const root = rootRef.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      const id = trailId.current++;
      setTrail((prev) => [...prev.slice(-12), { id, x, y, glyph: TRAIL_GLYPHS[id % TRAIL_GLYPHS.length] }]);
      const t = setTimeout(() => {
        timers.delete(t);
        setTrail((prev) => prev.filter((s) => s.id !== id));
      }, 850);
      timers.add(t);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0">
      {trail.map((s, i) => (
        <span
          key={s.id}
          className={`anim-cursor-trail absolute select-none ${TRAIL_HUES[i % TRAIL_HUES.length]}`}
          style={{ left: s.x, top: s.y, fontSize: 11 }}
        >
          {s.glyph}
        </span>
      ))}
    </div>
  );
}

/** Soft drifting bokeh, twinkling star-field, and sparkle glyphs — purely decorative. */
export function Atmosphere() {
  const bokehs = useMemo<Bokeh[]>(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 5 + ((i * 13) % 26),
        delay: (i % 10) * 0.8,
        duration: 10 + (i % 7) * 2,
        hue: HUES[i % HUES.length],
      })),
    [],
  );

  const stars = useMemo<StarDot[]>(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        left: (i * 23 + 7) % 98,
        top: (i * 41 + 11) % 92,
        size: 1 + (i % 3),
        delay: (i % 9) * 0.55,
        duration: 3 + (i % 4),
      })),
    [],
  );

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: (i * 71 + 15) % 90,
        top: (i * 47 + 8) % 88,
        delay: (i % 7) * 1.1,
        size: 8 + (i % 4) * 3,
        glyph: GLYPHS[i % GLYPHS.length],
      })),
    [],
  );

  const dust = useMemo<DustMote[]>(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        left: (i * 17 + 3) % 100,
        top: (i * 31 + 60) % 100,
        size: 1.5 + (i % 3) * 0.8,
        delay: (i % 11) * 0.7,
        duration: 7 + (i % 5) * 1.6,
        drift: ((i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4)),
      })),
    [],
  );

  const shootingStars = useMemo<ShootingStar[]>(
    () => [
      { left: 78, top: 12, delay: 3, duration: 17 },
      { left: 30, top: 8, delay: 11, duration: 22 },
      { left: 58, top: 20, delay: 19, duration: 26 },
    ],
    [],
  );

  const reduced = usePrefersReducedMotion();
  const { px, py } = usePointer();
  // The glow is half the scene's size; moving it with transforms (a percentage
  // of its own size) keeps it on the GPU instead of re-laying-out every frame.
  // Its centre lands at 50% ± 38% of the scene, same as before.
  const glowX = useTransform(px, (v) => `${50 + v * 76}%`);
  const glowY = useTransform(py, (v) => `${50 + v * 76}%`);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grain absolute inset-0" />

      {/* cursor sparkle trail (its own component, so a new sparkle doesn't re-render the whole sky) */}
      {!reduced && <CursorTrail />}

      {/* cursor-reactive light wash — follows pointer with a soft spring lag.
          The gradient itself is the softness; no blur filter to recompute. */}
      {!reduced && (
        <motion.div
          className="absolute left-0 top-0 h-[50%] w-[50%] rounded-full"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(236,143,189,0.13), rgba(236,143,189,0.05) 40%, transparent 70%)",
          }}
        />
      )}

      {/* dust motes — tiny, slow, warm specks drifting up through the light */}
      {dust.map((d, i) => (
        <span
          key={`dust-${i}`}
          className={`anim-dust absolute rounded-full bg-[var(--rosegold)] ${i % 2 ? "max-md:hidden" : ""}`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: 0,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            ["--dust-x" as string]: `${d.drift}px`,
          }}
        />
      ))}

      {/* rare shooting stars — a reward for watching the sky a while */}
      {shootingStars.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="anim-shooting-star absolute h-px w-16 rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: "linear-gradient(90deg, transparent, var(--glass-strong) 60%, transparent)",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 4px var(--glass-strong)",
          }}
        />
      ))}

      {/* bokeh orbs: a soft-edged gradient instead of a blur filter, so drifting
          them costs nothing to redraw. Half as many on phones. */}
      {bokehs.map((b, i) => (
        <span
          key={`bokeh-${i}`}
          className={`anim-bokeh absolute rounded-full ${i % 2 ? "max-md:hidden" : ""}`}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size + 4,
            height: b.size + 4,
            background: `radial-gradient(circle, ${b.hue} 0%, ${b.hue} 38%, transparent 72%)`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* twinkling star field (half as many on phones) */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className={`anim-twinkle absolute rounded-full bg-white ${i % 2 ? "max-md:hidden" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* sparkle glyphs — appear and vanish */}
      {sparkles.map((sp, i) => (
        <span
          key={`sparkle-${i}`}
          className="anim-sparkle absolute select-none text-lavender"
          style={{
            left: `${sp.left}%`,
            top: `${sp.top}%`,
            fontSize: sp.size,
            animationDelay: `${sp.delay}s`,
            animationDuration: `${4 + (i % 3)}s`,
            opacity: 0,
          }}
        >
          {sp.glyph}
        </span>
      ))}

      {/* ambient light washes: wide, soft gradients (no blur filters on screen-sized layers) */}
      <div
        className="absolute -left-1/4 top-[-20%] h-[70%] w-[70%] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, var(--orchid), rgba(154,92,208,0.35) 30%, transparent 68%)" }}
      />
      <div
        className="absolute -right-1/4 bottom-[-20%] h-[70%] w-[70%] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, var(--pink), rgba(236,143,189,0.35) 30%, transparent 68%)" }}
      />
      <div
        className="absolute left-1/2 top-[-12%] h-[45%] w-[55%] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--lavender), transparent 68%)", opacity: 0.12 }}
      />
    </div>
  );
}
