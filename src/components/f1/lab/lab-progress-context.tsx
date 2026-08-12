"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type LabModuleId = "the-grid" | "the-weekend" | "the-points" | "the-car" | "the-strategy";

interface LabProgressContextValue {
  visited: Set<LabModuleId>;
  markVisited: (id: LabModuleId) => void;
}

const LabProgressContext = createContext<LabProgressContextValue | null>(null);

/**
 * In-memory only — no login, no localStorage (Page Specs §8: "progress kept
 * in local component state only"). Resets on full page reload; that's the
 * intended v1 behavior, not a bug to fix later.
 */
export function LabProgressProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState<Set<LabModuleId>>(new Set());

  function markVisited(id: LabModuleId) {
    setVisited((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  return (
    <LabProgressContext.Provider value={{ visited, markVisited }}>
      {children}
    </LabProgressContext.Provider>
  );
}

export function useLabProgress(): LabProgressContextValue {
  const ctx = useContext(LabProgressContext);
  if (!ctx) throw new Error("useLabProgress must be used within LabProgressProvider");
  return ctx;
}
