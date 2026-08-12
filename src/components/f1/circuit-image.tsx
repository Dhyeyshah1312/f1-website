import Image from "next/image";
import { cn } from "@/lib/utils";
import { circuitImageSlug } from "@/lib/data/image-slugs";

interface CircuitImageProps {
  circuitId: string;
  hasImage: boolean;
  circuitName: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** A circuit photo, or a clean Graphite-panel placeholder. Never a broken <img> (DESIGN.md §8). */
export function CircuitImage({
  circuitId,
  hasImage,
  circuitName,
  className,
  priority,
  sizes = "100vw",
}: CircuitImageProps) {
  if (!hasImage) {
    return (
      <div className={cn("relative flex items-center justify-center overflow-hidden bg-graphite p-4", className)}>
        <span aria-hidden className="text-center font-display text-2xl font-black leading-tight text-asphalt">
          {circuitName}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={`/images/circuits/${circuitImageSlug(circuitId)}.jpg`}
        alt={circuitName}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
