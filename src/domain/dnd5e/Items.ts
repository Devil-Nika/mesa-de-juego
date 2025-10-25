import type { BaseRow } from "./Base";

export type ItemCategory = "weapon" | "armor" | "adventuring-gear" | "tool" | "consumable" | "magic-item" | "other";

export interface Item extends BaseRow {
    category: ItemCategory;
    subtype?: string;         // "weapon.melee", "weapon.ranged", "armor.medium", etc.
    cost?: string;            // "2 gp"
    weight?: string;          // "1 lb"
    properties?: string[];    // ej. ["finesse","light","thrown (20/60)"]
    text?: string;
}
