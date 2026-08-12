"use client";

import Link from "next/link";
import type { LabModuleInfo } from "@/components/f1/lab/lab-modules";
import { useLabProgress } from "@/components/f1/lab/lab-progress-context";

export function LessonCard({ module }: { module: LabModuleInfo }) {
  const { visited } = useLabProgress();
  const done = visited.has(module.id);

  return (
    <Link
      href={module.href}
      data-cursor="magnetic"
      data-cursor-text="LEARN"
      className="group relative flex flex-col gap-3 rounded-md border border-asphalt/80 bg-graphite/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-circuit-red hover:bg-graphite/90 hover:shadow-[0_10px_30px_rgba(214,48,60,0.2)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-circuit-red-highlight">{module.index}</span>
        <span
          className={
            done
              ? "h-2.5 w-2.5 rounded-full bg-circuit-red shadow-[0_0_8px_#d6303c]"
              : "h-2.5 w-2.5 rounded-full border border-brushed-steel/50"
          }
          aria-label={done ? "Completed" : "Not started"}
        />
      </div>
      <h2 className="font-display text-3xl font-black tracking-tight text-titanium transition-colors group-hover:text-circuit-red">
        {module.title}
      </h2>
      <p className="font-mono text-sm tracking-wide text-brushed-steel transition-colors group-hover:text-titanium">
        {module.hook}
      </p>
    </Link>
  );
}
