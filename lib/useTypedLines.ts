"use client";

import { useEffect, useState } from "react";

export interface TypedEntry {
  cmd: string;
  out?: string;
}

interface Typed {
  history: TypedEntry[];
  current: string;
}

/** Auto-types each command character by character, then "runs" it (its output
 *  line appears), keeping a short history. */
export function useTypedLines(script: TypedEntry[], enabled: boolean): Typed {
  const [state, setState] = useState<Typed>({ history: [], current: "" });

  useEffect(() => {
    if (!enabled || script.length === 0) return;
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const entry = script[line % script.length];
      if (char <= entry.cmd.length) {
        const current = entry.cmd.slice(0, char);
        setState((s) => ({ ...s, current }));
        char += 1;
        timer = setTimeout(tick, 50 + Math.random() * 60);
      } else {
        setState((s) => ({
          history: [...s.history, entry].slice(-2),
          current: "",
        }));
        line += 1;
        char = 0;
        timer = setTimeout(tick, 2600);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [script, enabled]);

  return state;
}
