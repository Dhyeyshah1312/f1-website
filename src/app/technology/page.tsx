import { CarViewer } from "@/components/f1/car-viewer/car-viewer";
import { MobileCarFallback } from "@/components/f1/car-viewer/mobile-car-fallback";
import { PageHero } from "@/components/f1/page-hero";

export default function TechnologyPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        index="07 — THE MACHINE"
        title="Technology"
        description="A stylized model of the 2026 car. Interactive component breakdown."
        imageSrc="/images/heroes/technology-hero.png"
        stats={[
          { label: "Regulation Era", value: "2026 SPECIFICATION" },
          { label: "Aerodynamics", value: "ACTIVE AERO & E-FUEL" },
        ]}
      />

      <div className="hidden md:block">
        <CarViewer />
      </div>
      <div className="block md:hidden">
        <MobileCarFallback />
      </div>
    </div>
  );
}
