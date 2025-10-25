import type { BaseRow } from "./Base";

export interface AbilityBlock {
    str: number; dex: number; con: number; int: number; wis: number; cha: number;
}

export interface Monsters extends BaseRow {
    size: "Tiny"|"Small"|"Medium"|"Large"|"Huge"|"Gargantuan";
    type: string;            // "Beast", "Humanoid (any alignment)", etc.
    alignment?: string;
    ac?: string;             // "11 (natural armor)"
    hp?: string;             // "19 (3d8+6)"
    speed?: string;          // "40 ft., climb 30 ft."
    initiative?: string;     // "+1 (11)" si usás el modelo 5.2.1
    abilities?: AbilityBlock;
    skills?: string[];
    resistances?: string[];
    vulnerabilities?: string[];
    immunities?: string[];       // daño/condiciones
    senses?: string;             // "darkvision 60 ft., passive Perception 13"
    languages?: string;
    cr?: string;                 // "1/2 (100 XP)"
    traits?: Array<{ name: string; text: string }>;
    actions?: Array<{ name: string; text: string }>;
    bonusActions?: Array<{ name: string; text: string }>;
    reactions?: Array<{ name: string; text: string }>;
    legendaryActions?: Array<{ name: string; text: string }>;
    gear?: string[];
}
