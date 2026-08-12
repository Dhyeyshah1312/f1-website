export interface NavSection {
  index: string;
  label: string;
  href: string;
  /** Not yet in scope for v1 — see PRD §11. Rendered but not linked. */
  stretch?: boolean;
}

// Page Specs §0 — section index shown in the full-screen menu takeover.
export const NAV_SECTIONS: NavSection[] = [
  { index: "01", label: "Discover", href: "/" },
  { index: "02", label: "Season", href: "/season" },
  { index: "03", label: "Drivers", href: "/drivers" },
  { index: "04", label: "Teams", href: "/teams" },
  { index: "05", label: "Circuits", href: "/circuits" },
  { index: "06", label: "History", href: "/history" },
  { index: "07", label: "Technology", href: "/technology" },
  { index: "08", label: "Beginner's Lab", href: "/beginners-lab" },
  { index: "09", label: "Race Center", href: "/race-center", stretch: true },
];
