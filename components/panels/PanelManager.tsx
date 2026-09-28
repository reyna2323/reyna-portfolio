"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import { pageMeta, type PageId } from "@/lib/content";
import { PanelShell, VARIANT_FAMILY } from "./PanelShell";
import { PANEL_META, PANEL_CONTENT, PageFooter } from "./SectionPanels";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface PanelManagerProps {
  activePanel: PageId | null;
  minimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
  dragConstraints: RefObject<HTMLElement | null>;
}

export function PanelManager({
  activePanel,
  minimized,
  onClose,
  onMinimize,
  onRestore,
  dragConstraints,
}: PanelManagerProps) {
  const meta = activePanel ? pageMeta(activePanel) : null;
  const Content = activePanel ? PANEL_CONTENT[activePanel] : null;
  const panelMeta = activePanel ? PANEL_META[activePanel] : null;
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-4 pb-16">
        {/* a watercolor bloom of ink spreads behind each page as it lands */}
        <AnimatePresence>
          {activePanel && !minimized && !reduced && (
            <motion.div
              key={`bloom-${activePanel}`}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] rounded-full blur-lg"
              style={{
                x: "-50%",
                y: "-50%",
                // a ring rather than a disc, so the colour travels out past the page's edges onto the desk
                background:
                  "radial-gradient(circle, transparent 40%, rgba(236,143,189,0.8) 51%, rgba(195,168,232,0.55) 57%, rgba(227,165,139,0.22) 63%, transparent 69%)",
              }}
              // the ring is timed to brighten just as it clears the page's edge, then ripple out across the desk
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 2.7], opacity: [0, 0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                scale: { duration: 1.7, ease: "easeOut" },
                opacity: { duration: 1.7, times: [0, 0.18, 0.42, 1], ease: "easeOut" },
              }}
            />
          )}
        </AnimatePresence>
        {/* "wait" lets the old page leave before the next one lands, like turning a page */}
        <AnimatePresence mode="wait">
          {activePanel && meta && Content && panelMeta && !minimized && (
            <PanelShell
              key={activePanel}
              title={meta.label}
              subtitle={meta.blurb}
              variant={panelMeta.variant}
              widthClass={panelMeta.wide ? "w-[min(94vw,880px)]" : undefined}
              onClose={onClose}
              onMinimize={onMinimize}
              dragConstraints={dragConstraints}
              footer={<PageFooter id={activePanel} family={VARIANT_FAMILY[panelMeta.variant]} />}
            >
              <Content />
            </PanelShell>
          )}
        </AnimatePresence>
      </div>

      {/* minimized tray chip */}
      <AnimatePresence>
        {activePanel && minimized && meta && (
          <motion.button
            type="button"
            onClick={onRestore}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full border border-pink/40 bg-deepplum/90 px-4 py-2 font-hand text-hand-md text-glass-strong shadow-lg backdrop-blur"
          >
            reopen &ldquo;{meta.label}&rdquo; ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
