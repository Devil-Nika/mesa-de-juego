import type { RowBase } from "../types";
import type { RuleTag } from "./Primitives";

/**
 * Catálogo de acciones (reglas de "Attack", "Dash", "Disengage", etc.).
 * No confundir con acciones específicas de criaturas (eso es MonsterFeature).
 */
export interface Actions extends RowBase {
    system: "dnd5e";
    tag: Extract<RuleTag, "Action" | "Bonus Action" | "Reaction">;
    summary?: string;
    text?: string;
    srdTag?: string;     // etiqueta mostrada si viene del SRD (glosario)
    seeAlso?: string[];  // ids de otras reglas/acciones relacionadas
}
export type Action = Actions;

export default undefined as unknown as never;