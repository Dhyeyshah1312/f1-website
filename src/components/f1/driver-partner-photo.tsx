import Image from "next/image";
import { cn } from "@/lib/utils";
import { driverImageSlug } from "@/lib/data/image-slugs";

interface DriverPartnerPhotoProps {
  slug: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Partner photo for the Elsewhere section. No placeholder branch — callers
 * only mount this once lib/data/portraits.ts's hasDriverPartnerPhoto has
 * confirmed the file exists (DESIGN.md §8 bans broken image links, so the
 * omit-entirely decision happens at the call site instead of in here).
 */
export function DriverPartnerPhoto({
  slug,
  alt,
  className,
  sizes = "(min-width: 640px) 14rem, 10rem",
}: DriverPartnerPhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={`/images/drivers/${driverImageSlug(slug)}-partner.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
