import { TelemetryLine } from "@/components/f1/telemetry-line";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      <TelemetryLine className="max-w-xs" />
    </div>
  );
}
