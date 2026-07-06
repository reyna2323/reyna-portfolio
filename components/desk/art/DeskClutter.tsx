/** A small scattering of desk ephemera: paperclips, a washi tape curl, a pushpin. Purely ambient, non-interactive. */
export function DeskClutterArt() {
  return (
    <div className="relative aspect-[3/1.4] w-full" aria-hidden>
      <svg viewBox="0 0 120 56" className="h-full w-full opacity-90">
        {/* washi tape curl, torn off and left behind */}
        <g transform="translate(4 6) rotate(-10)">
          <rect x="0" y="0" width="30" height="10" rx="1" fill="rgba(230,200,240,0.75)" />
          <rect x="0" y="0" width="30" height="10" rx="1" fill="none" stroke="rgba(195,168,232,0.5)" strokeWidth="0.6" />
          <path d="M0 3 h30 M0 7 h30" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        </g>

        {/* two paperclips, casually crossed */}
        <g transform="translate(52 8) rotate(8)">
          <path d="M9 2 a5 5 0 0 1 5 5 v16 a3.3 3.3 0 0 1 -6.6 0 V9 a1.6 1.6 0 0 1 3.2 0 v13" fill="none" stroke="#b8bec4" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <g transform="translate(62 14) rotate(-30)">
          <path d="M9 2 a5 5 0 0 1 5 5 v16 a3.3 3.3 0 0 1 -6.6 0 V9 a1.6 1.6 0 0 1 3.2 0 v13" fill="none" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        </g>

        {/* pushpin, stuck at a jaunty angle */}
        <g transform="translate(94 10)">
          <line x1="4" y1="4" x2="10" y2="16" stroke="#8c8c8c" strokeWidth="1.2" />
          <circle cx="4" cy="4" r="5.5" fill="var(--hotpink)" opacity="0.9" />
          <circle cx="2.2" cy="2.2" r="1.6" fill="#ffffff" opacity="0.35" />
        </g>

        {/* a stray pencil tick mark, like someone was counting something */}
        <text x="4" y="46" fontFamily="var(--font-caveat)" fontSize="7" fill="var(--glass-muted)" opacity="0.55">
          |||| ||
        </text>
      </svg>
    </div>
  );
}
