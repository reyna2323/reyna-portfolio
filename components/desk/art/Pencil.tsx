/** Decorative mechanical pencil resting diagonally on the desk (ambient, non-interactive). */
export function PencilArt() {
  return (
    <svg viewBox="0 0 160 24" className="w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]" aria-hidden>
      <rect x="18" y="8" width="120" height="8" rx="4" fill="var(--rosegold)" />
      <rect x="18" y="8" width="120" height="3" rx="1.5" fill="#ffffff" opacity="0.35" />
      <rect x="4" y="7" width="18" height="10" rx="3" fill="var(--plum)" />
      <path d="M138 8 L154 12 L138 16 Z" fill="#4a4a4a" />
      <circle cx="154" cy="12" r="1.6" fill="#2b2b2b" />
      <rect x="55" y="8" width="10" height="8" fill="var(--hotpink)" opacity="0.5" />
      {/* faint ruler tick marks, an old habit from measuring trace widths */}
      {[30, 78, 100, 122].map((x) => (
        <line key={x} x1={x} y1="16" x2={x} y2="18.5" stroke="var(--plum)" strokeWidth="0.8" opacity="0.45" />
      ))}
      {/* graphite shavings scattered near the sharpened tip */}
      <circle cx="158" cy="15" r="0.8" fill="#4a4a4a" opacity="0.4" />
      <circle cx="156" cy="18" r="0.6" fill="#4a4a4a" opacity="0.3" />
    </svg>
  );
}
