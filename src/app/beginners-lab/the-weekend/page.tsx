import { MarkVisited } from "@/components/f1/lab/mark-visited";
import { TheWeekendTimeline } from "@/components/f1/lab/the-weekend-timeline";

export default function TheWeekendPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
      <MarkVisited id="the-weekend" />
      <header className="flex flex-col gap-1 border-b border-asphalt pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
          02 — The Weekend
        </span>
        <h1 className="font-display text-5xl font-black tracking-tight text-titanium md:text-7xl">
          Thursday to Sunday
        </h1>
        <p className="max-w-md font-mono text-sm text-brushed-steel">
          A race weekend isn&apos;t just the race. Click a stage to see what happens.
        </p>
      </header>

      <TheWeekendTimeline />
    </div>
  );
}
