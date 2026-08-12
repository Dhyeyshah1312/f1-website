import { LabProgressProvider } from "@/components/f1/lab/lab-progress-context";

export default function BeginnersLabLayout({ children }: LayoutProps<"/beginners-lab">) {
  return <LabProgressProvider>{children}</LabProgressProvider>;
}
