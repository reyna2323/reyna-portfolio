"use client";

import { motion } from "framer-motion";
import { sections, type SectionId } from "@/lib/content";
import { PANEL_META } from "@/components/panels/SectionPanels";

interface DockProps {
  activePanel: SectionId | null;
  onSelect: (id: SectionId) => void;
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
        {sections.map((s) => {
          const Icon = PANEL_META[s.id].icon;
          const active = activePanel === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              aria-label={`Open ${s.label} section`}
              aria-current={active ? "true" : undefined}
              className={`group relative flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 transition-colors ${
                active ? "bg-pink/25 text-glass-strong" : "text-glass-muted hover:bg-white/5 hover:text-glass-strong"
              }`}
            >
              <Icon size={16} aria-hidden />
              <span className="text-desk-micro font-medium leading-none">{s.label}</span>
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-pink/15"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
