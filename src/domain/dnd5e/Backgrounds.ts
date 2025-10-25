import type { BaseRow } from "./Base";

export interface Backgrounds extends BaseRow {
    abilityIncreases: string[]; // descripción exacta del patrón (+2/+1 o +1/+1/+1)
    feat: string;               // id de feat recomendado/obligatorio
    skillProficiencies: string[];
    toolProficiency?: string;
    equipment: string;         // paquete A/B o "50 gp"
}
