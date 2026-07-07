"use client";

import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { sections, site, type SectionId } from "@/lib/content";
import { PANEL_META, PANEL_CONTENT } from "@/components/panels/SectionPanels";
import type { PanelVariant } from "@/components/panels/PanelShell";
import { Atmosphere } from "./Atmosphere";

const SECTION_ACCENT: Record<SectionId, string> = {
  about: "text-hotpink",
  hardware: "text-circuit",
  software: "text-orchid",
  ml: "text-lavender",
  teaching: "text-rose-ink",
  awards: "text-copper-ink",
  resume: "text-copper-ink",
  contact: "text-hotpink",
};

const TILE_GLOW: Record<SectionId, string> = {
  about: "shadow-[0_4px_24px_rgba(236,72,153,0.18)]",
  hardware: "shadow-[0_4px_24px_rgba(125,232,194,0.15)]",
  software: "shadow-[0_4px_24px_rgba(192,132,252,0.15)]",
  ml: "shadow-[0_4px_24px_rgba(196,170,232,0.15)]",
  teaching: "shadow-[0_4px_24px_rgba(236,72,153,0.15)]",
  awards: "shadow-[0_4px_24px_rgba(178,132,80,0.15)]",
  resume: "shadow-[0_4px_24px_rgba(178,132,80,0.15)]",
  contact: "shadow-[0_4px_24px_rgba(236,72,153,0.18)]",
};

const SHEET_BG: Record<PanelVariant, string> = {
  notebook: "bg-paper graph-paper",
  folder: "bg-gradient-to-b from-folder to-folder-dark",
  window: "bg-gradient-to-b from-[#2a1830] to-[#1f0f27]",
  schematic: "bg-[#150c1c]",
  casefile: "bg-gradient-to-b from-paper to-blush ruled-lines",
};

const SHEET_DARK: Record<PanelVariant, boolean> = {
  notebook: false,
  folder: false,
  window: true,
  schematic: true,
  casefile: false,
};

export function MobileDashboard() {
  const [open, setOpen] = useState<SectionId | null>(null);

  const close = () => setOpen(null);

  const activeMeta = open ? PANEL_META[open] : null;
  const activeSection = open ? sections.find((s) => s.id === open) : null;
  const Content = open ? PANEL_CONTENT[open] : null;
  const ActiveIcon = activeMeta?.icon ?? null;
  const isDark = activeMeta ? SHEET_DARK[activeMeta.variant] : false;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90) close();
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-deepplum via-[#301c3a] to-plum">
      <Atmosphere />

      {/* header */}
      <header className="relative z-10 px-5 pb-4 pt-12 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-orchid anim-sparkle" style={{ fontSize: 13, opacity: 0.72 }} aria-hidden>✦</span>
          <p className="font-hand text-hand-xl text-blush drop-shadow-md">{site.name}</p>
          <span className="text-lavender anim-sparkle" style={{ fontSize: 11, opacity: 0.58, animationDelay: "1.6s" }} aria-hidden>✧</span>
        </div>
        <p className="mt-1 font-hand text-hand-sm text-lavender/75">{site.tagline}</p>
        <p className="mt-2 font-hand text-desk-label text-glass-muted anim-pulse-glow" style={{ opacity: 0.65 }}>
          ✦ tap anything to explore
        </p>
      </header>

      {/* section grid */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
        <div className="grid grid-cols-2 gap-3">
          {sections.map((section) => {
            const meta = PANEL_META[section.id];
            const Icon = meta.icon;
            const accent = SECTION_ACCENT[section.id];
            const glow = TILE_GLOW[section.id];
            return (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => setOpen(section.id)}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className={`flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-left backdrop-blur-sm ${glow}`}
              >
                <Icon size={20} className={accent} aria-hidden />
                <div>
                  <p className={`font-hand text-hand-md leading-tight ${accent}`}>{section.hand}</p>
                  <p className="mt-0.5 text-[0.68rem] leading-snug text-glass-muted opacity-70">
                    {section.blurb}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* dim backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* bottom sheet */}
      <AnimatePresence>
        {open && activeMeta && Content && activeSection && (
          <motion.div
            key={open}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.25 }}
            onDragEnd={onDragEnd}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-3xl shadow-[0_-28px_72px_rgba(0,0,0,0.6)] ${SHEET_BG[activeMeta.variant]}`}
          >
            {/* drag pill */}
            <div className="flex justify-center pt-3 pb-1">
              <div className={`h-[4px] w-10 rounded-full ${isDark ? "bg-white/20" : "bg-black/15"}`} />
            </div>

            {/* sheet header */}
            <div
              className={`flex items-center justify-between border-b px-5 py-3 ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {ActiveIcon && open && (
                  <ActiveIcon size={16} className={SECTION_ACCENT[open]} aria-hidden />
                )}
                <div>
                  <p className={`text-sm font-semibold ${isDark ? "text-glass-strong" : "text-ink-strong"}`}>
                    {activeSection.label}
                  </p>
                  <p className={`font-hand text-hand-sm leading-none ${isDark ? "text-glass-muted" : "text-ink-muted"}`}>
                    {activeSection.blurb}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className={`rounded-full p-2 transition-colors ${
                  isDark
                    ? "text-glass-muted hover:bg-white/10"
                    : "text-ink-muted hover:bg-black/10"
                }`}
              >
                <X size={16} />
              </button>
            </div>

            {/* scrollable content */}
            <div className="panel-scroll flex-1 overflow-y-auto px-5 py-4" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
              <Content />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
