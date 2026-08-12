import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  handle: string;
  children: ReactNode;
  className?: string;
}

/** Real Instagram link — Elsewhere sections (drivers, teams, driver partners). */
export function SocialLink({ handle, children, className }: SocialLinkProps) {
  return (
    <a
      href={`https://instagram.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-titanium underline decoration-brushed-steel underline-offset-2 transition-colors hover:text-circuit-red hover:decoration-circuit-red",
        className,
      )}
    >
      {children}
    </a>
  );
}
