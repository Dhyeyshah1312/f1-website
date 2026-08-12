import Image from "next/image";
import { cn } from "@/lib/utils";
import { teamImageSlug } from "@/lib/data/image-slugs";

type TeamImageVariant = "livery" | "logo";

interface TeamImageProps {
  constructorId: string;
  variant: TeamImageVariant;
  hasImage: boolean;
  teamName: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * A team's livery or logo image, or — when no file exists yet — a clean
 * Graphite-panel placeholder showing the team name. Never a broken <img>
 * (DESIGN.md §8). Paths built from image-slugs (pure, no fs) rather than
 * lib/data/portraits (server-only), since this is used from client code
 * (PaddockGrid).
 */
export function TeamImage({
  constructorId,
  variant,
  hasImage,
  teamName,
  className,
  priority,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: TeamImageProps) {
  if (!hasImage) {
    return (
      <div className={cn("relative flex items-center justify-center overflow-hidden bg-graphite p-2", className)}>
        <span aria-hidden className="text-center font-display text-lg font-black leading-tight text-asphalt">
          {teamName}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={`/images/teams/${teamImageSlug(constructorId)}-${variant}.jpg`}
        alt={`${teamName} ${variant}`}
        fill
        priority={priority}
        sizes={sizes}
        className={variant === "logo" ? "object-contain p-4" : "object-cover"}
      />
    </div>
  );
}
