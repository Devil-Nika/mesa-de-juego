import type { RowBase } from "../types";

export type FeatCategory = "Origin" | "General" | "Fighting Style" | "Epic Boon" | string;

export interface Feat extends RowBase {
    system: "dnd5e";
    category: FeatCategory;
    prerequisite?: string; // texto (nivel, stat, clase, etc.)
    repeatable?: boolean;
    benefits?: string[];   // bullets con beneficios
    description?: string;
    srdTag?: string;
}
