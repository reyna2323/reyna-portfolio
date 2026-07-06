/** A fluttering stack of sticky notes — Teaching & Leadership. */
export function StickyNotesArt() {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-x-6 bottom-0 h-4 rounded-[50%] bg-black/35 blur-md" />
      <div
        className="anim-sway absolute inset-[6%] rotate-[11deg] rounded-sm bg-mintled/70 shadow-[0_8px_16px_-8px_rgba(0,0,0,0.4)]"
        style={{ animationDelay: "1.1s" }}
      />
      <div className="anim-sway absolute inset-[8%] rotate-[7deg] rounded-sm bg-lavender/90 shadow-[0_8px_16px_-8px_rgba(0,0,0,0.4)]" />
      <div
        className="anim-sway absolute inset-[10%] -rotate-[4deg] rounded-sm bg-pink/90 shadow-[0_8px_16px_-8px_rgba(0,0,0,0.4)]"
        style={{ animationDelay: "0.6s" }}
      />
      <div className="relative inset-0 flex h-full flex-col justify-center rounded-sm bg-blush p-[12%] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)]">
        {/* tiny lightbulb / spark icon */}
        <svg viewBox="0 0 24 24" className="mb-[8%] h-[18%] w-[18%] text-orchid" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L12 16l-3.7-1C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7Z" />
        </svg>
        <p className="font-hand text-hand-sm leading-tight text-ink-strong">
          if I can&apos;t draw it,
        </p>
        <p className="font-hand text-hand-sm leading-tight text-ink-strong">
          I don&apos;t know it yet.
        </p>
        <p className="mt-[6%] font-hand text-desk-label text-rose-ink">
          teaching keeps that honest ✎
        </p>
        <span className="anim-twinkle absolute right-[9%] top-[9%] text-orchid" style={{ fontSize: 9 }} aria-hidden>
          ⋆
        </span>
      </div>
    </div>
  );
}
