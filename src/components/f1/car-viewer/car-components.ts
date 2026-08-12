export type CarComponentId =
  | "front-wing"
  | "floor-diffuser"
  | "power-unit"
  | "drs-active-aero"
  | "suspension"
  | "tyres";

export interface CarComponentInfo {
  id: CarComponentId;
  label: string;
  /** Hotspot marker position in the car's local space (nose at +X, rear at -X). */
  position: [number, number, number];
}

export const CAR_COMPONENTS: CarComponentInfo[] = [
  { id: "front-wing", label: "Front Wing", position: [2.25, 0.18, 0] },
  { id: "floor-diffuser", label: "Floor & Diffuser", position: [-1.7, 0.05, 0.65] },
  { id: "power-unit", label: "Power Unit", position: [-0.75, 0.55, 0] },
  { id: "drs-active-aero", label: "DRS / Active Aero", position: [-2.15, 0.8, 0] },
  { id: "suspension", label: "Suspension", position: [1.35, 0.32, 0.95] },
  { id: "tyres", label: "Tyres", position: [-1.35, 0.32, -0.95] },
];
