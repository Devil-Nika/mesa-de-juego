import type { BaseRow } from "./Base";

export type AreaShape = "Cone" | "Cube" | "Cylinder" | "Emanation" | "Line" | "Sphere";

export interface AreaOfEffect extends BaseRow {
    shape: AreaShape;
    rules: string;  // resumen de posicionamiento/punto de origen/bloqueos
}
