/** A pink-soldermask single-board computer with glowing traces. */
export function PiBoardArt() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 200 132" className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]" aria-hidden>
        <defs>
          <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7bcd8" />
            <stop offset="1" stopColor="#ee92bf" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3c4ad" />
            <stop offset="1" stopColor="#c07a52" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="196" height="128" rx="10" fill="url(#pcb)" stroke="#d67ba8" strokeWidth="2" />
        {/* mounting holes */}
        {[
          [14, 14],
          [186, 14],
          [14, 118],
          [186, 118],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5.5" fill="var(--copper)" opacity="0.9" />
            <circle cx={cx} cy={cy} r="3" fill="#fdf2f7" />
          </g>
        ))}
        {/* traces */}
        <g fill="none" strokeWidth="1.6" strokeLinecap="round">
          <path d="M60 66 H40 V40 H26 M60 74 H36 V98 H26 M140 60 H160 V34 h14 M140 78 h24 v22 h12 M100 46 V30 H70 M100 86 v18 h34" stroke="#ffd9eb" opacity="0.9" />
          <path
            d="M60 66 H40 V40 H26 M60 74 H36 V98 H26 M140 60 H160 V34 h14 M140 78 h24 v22 h12 M100 46 V30 H70 M100 86 v18 h34"
            stroke="#ffffff"
            strokeDasharray="4 30"
            className="anim-dash"
            opacity="0.9"
          />
        </g>
        {/* SoC */}
        <rect x="62" y="48" width="76" height="38" rx="5" fill="#3a2140" stroke="#55305c" strokeWidth="2" />
        <text x="100" y="70" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="9" fill="#f8d9e6">
          RYN-4B ♡
        </text>
        {/* GPIO header */}
        <g fill="#3a2140">
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <rect x={22 + i * 8} y={8} width="4.5" height="4.5" rx="1" />
              <rect x={22 + i * 8} y={15} width="4.5" height="4.5" rx="1" />
            </g>
          ))}
        </g>
        {/* ports */}
        <rect x="188" y="42" width="10" height="20" rx="2" fill="url(#metal)" />
        <rect x="188" y="72" width="10" height="20" rx="2" fill="url(#metal)" />
        <rect x="2" y="56" width="9" height="24" rx="2" fill="url(#metal)" />
        {/* capacitors */}
        <circle cx="46" cy="112" r="7" fill="#c9b2e9" stroke="#a274d6" strokeWidth="1.5" />
        <circle cx="64" cy="112" r="5" fill="#c9b2e9" stroke="#a274d6" strokeWidth="1.5" />
        {/* status LEDs, with a soft expanding ring behind the power light */}
        <circle cx="160" cy="114" r="8" fill="none" stroke="var(--led)" strokeWidth="0.8" className="anim-ring-pulse" style={{ transformOrigin: "160px 114px" }} />
        <circle cx="160" cy="114" r="3.4" fill="var(--led)" className="anim-led" style={{ filter: "drop-shadow(0 0 5px var(--led))" }} />
        <circle
          cx="172"
          cy="114"
          r="3.4"
          fill="var(--mintled)"
          className="anim-led"
          style={{ filter: "drop-shadow(0 0 5px var(--mintled))", animationDelay: "1.2s" }}
        />
        <text x="140" y="124" fontFamily="var(--font-geist-mono)" fontSize="6" fill="#8c4a6e">
          PWR ACT
        </text>
        {/* GPIO pin 1 callout, a habit picked up the first time someone reverse-wires a board */}
        <text x="10" y="6" fontFamily="var(--font-caveat)" fontSize="6" fill="var(--copper)" opacity="0.75">pin1 ●</text>
        <path d="M18 8 L22 12" stroke="var(--copper)" strokeWidth="0.8" opacity="0.6" />
      </svg>
      {/* hand-labeled masking-tape sticker, the kind every prototype board earns */}
      <span
        className="anim-tag-swing pointer-events-none absolute -bottom-[6%] left-[4%] rounded-sm px-[6%] py-[2%] font-hand text-desk-micro text-ink-muted shadow-sm"
        style={{ background: "rgba(250,243,232,0.88)", transform: "rotate(-3deg)", transformOrigin: "top left" }}
      >
        prototype v3
      </span>
    </div>
  );
}
