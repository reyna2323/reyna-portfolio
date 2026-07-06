/** A manila lab folder with a paperclip — Resume. */
export function CaseFileTabArt() {
  return (
    <div className="relative aspect-[5/3.6] w-full">
      <div className="absolute inset-x-4 -bottom-1 h-4 rounded-[50%] bg-black/35 blur-md" />
      <div className="absolute inset-x-[4%] top-0 h-[18%] w-[42%] rounded-t-md bg-rosegold/90" />
      <div className="absolute inset-0 top-[10%] rounded-md rounded-tl-none border border-copper/40 bg-gradient-to-b from-[#f3d9c4] to-[#eac9ab] shadow-[0_12px_22px_-10px_rgba(0,0,0,0.5)]">
        {/* coffee ring, because every good document has one */}
        <div
          className="pointer-events-none absolute bottom-[8%] right-[10%] h-[22%] w-[16%] rounded-full"
          style={{ border: "2px solid rgba(108,58,18,0.16)" }}
          aria-hidden
        />
        <div className="flex h-full flex-col justify-between p-[10%]">
          <div>
            <p className="font-hand text-hand-lg text-ink-strong">résumé.pdf</p>
            <p className="mt-[2%] font-mono text-desk-micro text-ink-muted">confidential-ish · v2026</p>
          </div>
          <div className="flex items-center gap-[6%]">
            <span className="h-[10%] w-[22%] rounded-sm bg-plum/15" />
            <span className="h-[10%] w-[34%] rounded-sm bg-plum/15" />
          </div>
        </div>
        {/* corner stamp, slightly crooked like it was pressed in a hurry */}
        <span
          className="pointer-events-none absolute right-[8%] top-[10%] -rotate-[10deg] rounded-sm border-2 px-[4%] py-[1%] font-hand text-desk-micro"
          style={{ borderColor: "rgba(181,47,118,0.45)", color: "var(--rose-ink)", opacity: 0.65 }}
          aria-hidden
        >
          reviewed ✓
        </span>
        {/* paperclip */}
        <svg viewBox="0 0 24 40" className="absolute -right-[6%] top-[6%] h-[46%]" aria-hidden>
          <path
            d="M12 4 a6 6 0 0 1 6 6 v18 a4 4 0 0 1 -8 0 V10 a2 2 0 0 1 4 0 v16"
            fill="none"
            stroke="#9aa0a6"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
