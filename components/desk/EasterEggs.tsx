"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

/* Secrets, for the curious. Nothing here is signposted on purpose.
   - type "kepler" on the desk: a planet transits the screen and the page dims like a star
   - type "fight on": cardinal-and-gold sparkles (on phones, tap my name)
   - ↑ ↑ ↓ ↓ ← → ← → B A: it rains sparkles
   - a hello in the browser console for anyone reading the source
   Every egg also announces itself in a live region, so screen-reader users
   get the moment too. */

const EGG_EVENT = "reyna-egg";
type EggKind = "fighton" | "kepler" | "konami";

const MESSAGES: Record<EggKind, string> = {
  fighton: "✌ fight on!",
  kepler: "✦ transit detected: the whole page just dimmed like a star",
  konami: "cheat code accepted ✦",
};

/** Show a little message (and read it to screen readers). Used by the desk's clickable extras. */
export function announceEgg(message: string) {
  window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: { message } }));
}

/** Set off one of the named celebrations. */
export function triggerEgg(kind: EggKind) {
  window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: { kind } }));
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const BURST = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  const r = 140 + (i % 4) * 45;
  return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r * 0.75 - 90), glyph: i % 3 === 0 ? "✌" : i % 2 ? "✦" : "✧", gold: i % 2 === 0 };
});

const RAIN = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 29 + 7) % 100,
  delay: (i % 12) * 0.12,
  duration: 1.6 + (i % 5) * 0.25,
  glyph: ["✦", "✧", "⋆"][i % 3],
  color: ["var(--pink)", "var(--lavender)", "var(--rosegold)", "var(--blush)"][i % 4],
  size: 12 + (i % 4) * 5,
}));

function EggEffect({ kind }: { kind: EggKind }) {
  if (kind === "fighton") {
    return (
      <div aria-hidden className="pointer-events-none fixed left-1/2 top-1/2 z-[60]">
        {BURST.map((b, i) => (
          <span
            key={i}
            className="egg-burst absolute select-none font-bold"
            style={{
              ["--egg-x" as string]: `${b.x}px`,
              ["--egg-y" as string]: `${b.y}px`,
              color: b.gold ? "#ffc72c" : "#b3243a",
              fontSize: b.glyph === "✌" ? 26 : 18,
              textShadow: "0 0 10px rgba(255,199,44,0.6)",
              animationDelay: `${(i % 6) * 30}ms`,
            }}
          >
            {b.glyph}
          </span>
        ))}
      </div>
    );
  }
  if (kind === "kepler") {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
        {/* the star's light dips while the planet is in front of it */}
        <div className="egg-dim absolute inset-0 bg-black" />
        <div
          className="absolute left-1/2 top-[22%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,242,247,0.55), rgba(227,165,139,0.25) 45%, transparent 70%)" }}
        />
        <div className="egg-planet absolute top-[22%] h-12 w-12 -translate-y-1/2 rounded-full border-2 border-lavender/70 bg-deepplum shadow-[0_0_20px_rgba(195,168,232,0.5)]" />
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {RAIN.map((r, i) => (
        <span
          key={i}
          className="egg-rain absolute -top-8 select-none"
          style={{ left: `${r.left}%`, color: r.color, fontSize: r.size, animationDelay: `${r.delay}s`, animationDuration: `${r.duration}s` }}
        >
          {r.glyph}
        </span>
      ))}
    </div>
  );
}

export function EasterEggs() {
  const reduced = usePrefersReducedMotion();
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [effect, setEffect] = useState<{ id: number; kind: EggKind } | null>(null);

  // show whatever the desk (or a secret word) set off
  useEffect(() => {
    let count = 0;
    let toastTimer: ReturnType<typeof setTimeout> | undefined;
    let effectTimer: ReturnType<typeof setTimeout> | undefined;
    const onEgg = (e: Event) => {
      const detail = (e as CustomEvent<{ kind?: EggKind; message?: string }>).detail;
      const id = ++count;
      setToast({ id, text: detail.kind ? MESSAGES[detail.kind] : (detail.message ?? "") });
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setToast(null), 3400);
      if (detail.kind) {
        const kind = detail.kind;
        setEffect({ id, kind });
        clearTimeout(effectTimer);
        effectTimer = setTimeout(() => setEffect(null), 3200);
      }
    };
    window.addEventListener(EGG_EVENT, onEgg);
    return () => {
      window.removeEventListener(EGG_EVENT, onEgg);
      clearTimeout(toastTimer);
      clearTimeout(effectTimer);
    };
  }, []);

  // secret words and the konami code (never while typing in a field)
  useEffect(() => {
    let letters = "";
    let keys: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable]")) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys = [...keys, key].slice(-KONAMI.length);
      if (keys.length === KONAMI.length && KONAMI.every((k, i) => keys[i] === k)) {
        keys = [];
        triggerEgg("konami");
        return;
      }
      if (!/^[a-z]$/.test(key)) return;
      letters = (letters + key).slice(-12);
      if (letters.endsWith("fighton")) {
        letters = "";
        triggerEgg("fighton");
      } else if (letters.endsWith("kepler")) {
        letters = "";
        triggerEgg("kepler");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // a hello for anyone who opens the console
  useEffect(() => {
    console.log(
      "%c hi, I'm Reyna ✦ %c\nthanks for peeking under the hood. the code lives at github.com/reyna2323\npsst: try typing \"kepler\" or \"fight on\" on the desk ♡",
      "background:#ec8fbd;color:#1f0f27;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:999px",
      "color:#c3a8e8;font-size:12px",
    );
  }, []);

  return (
    <>
      {/* no visible pop-up text: the eggs speak for themselves. Screen readers
          still hear a short description of what just happened. */}
      <div aria-live="polite" className="sr-only">
        {toast?.text}
      </div>
      {effect && !reduced && <EggEffect key={effect.id} kind={effect.kind} />}
    </>
  );
}
