"use client";

import { useSyncExternalStore, useCallback } from "react";

/** SSR-safe media query hook (returns false on the server). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Hydration-safe "prefers reduced motion": false during server render and
 *  hydration, then the real setting. (Framer's useReducedMotion reads the
 *  setting before hydration, so markup that branches on it mismatches.) */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
