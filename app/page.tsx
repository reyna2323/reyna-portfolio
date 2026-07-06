"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, type SectionId } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { DeskScene } from "@/components/desk/DeskScene";
import { MobileDashboard } from "@/components/desk/MobileDashboard";
import { Dock } from "@/components/desk/Dock";
import { Entrance } from "@/components/desk/Entrance";
import { PanelManager } from "@/components/panels/PanelManager";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [entranceDone, setEntranceDone] = useState(false);
  const [activePanel, setActivePanel] = useState<SectionId | null>(null);
  const [minimized, setMinimized] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const openPanel = useCallback((id: SectionId) => {
    setActivePanel(id);
    setMinimized(false);
  }, []);
  const closePanel = useCallback(() => {
    setActivePanel(null);
    setMinimized(false);
  }, []);
  const minimizePanel = useCallback(() => setMinimized(true), []);
  const restorePanel = useCallback(() => setMinimized(false), []);

  const handleDockSelect = useCallback(
    (id: SectionId) => {
      if (activePanel === id) {
        setMinimized((m) => !m);
      } else {
        openPanel(id);
      }
    },
    [activePanel, openPanel],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePanel) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePanel, closePanel]);

  return (
    <main className="fixed inset-0 h-dvh w-dvw overflow-hidden" ref={constraintsRef}>
      {!entranceDone && <Entrance onDone={() => setEntranceDone(true)} />}

      {isMobile ? (
        <MobileDashboard />
      ) : (
        <>
          <header className="pointer-events-none fixed left-6 top-5 z-30">
            <p className="font-hand text-hand-xl leading-none text-glass-strong drop-shadow-md">{site.name}</p>
            <p className="text-desk-micro uppercase tracking-[0.2em] text-glass-muted">{site.tagline}</p>
            <p
              className="mt-2 font-hand text-hand-sm text-glass-muted anim-pulse-glow"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
            >
              ✦ explore the desk · click anything to open it
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
        </>
      )}
    </main>
  );
}
