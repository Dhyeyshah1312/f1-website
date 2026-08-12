import { MarkVisited } from "@/components/f1/lab/mark-visited";
import { TheCarDiagram } from "@/components/f1/lab/the-car-diagram";

export default function TheCarPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
      <MarkVisited id="the-car" />
      <header className="flex flex-col gap-1 border-b border-asphalt pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-brushed-steel">
          04 — The Car
        </span>
        <h1 className="font-display text-5xl font-black tracking-tight text-titanium md:text-7xl">
          Six Parts, Plain Language
        </h1>
        <p className="max-w-md font-mono text-sm text-brushed-steel">
          The full interactive 3D model lives on the Technology page — this is the quick version.
        </p>
      </header>

      <TheCarDiagram />
    </div>
  );
}
