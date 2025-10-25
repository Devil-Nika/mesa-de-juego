import type { BaseRow } from "./Base";

export type SpellSchool =
    | "Abjuration" | "Conjuration" | "Divination" | "Enchantment"
    | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";

export interface Components {
    verbal: boolean;
    somatic: boolean;
    material: { hasM: boolean; text: string | null };
}

export interface Spell extends BaseRow {
    level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    school: SpellSchool;
    castingTime: string;      // p.ej. "1 action"
    range: string;            // p.ej. "60 feet"
    components: Components;
    duration: string;         // incluye Concentration/Ritual si corresponde
    ritual?: boolean;
    concentration?: boolean;
    text: string;             // descripción/resumen
}
