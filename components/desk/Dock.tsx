"use client";

import { motion } from "framer-motion";
import { sections, startPage, type PageId } from "@/lib/content";
import { PANEL_META } from "@/components/panels/SectionPanels";

interface DockProps {
  activePanel: PageId | null;
  onSelect: (id: PageId) => void;
}

/** Persistent bottom dock — always-available direct access to every section. */
export function Dock({ activePanel, onSelect }: DockProps) {
  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 22 }}
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3"
    >
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-pink/25 bg-deepplum/70 px-2 py-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {[startPage, ...sections].map((s, i) => {
          const Icon = PANEL_META[s.id].icon;
          const active = activePanel === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              aria-label={i === 0 ? "Open the Start here page" : `Open page ${i}: ${s.label}`}
              aria-current={active ? "true" : undefined}
              className={`group relative flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 transition-colors ${
                active ? "bg-pink/25 text-glass-strong" : "text-glass-muted hover:bg-white/5 hover:text-glass-strong"
              }`}
            >
              <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-active:scale-90">
                <Icon size={16} aria-hidden />
              </span>
              <span className="text-xs font-medium leading-none">{i === 0 ? "Start" : s.label}</span>
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-pink/15"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
            </button>
          );
        }).flatMap((el, i) =>
          // a thin divider sets the contents page apart from the numbered pages
          i === 0 ? [el, <span key="divider" aria-hidden className="mx-1 h-7 w-px shrink-0 bg-pink/25" />] : [el],
        )}
      </div>
    </motion.nav>
  );
}
