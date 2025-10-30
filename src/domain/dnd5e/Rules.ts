import type { RowBase } from "../types";
import type { RuleTag } from "./Primitives";

export interface Rule extends RowBase {
    system: "dnd5e";
    tag: RuleTag;       // "Action", "Condition", "Hazard", "Area of Effect", etc.
    summary?: string;
    text?: string;      // definición SRD
    srdTag?: string;    // etiqueta del glosario SRD si aplica
    seeAlso?: string[]; // ids de otras reglas o secciones relacionadas
}
