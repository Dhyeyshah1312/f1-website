import { LAB_MODULES } from "@/components/f1/lab/lab-modules";
import { LessonCard } from "@/components/f1/lab/lesson-card";
import { PageHero } from "@/components/f1/page-hero";

export default function BeginnersLabPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="08 — LEARN F1 IN FIVE MINUTES"
        title="Beginner's Lab"
        description="Five short, interactive modules. Master Formula 1 fundamentals."
        imageSrc="/images/heroes/lab-hero-v2.png"
        stats={[
          { label: "Interactive Modules", value: `${LAB_MODULES.length} MODULES` },
          { label: "Completion Time", value: "5 MINUTES" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAB_MODULES.map((m) => (
            <LessonCard key={m.id} module={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
