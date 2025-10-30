import type { RowBase } from "../types";
import type { AbilityAbbr, Skill } from "./Primitives";

export interface SavingThrowProficiencies {
    saves: AbilityAbbr[]; // p.ej. ["Int", "Wis"]
}

export interface ClassProficiencies {
    skillsChoose?: number;
    skillsList?: Skill[];
    weapons?: string[];
    armor?: Array<"Light" | "Medium" | "Heavy" | "Shield">;
    tools?: string[];
}

export interface SpellcastingProfile {
    prepared?: boolean;
    castingAbility?: AbilityAbbr; // p.ej. "Int"
    focusAllowed?: string[];      // "Arcane Focus", "Holy Symbol"
}

export interface ClassFeature {
    level: number;
    name: string;
    text: string;
}

export interface Classes extends RowBase {
    system: "dnd5e";
    primaryAbility?: AbilityAbbr;
    hitDie?: `d${4|6|8|10|12|20}`;
    savingThrows?: SavingThrowProficiencies;
    proficiencies?: ClassProficiencies;
    spellcasting?: SpellcastingProfile | null;
    features?: ClassFeature[];
    tables?: Record<string, number[]>; // ej. slotsHechizo[1..20]
    description?: string;
    srdTag?: string;
}
export type Class = Classes;
