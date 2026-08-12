import Image from "next/image";
import { cn } from "@/lib/utils";
import { driverImageSlug } from "@/lib/data/image-slugs";

// Path built from image-slugs (pure, no fs) rather than lib/data/portraits
// (server-only) — this component is used from client components (DriversGrid).
function driverPortraitPath(driverId: string): string {
  return `/images/drivers/${driverImageSlug(driverId)}.jpg`;
}

interface DriverPortraitProps {
  slug: string;
  hasPortrait: boolean;
  number: string | null;
  alt: string;
  /** Sizing/aspect-ratio — caller controls via className (e.g. "relative aspect-[3/4]"). */
  className?: string;
  numeralClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * A driver's portrait, or — when no file exists yet — a clean Graphite-panel
 * placeholder showing the driver's number. Never a broken <img> (DESIGN.md §8).
 */
export function DriverPortrait({
  slug,
  hasPortrait,
  number,
  alt,
  className,
  numeralClassName,
  priority,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: DriverPortraitProps) {
  if (!hasPortrait) {
    return (
      <div className={cn("relative flex items-center justify-center overflow-hidden bg-graphite", className)}>
        <span
          aria-hidden
          className={cn(
            "font-display font-black leading-none text-asphalt",
            numeralClassName ?? "text-6xl",
          )}
        >
          {number ?? "—"}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={driverPortraitPath(slug)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
