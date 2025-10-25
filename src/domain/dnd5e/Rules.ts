import type { BaseRow } from "./Base";

export type GlossaryTag = "Action" | "AreaOfEffect" | "Attitude" | "Condition" | "Hazard" | "General";

export interface RuleGlossary extends BaseRow {
    tag?: GlossaryTag;
    text: string;           // descripción corta/mediana (resumen fiel)
    seeAlso?: string[];     // ids de otras entradas relacionadas
}
