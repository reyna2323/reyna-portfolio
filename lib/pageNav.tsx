"use client";

import { createContext, useContext } from "react";
import type { PageId } from "@/lib/content";

interface PageNav {
  open: (id: PageId) => void;
  close: () => void;
}

const PageNavContext = createContext<PageNav | null>(null);

export const PageNavProvider = PageNavContext.Provider;

export function usePageNav() {
  const nav = useContext(PageNavContext);
  if (!nav) throw new Error("usePageNav must be used inside a PageNavProvider");
  return nav;
}

/** A real `#id` link (copyable, shareable) that opens the page in place. */
export function PageLink({
  to,
  className,
  children,
}: {
  to: PageId;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = usePageNav();
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open(to);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/** Keeps the URL hash in sync with the open page, without adding history entries. */
export function writeHash(id: PageId | null) {
  const url = id ? `#${id}` : window.location.pathname + window.location.search;
  window.history.replaceState(null, "", url);
}
