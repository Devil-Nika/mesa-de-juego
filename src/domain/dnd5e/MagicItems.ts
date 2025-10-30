import type { RowBase } from "../types";
import type { Attunement, EquipmentSlot, Handedness, TraitBlock } from "./Primitives";

export type MagicRarity =
    | "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" | "Artifact";

/** Ítems mágicos (pueden envolver o extender uno mundano) */
export interface MagicItem extends RowBase {
    system: "dnd5e";
    rarity: MagicRarity | string;

    // ubicaciones/uso (para equipamiento)
    slot?: EquipmentSlot;          // "weapon-hand", "off-hand", "head", "ring", etc.
    hands?: Handedness;            // relevante para armas mágicas

    attunement?: Attunement;       // sintonización
    cursed?: boolean;              // bandera de objeto maldito
    curseNote?: string;            // detalle de la maldición

    // para pociones/pergaminos/consumibles
    consumable?: boolean;

    // si reemplaza/convierte un item base (id del catálogo de Items)
    baseItemId?: string;

    // efectos y reglas (en texto abierto para import/export)
    properties?: string[];         // etiquetas o rasgos breves
    traits?: TraitBlock[];         // bloques de texto con efecto/mecánica
    description?: string;

    srdTag?: string;               // etiqueta del glosario SRD si aplica
}

export type { Attunement } from "./Primitives";
