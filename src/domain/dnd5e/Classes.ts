import type { BaseRow } from "./Base";

export interface ClassFeature {
    level: number;
    name: string;
    text: string;
}

export interface ClassProgressionRow {
    level: number;
    proficiencyBonus: string; // "+2"...
    cantrips?: number;
    preparedSpells?: number;
    slots?: Partial<Record<1|2|3|4|5|6|7|8|9, number>>;
}

export interface CharacterClass extends BaseRow {
    primaryAbility: string;
    hitDie: string;                 // "d6", "d8"...
    savingThrowProficiencies: string[];
    skillProficiencies: string[];   // "choose 2: ..."
    weaponProficiencies?: string[];
    armorTraining?: string[];
    startingEquipment: string;      // paquete A/B
    features: ClassFeature[];
    progression: ClassProgressionRow[];
    subclassAt?: number;           // nivel de elección de subclase
}
