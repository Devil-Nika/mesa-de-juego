import type { BaseRow } from "./Base";

export type Rarity = "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact";

export interface MagicItems extends BaseRow {
    rarity: Rarity;
    attunement?: boolean;
    category?: string;  // "Wand", "Weapon", "Armor", etc.
    text: string;
}
