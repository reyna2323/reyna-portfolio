"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import { pageMeta, type PageId } from "@/lib/content";
import { PanelShell, VARIANT_FAMILY } from "./PanelShell";
import { PANEL_META, PANEL_CONTENT, PageFooter } from "./SectionPanels";

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

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-4 pb-16">
        {/* "wait" lets the old page leave before the next one lands, like turning a page */}
        <AnimatePresence mode="wait">
          {activePanel && meta && Content && panelMeta && !minimized && (
            <PanelShell
              key={activePanel}
              title={meta.label}
              subtitle={meta.blurb}
              variant={panelMeta.variant}
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
