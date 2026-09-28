"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/** Counts up to a stat's number when it appears. Marks around the number stay
 *  put ("~20", "4+", "92%", "5,000+"); screen readers just hear the final value. */
export function CountUp({ value }: { value: string }) {
  const reduced = usePrefersReducedMotion();
  const m = value.match(/^(\D*)([\d,]+)(\D*)$/);
  const target = m ? Number(m[2].replace(/,/g, "")) : 0;
  const grouped = m ? m[2].includes(",") : false;
  const counts = m !== null;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!counts || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [counts, reduced, target]);
  if (!m) return <>{value}</>;
  const shown = reduced ? target : n;
  return (
    <>
      <span aria-hidden>
        {m[1]}
        {grouped ? shown.toLocaleString("en-US") : shown}
        {m[3]}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
