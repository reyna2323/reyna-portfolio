/** A small magnifying glass resting on the desk, glass catching a faint gleam. Purely ambient, non-interactive. */
export function MagnifyingGlassArt() {
  return (
    <div className="relative aspect-[4/5] w-full" aria-hidden>
      <div className="absolute inset-x-3 bottom-0 h-2.5 rounded-[50%] bg-black/35 blur-md" />
      <svg viewBox="0 0 60 76" className="h-full w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]">
        {/* handle */}
        <path d="M36 46 L52 68" stroke="var(--copper)" strokeWidth="6" strokeLinecap="round" />
        <path d="M36 46 L52 68" stroke="var(--rosegold)" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />

        {/* lens ring */}
        <circle cx="25" cy="25" r="21" fill="none" stroke="var(--copper)" strokeWidth="4" />
        <circle cx="25" cy="25" r="21" fill="none" stroke="var(--rosegold)" strokeWidth="1.2" opacity="0.6" />

        {/* glass, with a faint gleam sweep */}
        <circle cx="25" cy="25" r="18.5" fill="rgba(236,143,189,0.08)" />
        <path d="M14 12 A19 19 0 0 1 38 14" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />

        {/* what it's magnifying, for anyone who looks closely */}
        <text x="25" y="30" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="9" fill="var(--ink-muted)" opacity="0.55">
          0x68
        </text>
      </svg>
    </div>
  );
}
