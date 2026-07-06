/** A USC cardinal-red coffee mug with gold lettering and rising steam. */
export function USCMugArt() {
  return (
    <div className="relative aspect-[2/2.7] w-full">
      <div className="absolute inset-x-2 -bottom-0.5 h-3 rounded-[50%] bg-black/40 blur-md" />
      <svg viewBox="0 0 60 80" className="h-full w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]" aria-hidden>
        {/* rising steam wisps */}
        <path d="M22 24 Q24 14 22 7" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="2.2" strokeLinecap="round" className="anim-rise-fade" style={{ animationDelay: "0.1s" }} />
        <path d="M30 22 Q32 12 30 5" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="2" strokeLinecap="round" className="anim-rise-fade" style={{ animationDelay: "0.75s" }} />
        <path d="M38 24 Q40 14 38 7" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="2.2" strokeLinecap="round" className="anim-rise-fade" style={{ animationDelay: "0.42s" }} />

        {/* mug body */}
        <path d="M10 28 Q9 64 10 70 H50 Q51 64 50 28 Z" fill="#9b1b30" />

        {/* subtle highlight on body */}
        <path d="M14 28 Q13.5 50 14 60" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="3.5" strokeLinecap="round" />

        {/* mug rim */}
        <ellipse cx="30" cy="28" rx="20" ry="5.5" fill="#b52035" stroke="#7a1425" strokeWidth="1.4" />

        {/* coffee surface inside rim */}
        <ellipse cx="30" cy="28" rx="18.5" ry="4" fill="#2e1006" />

        {/* mug base */}
        <ellipse cx="30" cy="70" rx="20" ry="4.5" fill="#7a1425" />
        <ellipse cx="30" cy="71.5" rx="21.5" ry="3" fill="#4a0c1a" opacity="0.85" />

        {/* handle */}
        <path d="M49 38 Q67 38 67 49 Q67 62 49 62" fill="none" stroke="#9b1b30" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M49 38 Q63 38 63 49 Q63 60 49 60" fill="none" stroke="#c0253e" strokeWidth="3.5" strokeLinecap="round" />

        {/* USC lettering in cardinal gold */}
        <text x="30" y="53" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="15" fontWeight="bold" fill="#ffc72c" letterSpacing="2.5">USC</text>
      </svg>
    </div>
  );
}
