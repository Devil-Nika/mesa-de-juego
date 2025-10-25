import type { BaseRow } from "./Base";

export interface Species extends BaseRow {
    size: "Small" | "Medium";        // si una especie ofrece Small o Medium, usar union más amplia
    speed: number;                    // pies
    traits: Array<{ name: string; text: string }>;
}
