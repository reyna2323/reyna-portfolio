/** Pearl breadboard with a resistor, a glowing LED and jumper wires. */
export function BreadboardArt() {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 220 122" className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]" aria-hidden>
        <defs>
          <pattern id="bbholes" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="#d9bfd2" />
          </pattern>
        </defs>
        <rect x="2" y="2" width="216" height="118" rx="9" fill="#fdf4f9" stroke="#e6c8dc" strokeWidth="2" />
        {/* power rails */}
        <line x1="14" y1="13" x2="206" y2="13" stroke="var(--hotpink)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="20" x2="206" y2="20" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="102" x2="206" y2="102" stroke="var(--hotpink)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="109" x2="206" y2="109" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
        {/* hole banks */}
        <rect x="12" y="28" width="196" height="28" fill="url(#bbholes)" />
        <rect x="12" y="64" width="196" height="28" fill="url(#bbholes)" />
        {/* center channel */}
        <rect x="10" y="57" width="200" height="6" rx="3" fill="#f1dcEA" opacity="0.9" />
        {/* resistor across the channel */}
        <g transform="translate(58 60) rotate(-90)">
          <line x1="-14" y1="0" x2="30" y2="0" stroke="#b9a6b8" strokeWidth="1.6" />
          <rect x="-4" y="-5" width="24" height="10" rx="5" fill="#f0ddc4" stroke="#d9bd97" />
          <rect x="1" y="-5" width="3" height="10" fill="#c94f7c" />
          <rect x="7" y="-5" width="3" height="10" fill="#7b4fc9" />
          <rect x="13" y="-5" width="3" height="10" fill="#c07a52" />
        </g>
        {/* LED, with a soft pulse ring so it reads as "on" even mid-blink */}
        <g transform="translate(150 52)">
          <line x1="-3" y1="6" x2="-3" y2="20" stroke="#b9a6b8" strokeWidth="1.6" />
          <line x1="3" y1="6" x2="3" y2="24" stroke="#b9a6b8" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="7" fill="none" stroke="var(--led)" strokeWidth="1" className="anim-ring-pulse" style={{ transformOrigin: "0 0" }} />
          <circle cx="0" cy="0" r="7" fill="var(--led)" className="anim-led" style={{ filter: "drop-shadow(0 0 7px var(--led))" }} />
          <circle cx="0" cy="0" r="7" fill="none" stroke="#e76bab" strokeWidth="1.5" />
        </g>

        {/* tiny 8-pin IC chip, straddling the center channel */}
        <g transform="translate(78 55)">
          <rect x="0" y="0" width="26" height="14" rx="1.5" fill="#3a2140" stroke="#241428" strokeWidth="1" />
          <circle cx="4" cy="7" r="1.4" fill="#5c3866" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line x1={4 + i * 6} y1="0" x2={4 + i * 6} y2="-4" stroke="#9aa0a6" strokeWidth="1.4" />
              <line x1={4 + i * 6} y1="14" x2={4 + i * 6} y2="18" stroke="#9aa0a6" strokeWidth="1.4" />
            </g>
          ))}
          <text x="13" y="10" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="4.5" fill="#e8c9db">555</text>
        </g>
        {/* jumper wires */}
        <g fill="none" strokeWidth="3" strokeLinecap="round">
          <path d="M30 13 C34 34 48 30 52 44" stroke="var(--copper)" />
          <path d="M96 44 C104 24 132 22 147 45" stroke="var(--orchid)" />
          <path d="M170 74 C186 84 190 92 192 102" stroke="var(--hotpink)" />
          <path d="M96 44 C104 24 132 22 147 45" stroke="#ffffff" strokeWidth="1.4" strokeDasharray="4 26" className="anim-dash" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
