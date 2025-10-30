import type { RowBase } from "../types";
import type { Size, TraitBlock } from "./Primitives";

export interface Species extends RowBase {
    system: "dnd5e";
    size?: Size;
    speed?: number;          // velocidad base en pies
    traits?: TraitBlock[];   // rasgos (texto libre)
    description?: string;
    srdTag?: string;
}
