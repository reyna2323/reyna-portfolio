/** Pearl-lavender oscilloscope with a continuously scrolling waveform. */

const WAVE =
  "M0 44 H14 L20 30 L28 56 L34 22 L40 44 H58 Q64 12 70 44 H92 L98 34 L104 50 L110 44 H126 Q132 64 138 44 H160";

export function OscilloscopeArt() {
  return (
    <div className="relative aspect-[5/4.1] w-full">
      <div className="absolute inset-x-3 -bottom-1.5 h-4 rounded-[50%] bg-black/40 blur-md" />
      <div className="relative h-full rounded-2xl border border-lavender/50 bg-gradient-to-b from-lilac to-lavender p-[5%] shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),0_10px_24px_-10px_rgba(0,0,0,0.5)]">
        {/* brand strip */}
        <div className="mb-[3%] flex items-center justify-between px-[2%]">
          <span className="font-hand text-desk-label leading-none text-ink-strong">reyna·scope 9000</span>
          <span
            className="anim-led h-[0.5vw] w-[0.5vw] rounded-full bg-led"
            style={{ filter: "drop-shadow(0 0 4px var(--led))" }}
          />
        </div>
        {/* tiny heart sticker, half-peeled corner */}
        <span
          className="anim-sparkle pointer-events-none absolute left-[3%] top-[2%] text-hotpink"
          style={{ fontSize: "max(7px, 0.5vw)", animationDelay: "2.6s" }}
          aria-hidden
        >
          ♡
        </span>
        {/* screen */}
        <div className="relative h-[62%] overflow-hidden rounded-lg border border-plum/60 bg-deepplum shadow-[inset_0_0_18px_rgba(0,0,0,0.8)]">
          <svg viewBox="0 0 160 80" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            <defs>
              <pattern id="scopegrid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M16 0 H0 V16" fill="none" stroke="rgba(239,156,196,0.14)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="160" height="80" fill="url(#scopegrid)" />
            <g className="anim-scope" style={{ filter: "drop-shadow(0 0 3px var(--led))" }}>
              <path d={WAVE} fill="none" stroke="var(--led)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d={WAVE}
                transform="translate(160 0)"
                fill="none"
                stroke="var(--led)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className="absolute right-1 top-0.5 font-mono text-desk-micro text-glass-muted">CH1 · 2ms</span>
          <span className="anim-flicker absolute left-1 top-0.5 font-mono text-desk-micro text-mintled">Vpp 3.3V</span>
        </div>
        {/* knobs */}
        <div className="mt-[4%] flex items-center justify-between px-[3%]">
          <div className="flex gap-[8%] gap-x-2">
            <span className="relative block h-[1.7vw] w-[1.7vw] rounded-full bg-gradient-to-br from-rosegold to-copper shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)]">
              <span className="absolute left-1/2 top-[12%] h-[36%] w-[10%] -translate-x-1/2 rounded bg-deepplum/60" />
            </span>
            <span className="relative block h-[1.7vw] w-[1.7vw] rotate-45 rounded-full bg-gradient-to-br from-rosegold to-copper shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)]">
              <span className="absolute left-1/2 top-[12%] h-[36%] w-[10%] -translate-x-1/2 rounded bg-deepplum/60" />
            </span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="h-[0.35vw] w-[2.4vw] rounded-full bg-plum/35" />
            <span className="h-[0.35vw] w-[2.4vw] rounded-full bg-plum/35" />
          </div>
        </div>
      </div>
    </div>
  );
}
