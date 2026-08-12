import type { LabModuleId } from "@/components/f1/lab/lab-progress-context";

export interface LabModuleInfo {
  id: LabModuleId;
  index: string;
  title: string;
  hook: string;
  href: string;
}

export const LAB_MODULES: LabModuleInfo[] = [
  {
    id: "the-grid",
    index: "01",
    title: "The Grid",
    hook: "22 cars. 11 teams. Who's actually racing.",
    href: "/beginners-lab/the-grid",
  },
  {
    id: "the-weekend",
    index: "02",
    title: "The Weekend",
    hook: "Thursday to Sunday — what each session is for.",
    href: "/beginners-lab/the-weekend",
  },
  {
    id: "the-points",
    index: "03",
    title: "The Points",
    hook: "Why P1 isn't the only result that matters.",
    href: "/beginners-lab/the-points",
  },
  {
    id: "the-car",
    index: "04",
    title: "The Car",
    hook: "Six parts of a 2026 car, plain language.",
    href: "/beginners-lab/the-car",
  },
  {
    id: "the-strategy",
    index: "05",
    title: "The Strategy",
    hook: "Tyres and pit stops — simulate a race.",
    href: "/beginners-lab/the-strategy",
  },
];
