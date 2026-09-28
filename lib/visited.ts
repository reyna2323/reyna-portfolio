"use client";

import { useSyncExternalStore } from "react";
import { sections, type PageId, type SectionId } from "@/lib/content";

/* Which numbered pages this visitor has opened, kept in their own browser
   (never sent anywhere). Drives the reading constellation and the "read"
   marks on the contents list. Storage can be blocked (private windows,
   strict settings), so every access is guarded and the site works without it. */

const KEY = "reyna-portfolio:visited";
const EVENT = "reyna-visited-change";
const COMPLETE_EVENT = "reyna-visited-complete";
const EMPTY: readonly SectionId[] = [];
const ids = new Set<string>(sections.map((s) => s.id));

let cache: readonly SectionId[] | null = null;

function read(): readonly SectionId[] {
  if (cache) return cache;
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? (raw.filter((v) => typeof v === "string" && ids.has(v)) as SectionId[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

export function markVisited(id: PageId | null) {
  if (!id || id === "start") return;
  const current = read();
  if (current.includes(id)) return;
  cache = [...current, id];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* storage blocked: keep it for this visit only */
  }
  window.dispatchEvent(new Event(EVENT));
  if (cache.length === sections.length) window.dispatchEvent(new Event(COMPLETE_EVENT));
}

/** Fires once, at the moment the last unread page is opened (not on reloads). */
export function onAllVisited(cb: () => void) {
  window.addEventListener(COMPLETE_EVENT, cb);
  return () => window.removeEventListener(COMPLETE_EVENT, cb);
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function useVisited(): readonly SectionId[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
