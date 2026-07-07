"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, Minus, GripHorizontal } from "lucide-react";
import type { RefObject } from "react";

export type PanelVariant = "notebook" | "folder" | "window" | "schematic" | "casefile";

/* Each variant pairs a background treatment with ONE text-token family.
   "light" family → ink-strong/ink-soft/ink-muted. "dark" family →
   glass-strong/glass-soft/glass-muted (+ circuit accent on schematic only).
   Never reach for opacity modifiers on these — add a token instead. */
const VARIANT_STYLES: Record<PanelVariant, string> = {
  notebook: "bg-paper border-pink/40 graph-paper",
  folder: "bg-gradient-to-b from-folder to-folder-dark border-copper/50",
  window: "bg-gradient-to-b from-[#2a1830] to-[#1f0f27] border-lavender/30",
  schematic: "bg-[#150c1c] border-mintled/25",
  casefile: "bg-gradient-to-b from-paper to-blush border-hotpink/35 ruled-lines",
};

const VARIANT_FAMILY: Record<PanelVariant, "light" | "dark"> = {
  notebook: "light",
  folder: "light",
  window: "dark",
  schematic: "dark",
  casefile: "light",
};

const HEADER_TITLE: Record<"light" | "dark", string> = {
  light: "text-ink-strong",
  dark: "text-glass-strong",
};
const HEADER_SUB: Record<"light" | "dark", string> = {
  light: "text-ink-muted",
  dark: "text-glass-muted",
};
const HEADER_BORDER: Record<"light" | "dark", string> = {
  light: "border-ink-strong/10",
  dark: "border-glass-strong/10",
};
const ICON_BTN: Record<"light" | "dark", string> = {
  light: "text-ink-muted hover:bg-ink-strong/10 hover:text-ink-strong",
  dark: "text-glass-muted hover:bg-glass-strong/10 hover:text-glass-strong",
};

interface PanelShellProps {
  title: string;
  subtitle: string;
  variant: PanelVariant;
  onClose: () => void;
  onMinimize: () => void;
  dragConstraints: RefObject<HTMLElement | null>;
  widthClass?: string;
  children: React.ReactNode;
}

export function PanelShell({
  title,
  subtitle,
  variant,
  onClose,
  onMinimize,
  dragConstraints,
  widthClass = "w-[min(92vw,640px)]",
  children,
}: PanelShellProps) {
  const reduced = useReducedMotion();
  const family = VARIANT_FAMILY[variant];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.06}
      dragMomentum={false}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: 40, filter: "blur(10px)" }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24, filter: "blur(8px)" }}
      transition={{
        opacity: { duration: 0.28, ease: "easeOut" },
        default: { type: "spring", stiffness: 260, damping: 24, mass: 0.9 },
      }}
      className={`pointer-events-auto relative ${widthClass} max-h-[82vh] overflow-hidden rounded-2xl border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ${VARIANT_STYLES[variant]}`}
    >
      <div className={`flex cursor-grab items-center justify-between gap-3 border-b px-5 py-3 active:cursor-grabbing ${HEADER_BORDER[family]}`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <GripHorizontal size={14} className={`shrink-0 ${HEADER_SUB[family]}`} aria-hidden />
          <div className="min-w-0">
            <p className={`truncate text-sm font-semibold tracking-wide ${HEADER_TITLE[family]}`}>{title}</p>
            <p className={`truncate font-hand text-hand-md leading-none ${HEADER_SUB[family]}`}>{subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onMinimize}
            aria-label={`Minimize ${title} panel`}
            className={`rounded-full p-1.5 transition-colors ${ICON_BTN[family]}`}
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title} panel`}
            className={`rounded-full p-1.5 transition-colors hover:bg-hotpink/20 hover:text-hotpink ${HEADER_SUB[family]}`}
          >
            <X size={15} />
          </button>
        </div>
      </div>
      <div className="panel-scroll max-h-[calc(82vh-56px)] overflow-y-auto p-5">{children}</div>
    </motion.div>
  );
}
