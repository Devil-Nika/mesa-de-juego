import type { SystemId } from "../../systems";

export interface Actions {
    pk: string;              // `${system}:${id}`
    id: string;              // id corto dentro del sistema
    system: SystemId;        // "dnd5e" | "pf2e" | "sf2e"
    name: string;            // "Multiattack", "Claw", etc.
    type: "attack" | "feature" | "legendary" | "lair" | "reaction" | "other";
    description: string;

    // Opcionales (5e)
    attack_bonus?: number;   // +5
    damage?: string;         // "2d6+3 slashing"
    reach?: string;          // "5 ft."
    range?: string;          // "20/60 ft."
    targets?: string;        // "one target"

}
