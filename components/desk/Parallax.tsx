"use client";

import { createContext, useContext } from "react";
import {
  motion,
  motionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface PointerCtx {
  px: MotionValue<number>; // -1 … 1, softly sprung (for parallax depth)
  py: MotionValue<number>;
  rawX: MotionValue<number>; // the pointer itself, in px (for things that sit on the cursor)
  rawY: MotionValue<number>;
}

// static fallback so consumers (e.g. Atmosphere on the mobile dashboard,
// which renders outside ParallaxProvider) can read a pointer value of 0
// instead of crashing.
const fallback: PointerCtx = { px: motionValue(0), py: motionValue(0), rawX: motionValue(-9999), rawY: motionValue(-9999) };
const Ctx = createContext<PointerCtx>(fallback);

export function ParallaxProvider({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 50, damping: 16 });
  const py = useSpring(rawY, { stiffness: 50, damping: 16 });
  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);

  return (
    <Ctx.Provider value={{ px, py, rawX: pointerX, rawY: pointerY }}>
      <div
        className={className}
        onPointerMove={(e) => {
          rawX.set((e.clientX / window.innerWidth) * 2 - 1);
          rawY.set((e.clientY / window.innerHeight) * 2 - 1);
          pointerX.set(e.clientX);
          pointerY.set(e.clientY);
        }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function usePointer(): PointerCtx {
  return useContext(Ctx);
}

/** Wraps a desk object; shifts it subtly against the pointer for depth. */
export function ParallaxLayer({
  depth = 1,
  className,
  children,
}: {
  depth?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { px, py } = usePointer();
  const reduced = usePrefersReducedMotion();
  const factor = reduced ? 0 : depth * 9;
  const x = useTransform(px, (v) => v * -factor);
  const y = useTransform(py, (v) => v * -factor);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
