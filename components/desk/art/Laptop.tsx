"use client";

import { useReducedMotion } from "framer-motion";
import { useTypedLines } from "@/lib/useTypedLines";
import { terminalScript } from "@/lib/content";

/** Rose-gold laptop with a live auto-typing terminal. */
export function LaptopArt() {
  const reduced = useReducedMotion();
  const { history, current } = useTypedLines(terminalScript, !reduced);

  return (
    <div className="relative aspect-[16/10.5] w-full">
      {/* soft glow cast by the screen onto the desk, breathing gently */}
      <div
        className="anim-breathe pointer-events-none absolute inset-x-[10%] top-[4%] h-[70%] rounded-xl opacity-40 blur-2xl"
        style={{ background: "radial-gradient(ellipse at center, var(--led), transparent 72%)" }}
      />
      {/* screen */}
      <div className="absolute inset-x-[7%] top-0 h-[78%] rounded-t-xl rounded-b-sm border-[3px] border-rosegold bg-gradient-to-b from-[#3a2140] to-deepplum p-[2.5%] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)]">
        <div className="flex h-full flex-col overflow-hidden rounded-md bg-deepplum/90 p-[3%] font-mono">
          {/* window chrome */}
          <div className="mb-[2%] flex items-center gap-[1.5%]">
            <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-hotpink" />
            <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-rosegold" />
            <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-mintled" />
            <span className="ml-[3%] text-desk-micro text-glass-muted">reyna@desk ~ zsh</span>
          </div>
          <div className="space-y-[1.5%] text-desk-label leading-relaxed">
            {history.map((line, i) => (
              <p key={`${line}-${i}`} className="text-glass-muted">
                <span className="text-circuit">❯</span> {line}
              </p>
            ))}
            <p className="text-glass-strong">
              <span className="text-hotpink">❯</span> {current}
              <span className="anim-blink ml-[2px] inline-block h-[0.75em] w-[0.45em] translate-y-[0.1em] bg-led" />
            </p>
          </div>
          <p className="mt-auto text-desk-micro text-glass-muted">▲ full-stack · always shipping</p>
        </div>
      </div>
      {/* base / keyboard deck */}
      <div
        className="absolute bottom-[4%] left-0 right-0 h-[16%] rounded-b-xl bg-gradient-to-b from-blush to-rosegold shadow-[0_10px_18px_-8px_rgba(0,0,0,0.55)]"
        style={{ clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }}
      >
        <div
          className="mx-auto mt-[1.5%] h-[45%] w-[74%] rounded-sm opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(83,48,89,0.35) 0 6px, transparent 6px 8px)",
          }}
        />
        <div className="mx-auto mt-[1%] h-[22%] w-[26%] rounded-sm bg-plum/25" />
        {/* well-loved sticker collection on the deck edge */}
        <span
          className="absolute bottom-[8%] left-[6%] -rotate-[8deg] rounded-sm px-[4%] py-[1%] font-hand text-desk-micro text-orchid shadow-sm"
          style={{ background: "rgba(253,242,247,0.85)" }}
        >
          {"</>"}
        </span>
        <span
          className="absolute bottom-[6%] right-[7%] rotate-[6deg] text-hotpink"
          style={{ fontSize: "max(6px, 0.5vw)" }}
        >
          ♡
        </span>
      </div>
      <div className="absolute inset-x-[10%] -bottom-0.5 h-3 rounded-[50%] bg-black/45 blur-md" />
    </div>
  );
}
