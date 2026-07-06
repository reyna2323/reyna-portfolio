"use client";

import { useEffect, useState } from "react";

interface Typed {
  history: string[];
  current: string;
}

/** Auto-types each script line character by character, keeping a short history. */
export function useTypedLines(script: string[], enabled: boolean): Typed {
  const [state, setState] = useState<Typed>({ history: [], current: "" });

  useEffect(() => {
    if (!enabled || script.length === 0) return;
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = script[line % script.length];
      if (char <= full.length) {
        const current = full.slice(0, char);
        setState((s) => ({ ...s, current }));
        char += 1;
        timer = setTimeout(tick, 50 + Math.random() * 60);
      } else {
        setState((s) => ({
          history: [...s.history, full].slice(-2),
          current: "",
        }));
        line += 1;
        char = 0;
        timer = setTimeout(tick, 2200);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [script, enabled]);

  return state;
}
