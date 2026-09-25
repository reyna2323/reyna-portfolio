/** A small idle desk robot, blinking every few seconds. `waving` lifts its
 *  arm and pops up a tiny speech bubble — a reward for saying hello. */
export function RobotCompanionArt({ waving = false }: { waving?: boolean }) {
  return (
    <div className="relative aspect-[3/4] w-full" aria-hidden>
      <div className="absolute inset-x-3 bottom-0 h-2.5 rounded-[50%] bg-black/35 blur-md" />
      <svg viewBox="0 0 60 80" className="h-full w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]" style={{ overflow: "visible" }}>
        {waving && (
          <g className="anim-rise-fade" style={{ animationDuration: "1.6s" }}>
            <path d="M14 6 q16 -10 32 0 q-2 6 -16 6 q-14 0 -16 -6 Z" fill="var(--petal)" stroke="var(--orchid)" strokeWidth="1" />
            <text x="30" y="9" textAnchor="middle" fontFamily="var(--font-caveat)" fontSize="7" fill="var(--rose-ink)">
              hi! ♡
            </text>
          </g>
        )}

        {/* antenna */}
        <line x1="30" y1="20" x2="30" y2="9" stroke="var(--orchid)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="7" r="3.2" fill="none" stroke="var(--led)" strokeWidth="1" className="anim-ring-pulse" style={{ transformOrigin: "30px 7px" }} />
        <circle cx="30" cy="7" r="2.4" fill="var(--led)" className="anim-led" style={{ filter: "drop-shadow(0 0 4px var(--led))" }} />

        {/* head */}
        <rect x="12" y="20" width="36" height="26" rx="8" fill="var(--lilac)" stroke="var(--orchid)" strokeWidth="2" />
        <rect x="17" y="26" width="26" height="12" rx="5" fill="var(--deepplum)" opacity="0.85" />
        {/* eyes, blinking on their own rhythm */}
        <circle cx="24" cy="32" r="2.6" fill="var(--hotpink)" className="anim-eye-blink" />
        <circle cx="36" cy="32" r="2.6" fill="var(--hotpink)" className="anim-eye-blink" style={{ animationDelay: "0.15s" }} />

        {/* body */}
        <rect x="17" y="46" width="26" height="22" rx="6" fill="var(--rosegold)" stroke="var(--copper)" strokeWidth="1.6" />
        <circle cx="30" cy="57" r="4" fill="none" stroke="var(--copper)" strokeWidth="1.2" opacity="0.7" />
        <circle cx="30" cy="57" r="1.4" fill="var(--mintled)" className="anim-led" style={{ animationDelay: "0.8s" }} />

        {/* arms */}
        <path
          d="M17 52 Q7 54 8 62"
          fill="none"
          stroke="var(--copper)"
          strokeWidth="3"
          strokeLinecap="round"
          className={waving ? undefined : undefined}
          style={waving ? { transformOrigin: "17px 52px", transform: "rotate(-35deg)", transition: "transform 0.3s ease-out" } : { transition: "transform 0.3s ease-out" }}
        />
        <path d="M43 52 Q53 56 52 64" fill="none" stroke="var(--copper)" strokeWidth="3" strokeLinecap="round" />

        {/* feet */}
        <rect x="19" y="68" width="8" height="6" rx="2" fill="var(--copper)" />
        <rect x="33" y="68" width="8" height="6" rx="2" fill="var(--copper)" />
      </svg>
    </div>
  );
}
