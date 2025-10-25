// Base común a todos los sistemas
export type SystemId =
    | "dnd5e"
    | "pf2e"
    | "sf2e"
    | "daggerheart"
    | "vampire5e";

export interface RowBase {
    pk: string;
    id: string;
    system: SystemId;
    name: string;
    source?: string;
}

// Clases
export interface Classes extends RowBase {
    primaryAbility?: string; // "Intelligence"
    hitDie?: string;         // "d6"
}

// Subclases
export interface Subclass extends RowBase {
    parentClassId?: string;  // "wizard"
}

// Trasfondos
export interface Background extends RowBase {
    feat?: string;           // "Magic Initiate (Wizard)"
}

// Dotes
export interface Feat extends RowBase {
    category?: "Origin" | "General" | "Fighting Style" | "Epic Boon" | string;
}

// Objetos mágicos
export interface MagicItem extends RowBase {
    rarity?:
        | "Common"
        | "Uncommon"
        | "Rare"
        | "Very Rare"
        | "Legendary"
        | "Artifact"
        | string;
    requiresAttunement?: boolean;
}
