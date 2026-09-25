"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site, pageOrder, isPageId, type PageId } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { PageNavProvider, writeHash } from "@/lib/pageNav";
import { DeskScene } from "@/components/desk/DeskScene";
import { MobileDashboard } from "@/components/desk/MobileDashboard";
import { Dock } from "@/components/desk/Dock";
import { Entrance } from "@/components/desk/Entrance";
import { PanelManager } from "@/components/panels/PanelManager";

function hashPage(): PageId | null {
  const h = window.location.hash.slice(1);
  return isPageId(h) ? h : null;
}

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [entranceDone, setEntranceDone] = useState(false);
  const [activePanel, setActivePanel] = useState<PageId | null>(null);
  const [minimized, setMinimized] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const openPanel = useCallback((id: PageId) => {
    setActivePanel(id);
    setMinimized(false);
    writeHash(id);
  }, []);
  const closePanel = useCallback(() => {
    setActivePanel(null);
    setMinimized(false);
    writeHash(null);
  }, []);
  const minimizePanel = useCallback(() => setMinimized(true), []);
  const restorePanel = useCallback(() => setMinimized(false), []);
  const nav = useMemo(() => ({ open: openPanel, close: closePanel }), [openPanel, closePanel]);

  // First visit lands on the Start page once the cover opens; a shared
  // link like /#research goes straight to that page instead.
  // (isMobile is read through a ref so this callback stays stable and the
  // entrance timeline doesn't restart when the media query settles.)
  const isMobileRef = useRef(isMobile);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);
  const onEntranceDone = useCallback(() => {
    setEntranceDone(true);
    if (!isMobileRef.current) openPanel(hashPage() ?? "start");
  }, [openPanel]);

  // typed or pasted hash changes (and back/forward between them)
  useEffect(() => {
    const onHash = () => {
      const id = hashPage();
      if (id) openPanel(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [openPanel]);

  const handleDockSelect = useCallback(
    (id: PageId) => {
      if (activePanel === id) {
        setMinimized((m) => !m);
      } else {
        openPanel(id);
      }
    },
    [activePanel, openPanel],
  );

  // Esc closes; ← / → flip pages like a notebook while a page is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activePanel) return;
      if (e.key === "Escape") return closePanel();
      if (minimized || e.altKey || e.metaKey || e.ctrlKey) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable]")) return;
      const i = pageOrder.indexOf(activePanel);
      if (e.key === "ArrowRight" && i < pageOrder.length - 1) openPanel(pageOrder[i + 1]);
      if (e.key === "ArrowLeft" && i > 0) openPanel(pageOrder[i - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePanel, minimized, closePanel, openPanel]);

  return (
    <main className="fixed inset-0 h-dvh w-dvw overflow-hidden" ref={constraintsRef}>
      {!entranceDone && <Entrance onDone={onEntranceDone} />}

      {isMobile ? (
        <MobileDashboard />
      ) : (
        <PageNavProvider value={nav}>
          <header className="fixed left-6 top-5 z-30">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openPanel("start")}
                className="font-hand text-hand-xl leading-none text-glass-strong drop-shadow-md transition-colors hover:text-pink"
                aria-label={`${site.name}: open the Start here page`}
              >
                {site.name}
              </button>
              <button
                type="button"
                onClick={() => openPanel("start")}
                className="anim-pulse-glow shrink-0 rounded-full border border-pink/40 bg-deepplum/70 px-3 py-0.5 font-hand text-hand-md text-glass-strong shadow-lg backdrop-blur transition-colors hover:border-pink hover:bg-plum"
              >
                ✦ start here
              </button>
            </div>
            <p className="mt-1 text-desk-label tracking-[0.08em] text-glass-muted" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}>
              computer engineering &amp; CS @ USC
            </p>
          </header>
          <DeskScene onOpen={openPanel} />
          <Dock activePanel={minimized ? null : activePanel} onSelect={handleDockSelect} />
          <PanelManager
            activePanel={activePanel}
            minimized={minimized}
            onClose={closePanel}
            onMinimize={minimizePanel}
            onRestore={restorePanel}
            dragConstraints={constraintsRef}
          />
        </PageNavProvider>
      )}
    </main>
  );
}
