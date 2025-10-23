import type { SystemId } from "../../systems";

export interface Monster {
    pk: string; id: string; system: SystemId;

    name: string;
    size: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan" | string;
    type: string;            // "beast", "fiend", etc.
    alignment?: string;

    armor_class: number;
    hit_points: number;
    hit_dice?: string;       // "3d8+6"
    speed: string;           // "40 ft., climb 30 ft."

    // Atributos (5e)
    str: number; dex: number; con: number; int: number; wis: number; cha: number;

    senses?: string;         // "darkvision 60 ft., passive Perception 12"
    languages?: string;      // "Common, Draconic"
    challenge?: string;      // "1/2", "3", "10"
    proficiency_bonus?: string;

    // Referencias a acciones (por id de acción + conteo para multiataque)
    actions?: Array<{ actionId: string; count?: number }>;
    bonus_actions?: Array<{ actionId: string; count?: number }>;
    reactions?: Array<{ actionId: string; count?: number }>;
    legendary_actions?: Array<{ actionId: string; count?: number }>;
    traits?: Array<{ actionId: string }>;
}