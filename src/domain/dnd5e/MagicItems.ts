import type { RowBase } from "../types";

export type MagicRarity = "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact";

export interface MagicItem extends RowBase {
    system: "dnd5e";
    rarity: MagicRarity | string;
    requiresAttunement?: boolean; // 👈 necesaria para la página
    itemType?: "weapon" | "armor" | "shield" | "wondrous" | "potion" | "scroll" | string;
    attunedSlots?: Array<"head"|"chest"|"hands"|"ring"|"cloak"|"feet"|"weapon"|"shield">;
    cursed?: boolean;
    description?: string;
}
export type MagicItems = MagicItem;
export default undefined as unknown as never;
