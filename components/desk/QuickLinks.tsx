"use client";

import { site, type PageId } from "@/lib/content";

/** Always-visible shortcuts to what a recruiter with fifteen seconds wants:
 *  the research, the résumé, and a way to get in touch. Outlined, because on
 *  this site outlined means clickable. */
export function QuickLinks({ onOpen, className = "" }: { onOpen: (id: PageId) => void; className?: string }) {
  const pill =
    "rounded-full border border-pink/45 bg-deepplum/85 px-2.5 py-0.5 text-xs font-semibold text-glass-strong transition-colors hover:border-pink hover:bg-plum pointer-coarse:px-3.5 pointer-coarse:py-2";
  return (
    <nav aria-label="Quick links" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <button type="button" onClick={() => onOpen("research")} className={pill}>
        research
      </button>
      <button type="button" onClick={() => onOpen("experience")} className={pill}>
        résumé
      </button>
      {site.resumePdf && (
        <a href={site.resumePdf} target="_blank" rel="noreferrer" className={pill}>
          PDF ↗<span className="sr-only"> (résumé, opens in a new tab)</span>
        </a>
      )}
      <button type="button" onClick={() => onOpen("contact")} className={pill}>
        contact
      </button>
    </nav>
  );
}
