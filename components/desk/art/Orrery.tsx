/** A miniature desk orrery: a ringed planet paperweight with a moon in slow
 *  orbit. `spun` briefly whips the moon around fast, a reward for clicking
 *  something that looks like it's just sitting there for decoration. */
export function OrreryArt({ spun = false }: { spun?: boolean }) {
  return (
    <div className="relative aspect-square w-full" aria-hidden>
      <div className="absolute inset-x-3 bottom-0 h-3 rounded-[50%] bg-black/35 blur-md" />
      <svg viewBox="0 0 80 80" className="h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        {/* glass dome base */}
        <ellipse cx="40" cy="66" rx="22" ry="6" fill="var(--plum)" opacity="0.55" />
        <path d="M20 66 V58 a20 12 0 0 1 40 0 v8" fill="none" stroke="var(--lavender)" strokeWidth="1.2" opacity="0.4" />

        {/* orbit ring, drawn so the moon riding on it reads as a real path */}
        <ellipse cx="40" cy="34" rx="30" ry="10" fill="none" stroke="var(--lavender)" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 3" />

        {/* planet */}
        <circle cx="40" cy="34" r="13" fill="var(--orchid)" />
        <circle cx="40" cy="34" r="13" fill="url(#orreryShade)" />
        <ellipse cx="40" cy="34" rx="20" ry="5.5" fill="none" stroke="var(--rosegold)" strokeWidth="1.6" opacity="0.85" />
        <defs>
          <radialGradient id="orreryShade" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="var(--lilac)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--deepplum)" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* moon, orbiting via a slowly rotating parent group offset from the
            planet's center — spins fast for a couple of laps when poked */}
        <g
          className="anim-rotate-slow"
          style={{ transformOrigin: "40px 34px", animationDuration: spun ? "0.7s" : undefined }}
        >
          <circle cx="70" cy="34" r="3.4" fill="var(--rosegold)" />
          <circle cx="70" cy="34" r="1" fill="var(--copper)" opacity="0.6" />
          {spun && <circle cx="70" cy="34" r="6" fill="none" stroke="var(--led)" strokeWidth="0.8" opacity="0.6" />}
        </g>

        {/* tiny stars scattered around the dome */}
        <circle cx="14" cy="16" r="1" fill="var(--glass-strong)" className="anim-twinkle" style={{ animationDelay: "0.3s" }} />
        <circle cx="63" cy="12" r="0.8" fill="var(--glass-strong)" className="anim-twinkle" style={{ animationDelay: "1.4s" }} />
        <circle cx="8" cy="42" r="0.7" fill="var(--glass-strong)" className="anim-twinkle" style={{ animationDelay: "2.1s" }} />

        <text x="40" y="76" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="6" fill="var(--glass-muted)" opacity="0.7">
          {spun ? "wheee ✦" : "world no. 2"}
        </text>
      </svg>
    </div>
  );
}
