import type { RowBase } from "../types";
import type { SpellSchool } from "./Primitives";

export interface Spell extends RowBase {
    system: "dnd5e";
    level?: number;                   // 0..9
    school?: SpellSchool | string;    // permitir personalizados
    castingTime?: string;             // string abierto
    range?: string;                   // string abierto
    components?: string[];            // ["V","S","M (a pearl...)"]
    duration?: string;                // string abierto
    concentration?: boolean;
    ritual?: boolean;
    classes?: string[];               // nombres de clases como string abierto
    description?: string;
    srdTag?: string;
}
