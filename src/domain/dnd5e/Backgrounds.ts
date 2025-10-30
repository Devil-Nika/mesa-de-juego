import type { RowBase } from "../types";
import type { AbilityAbbr, Skill } from "./Primitives";

export interface AbilityIncreaseChoice {
    abilities: AbilityAbbr[]; // p.ej. 3 habilidades listadas
    mode: "2+1" | "1+1+1";    // SRD: "Increase one by 2 and another by 1" o "all three by 1"
}

export interface Background extends RowBase {
    system: "dnd5e";
    abilityIncreases?: AbilityIncreaseChoice; // 👈 aquí, NO en Species
    feat?: string;                            // nombre del feat que otorga
    skillProficiencies?: Skill[];             // dos skills
    toolProficiency?: string;                 // una herramienta (o familia)
    equipment?: string;                       // texto libre SRD
    description?: string;
    srdTag?: string;                          // etiqueta del glosario SRD si aplica
}
