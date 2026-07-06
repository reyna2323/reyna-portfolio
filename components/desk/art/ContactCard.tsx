/** Envelope with wax seal, postage stamp, and return-address social handles. */
export function ContactCardArt() {
  return (
    <div className="relative aspect-[3/2] w-full">
      <div className="absolute inset-x-4 -bottom-1 h-4 rounded-[50%] bg-black/35 blur-md" />
      <svg viewBox="0 0 120 80" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]" aria-hidden>
        {/* envelope body */}
        <rect x="2" y="2" width="116" height="76" rx="6" fill="var(--paper)" stroke="var(--pink)" strokeWidth="2" />

        {/* envelope flap fold lines */}
        <path d="M4 6 L60 44 L116 6" fill="none" stroke="var(--orchid)" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 74 L44 42" fill="none" stroke="var(--orchid)" strokeWidth="1.4" opacity="0.48" />
        <path d="M116 74 L76 42" fill="none" stroke="var(--orchid)" strokeWidth="1.4" opacity="0.48" />

        {/* postage stamp — top right corner (authentic envelope detail) */}
        <rect x="94" y="5" width="20" height="22" rx="1.5" fill="var(--blush)" stroke="var(--pink)" strokeWidth="0.7" strokeDasharray="2 1.5" />
        <text x="104" y="14" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="7" fill="var(--hotpink)">♡</text>
        <text x="104" y="23" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="var(--ink-muted)">USC</text>

        {/* return address block — uses code-bracket and [in] sigils */}
        <text x="7" y="16" fontFamily="var(--font-caveat)" fontSize="6.5" fill="var(--ink-strong)" fontWeight="600">Reyna Patel</text>
        <text x="7" y="26" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--orchid)">✉ reynapat@usc.edu</text>

        {/* wax seal — centered on the flap crease */}
        <circle cx="60" cy="42" r="10" fill="var(--hotpink)" />
        <path
          d="M60 47 c-4 -4 -7 -6 -7 -9 a3.5 3.5 0 0 1 7 -1.5 a3.5 3.5 0 0 1 7 1.5 c0 3 -3 5 -7 9Z"
          fill="var(--petal)"
        />

        {/* social handles as code-bracket + [in] stamps below seal */}
        <text x="7" y="58" fontFamily="var(--font-geist-mono)" fontSize="6.2" fill="var(--orchid)">
          {`{ }`} /reyna2323
        </text>
        <text x="7" y="70" fontFamily="var(--font-geist-mono)" fontSize="6.2" fill="var(--ink-muted)">
          [in] /reynapatelegv
        </text>
        {/* tiny "sent with love" scribble tucked in the corner */}
        <text x="100" y="66" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5.5" fill="var(--rose-ink)" opacity="0.75">
          sent w/ ♡
        </text>
        <circle cx="14" cy="60" r="1" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "0.9s" }} />
      </svg>
    </div>
  );
}
