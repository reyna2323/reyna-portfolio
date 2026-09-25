/** Little copper trophy with a shimmering ribbon medal — Awards. */
export function AwardsShelfArt() {
  return (
    <div className="relative aspect-[4/5] w-full">
      <div className="absolute inset-x-4 bottom-0 h-4 rounded-[50%] bg-black/35 blur-md" />
      {/* polish-shine sweep, clipped to its own layer so it never eats into
          the trophy's drop-shadow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[520%]" />
      </div>
      <svg viewBox="0 0 100 128" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]" aria-hidden>
        <defs>
          <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6d9c4" />
            <stop offset="1" stopColor="#c07a52" />
          </linearGradient>
        </defs>
        {/* medal ribbon */}
        <path d="M50 6 L34 40 L50 32 L66 40 Z" fill="var(--hotpink)" opacity="0.9" />
        <circle cx="50" cy="46" r="17" fill="url(#trophyGold)" stroke="#8c4a2e" strokeWidth="1.5" />
        <circle cx="50" cy="46" r="10.5" fill="none" stroke="#fff6ee" strokeWidth="1.4" opacity="0.8" />
        <path d="M45 42 l3 3 6 -7" fill="none" stroke="#fff6ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* trophy cup */}
        <path d="M32 72 h36 l-5 26 a13 13 0 0 1 -26 0 Z" fill="url(#trophyGold)" stroke="#8c4a2e" strokeWidth="1.5" />
        <path d="M32 74 c-10 0 -14 -14 -6 -20" fill="none" stroke="#8c4a2e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M68 74 c10 0 14 -14 6 -20" fill="none" stroke="#8c4a2e" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="42" y="98" width="16" height="9" fill="#8c4a2e" />
        <rect x="34" y="107" width="32" height="8" rx="2" fill="url(#trophyGold)" stroke="#8c4a2e" strokeWidth="1.5" />
        <text x="50" y="113" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="5" fill="#5c2f18" opacity="0.7">est. 2024</text>
        <circle cx="50" cy="46" r="3.4" fill="var(--led)" className="anim-led" style={{ filter: "drop-shadow(0 0 5px var(--led))" }} />
        {/* little celebratory sparkles orbiting the medal */}
        <circle cx="24" cy="20" r="1.4" fill="var(--pink)" className="anim-twinkle" style={{ animationDelay: "0.4s" }} />
        <circle cx="78" cy="24" r="1.2" fill="var(--lavender)" className="anim-twinkle" style={{ animationDelay: "1.1s" }} />
        <circle cx="14" cy="52" r="1" fill="var(--rosegold)" className="anim-twinkle" style={{ animationDelay: "1.8s" }} />
      </svg>
    </div>
  );
}
