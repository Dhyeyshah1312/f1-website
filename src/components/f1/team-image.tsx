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
 * A team's livery or logo image. Logos render borderless with transparent background
 * so they fill the container prominently without square margins or stamp boxes.
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
  if (variant === "logo") {
    return (
      <div className={cn("relative shrink-0 overflow-hidden bg-transparent p-0", className)}>
        <Image
          src={`/images/teams/${teamImageSlug(constructorId)}-logo.jpg`}
          alt={`${teamName} logo`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-0"
        />
      </div>
    );
  }

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
        className="object-cover"
      />
    </div>
  );
}
