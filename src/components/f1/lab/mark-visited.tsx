"use client";

import { useEffect } from "react";
import { useLabProgress, type LabModuleId } from "@/components/f1/lab/lab-progress-context";

/** Drop into a module page to register it as visited (renders nothing). */
export function MarkVisited({ id }: { id: LabModuleId }) {
  const { markVisited } = useLabProgress();
  useEffect(() => {
    markVisited(id);
  }, [id, markVisited]);
  return null;
}
