/** Ambient copper wires threading across the desk with traveling signal pulses. */
export function WiresArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="wireFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--copper)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--copper)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--copper)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        "M0 40 C 200 10, 300 90, 500 60 S 800 20, 1000 55",
        "M0 130 C 250 170, 400 90, 550 130 S 850 170, 1000 120",
        "M0 90 C 150 60, 350 140, 500 100 S 750 60, 1000 90",
      ].map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="url(#wireFade)" strokeWidth="2" />
          <path
            d={d}
            fill="none"
            stroke="var(--led)"
            strokeWidth="2.4"
            strokeDasharray="2 90"
            className="anim-dash"
            style={{ animationDuration: `${4 + i}s`, animationDelay: `${i * 0.7}s` }}
            opacity="0.85"
          />
        </g>
      ))}
      {/* junction nodes, blinking softly like something is still listening */}
      {[
        [500, 60],
        [550, 130],
        [500, 100],
      ].map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="var(--led)"
          className="anim-led"
          style={{ animationDelay: `${i * 0.8}s`, filter: "drop-shadow(0 0 4px var(--led))" }}
          opacity="0.7"
        />
      ))}
    </svg>
  );
}
