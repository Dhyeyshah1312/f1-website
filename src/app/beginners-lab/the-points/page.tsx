import { MarkVisited } from "@/components/f1/lab/mark-visited";
import { ThePointsSimulator } from "@/components/f1/lab/the-points-simulator";

export default function ThePointsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
      <MarkVisited id="the-points" />
      <header className="flex flex-col gap-1 border-b border-asphalt pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
          03 — The Points
        </span>
        <h1 className="font-display text-5xl font-black tracking-tight text-titanium md:text-7xl">
          How Scoring Works
        </h1>
        <p className="max-w-md font-mono text-sm text-brushed-steel">
          Only the top 10 finishers score points, and it drops off fast after P1.
        </p>
      </header>

      <ThePointsSimulator />
    </div>
  );
}
