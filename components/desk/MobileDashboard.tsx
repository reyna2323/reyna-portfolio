"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { sections, site, isPageId, type PageId, type SectionId } from "@/lib/content";
import { PageNavProvider, writeHash } from "@/lib/pageNav";
import { PANEL_META, PANEL_CONTENT, PageFooter, StartIntro } from "@/components/panels/SectionPanels";
import { VARIANT_FAMILY, type PanelVariant } from "@/components/panels/PanelShell";
import { Atmosphere } from "./Atmosphere";

/* tile accents sit on the dark desk, so they use colors that read on plum */
const SECTION_ACCENT: Record<SectionId, string> = {
  about: "text-pink",
  experience: "text-rosegold",
  research: "text-lavender",
  projects: "text-pink",
  skills: "text-circuit",
  awards: "text-rosegold",
  contact: "text-pink",
};

const TILE_GLOW: Record<SectionId, string> = {
  about: "shadow-[0_4px_24px_rgba(236,72,153,0.18)]",
  experience: "shadow-[0_4px_24px_rgba(178,132,80,0.15)]",
  research: "shadow-[0_4px_24px_rgba(196,170,232,0.15)]",
  projects: "shadow-[0_4px_24px_rgba(192,132,252,0.15)]",
  skills: "shadow-[0_4px_24px_rgba(125,232,194,0.15)]",
  awards: "shadow-[0_4px_24px_rgba(178,132,80,0.15)]",
  contact: "shadow-[0_4px_24px_rgba(236,72,153,0.18)]",
};

const SHEET_BG: Record<PanelVariant, string> = {
  notebook: "bg-paper graph-paper",
  folder: "bg-gradient-to-b from-folder to-folder-dark",
  window: "bg-gradient-to-b from-[#2a1830] to-[#1f0f27]",
  schematic: "bg-[#150c1c]",
  casefile: "bg-blush ruled-lines",
};

export function MobileDashboard() {
  const [open, setOpen] = useState<SectionId | null>(null);

  // On a phone the landing screen *is* the start page, so "start" just closes the sheet.
  const show = useCallback((id: PageId) => {
    const next = id === "start" ? null : id;
    setOpen(next);
    writeHash(next);
  }, []);
  const close = useCallback(() => show("start"), [show]);
  const nav = useMemo(() => ({ open: show, close }), [show, close]);

  // shared links like /#projects open straight to that page
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (isPageId(h)) show(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [show]);

  const activeMeta = open ? PANEL_META[open] : null;
  const activeSection = open ? sections.find((s) => s.id === open) : null;
  const Content = open ? PANEL_CONTENT[open] : null;
  const ActiveIcon = activeMeta?.icon ?? null;
  const isDark = activeMeta ? VARIANT_FAMILY[activeMeta.variant] === "dark" : false;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90) close();
  };

  return (
    <PageNavProvider value={nav}>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-deepplum via-[#301c3a] to-plum">
        <Atmosphere />

        {/* header */}
        <header className="relative z-10 px-5 pb-3 pt-10 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-orchid anim-sparkle" style={{ fontSize: 13, opacity: 0.72 }} aria-hidden>✦</span>
            <h1 className="font-hand text-hand-xl text-blush drop-shadow-md">{site.name}</h1>
            <span className="text-lavender anim-sparkle" style={{ fontSize: 11, opacity: 0.58, animationDelay: "1.6s" }} aria-hidden>✧</span>
          </div>
          <p className="mt-0.5 text-sm tracking-[0.06em] text-glass-muted">computer engineering &amp; CS @ USC</p>
        </header>

        <div className="relative z-10 flex-1 overflow-y-auto px-4" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
          {/* who I am, before anything else */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
            <StartIntro tone="dark" />
          </div>

          {/* contents: numbered in reading order, tap any page */}
          <h2 className="mb-2 mt-5 flex items-baseline justify-between px-1">
            <span className="font-hand text-hand-lg text-blush">contents</span>
            <span className="font-hand text-hand-sm text-glass-muted anim-pulse-glow">✦ tap a page to open it</span>
          </h2>
          <ol className="grid grid-cols-2 gap-3">
            {sections.map((section, i) => {
              const meta = PANEL_META[section.id];
              const Icon = meta.icon;
              const accent = SECTION_ACCENT[section.id];
              const glow = TILE_GLOW[section.id];
              const last = i === sections.length - 1 && sections.length % 2 === 1;
              return (
                <li key={section.id} className={last ? "col-span-2" : undefined}>
                  <motion.button
                    type="button"
                    onClick={() => show(section.id)}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className={`flex h-full w-full flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-left backdrop-blur-sm ${glow}`}
                  >
                    <span className="flex w-full items-center justify-between">
                      <Icon size={20} className={accent} aria-hidden />
                      <span className="font-mono text-xs text-glass-muted">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span>
                      <span className={`block text-base font-semibold leading-tight ${accent}`}>{section.label}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-glass-soft">{section.blurb}</span>
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ol>
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
              role="dialog"
              aria-labelledby="sheet-title"
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
                    <h2 id="sheet-title" className={`text-base font-semibold ${isDark ? "text-glass-strong" : "text-ink-strong"}`}>
                      {activeSection.label}
                    </h2>
                    <p className={`font-hand text-hand-sm leading-none ${isDark ? "text-glass-muted" : "text-ink-muted"}`}>
                      {activeSection.blurb}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={`Close ${activeSection.label}`}
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
              <div className="panel-scroll min-h-0 flex-1 overflow-y-auto px-5 py-4">
                <Content />
              </div>
              <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
                <PageFooter id={open} family={isDark ? "dark" : "light"} onStart={close} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageNavProvider>
  );
}
