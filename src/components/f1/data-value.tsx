import type { ReactNode } from "react";
import { isPending, type Maybe } from "@/lib/data/types";
import { PendingToken } from "@/components/f1/pending-token";

interface DataValueProps<T> {
  value: Maybe<T>;
  render: (value: T) => ReactNode;
  className?: string;
}

/**
 * Renders resolved data via `render`, or the DESIGN.md-compliant PendingToken
 * when the data layer hasn't wired a real value yet. Use this instead of
 * hand-rolling a pending/fallback check per page.
 */
export function DataValue<T>({ value, render, className }: DataValueProps<T>) {
  if (isPending(value)) {
    return <PendingToken source={value.source} className={className} />;
  }
  return <>{render(value)}</>;
}
