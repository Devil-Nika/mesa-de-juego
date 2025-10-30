import type { RowBase } from "../types";
import type {
    AbilityAbbr, Alignment, Condition, CreatureType, DamageType, Size
} from "./Primitives";

export interface MonsterSpeeds {
    walk?: number; burrow?: number; climb?: number; fly?: number; swim?: number; hover?: boolean;
}
export interface MonsterSenses {
    passivePerception: number;
    darkvision?: number; blindsight?: number; tremorsense?: number; truesight?: number;
}

export interface MonsterAbilityScores {
    Str: number; Dex: number; Con: number; Int: number; Wis: number; Cha: number;
}
export interface MonsterSaveBonuses {
    Str?: number; Dex?: number; Con?: number; Int?: number; Wis?: number; Cha?: number;
}
export interface MonsterSkillBonuses {
    [skill: string]: number | undefined; // p.ej. "Perception": +3
}
export interface MonsterDamageMods {
    resistances?: DamageType[];
    vulnerabilities?: DamageType[];
    immunities?: DamageType[];
    conditionImmunities?: Condition[];
}

export type MonsterFeatureKind = "trait" | "action" | "bonus" | "reaction" | "legendary" | "lair";

export interface MonsterFeature {
    kind: MonsterFeatureKind;
    name: string;
    text: string;
    // Opcional estructurado
    attack?: {
        type: "Melee Weapon Attack" | "Ranged Weapon Attack" | "Spell Attack";
        toHit?: number;
        reach?: number;        // pies
        range?: string;        // "30/120"
        targets?: string;      // "one target"
        hit?: string;          // texto libre de daño/efecto
    };
    save?: {
        ability: AbilityAbbr;
        dc: number;
        onFail?: string;
        onSuccess?: string;
    };
    uses?: string;           // "Recharge 5–6", "1/Day", etc.
}

export interface Monster extends RowBase {
    system: "dnd5e";
    size: Size;
    type: CreatureType | `${CreatureType} (${string})`;
    alignment?: Alignment;

    ac?: number;
    hp?: number;
    hitDice?: string;

    speeds?: MonsterSpeeds;
    abilities?: MonsterAbilityScores;      // opcional para listas simples
    saves?: MonsterSaveBonuses;
    skills?: MonsterSkillBonuses;

    senses?: MonsterSenses;
    languages?: string[];

    cr?: string;
    proficiencyBonus?: number;

    damageMods?: MonsterDamageMods;

    gear?: string[];

    traits?: MonsterFeature[];            // siempre activos
    actions?: MonsterFeature[];           // acciones
    bonusActions?: MonsterFeature[];
    reactions?: MonsterFeature[];
    legendaryActions?: MonsterFeature[];
    lairActions?: MonsterFeature[];       // 👈 acciones de guarida

    description?: string;
    srdTag?: string;
}
