import type { RowBase } from "../types";
import type {
    Cost, DamageType, MasteryProperty, TraitBlock,
    WeaponCategory, WeaponProperty, WeaponRangeKind, RangeNumeric,
    EquipmentSlot, Handedness
} from "./Primitives";

export type ItemCategory =
    | "weapon" | "armor" | "gear" | "ammunition" | "tool" | "shield";

/** Armas */
export interface WeaponBlock {
    category: WeaponCategory;   // Simple / Martial
    kind: WeaponRangeKind;      // Melee / Ranged
    damage?: { dice: string; type: DamageType };
    properties?: WeaponProperty[];
    mastery?: MasteryProperty;
    thrownRange?: RangeNumeric;
    ammunitionRange?: RangeNumeric;
    versatileDice?: string;     // p.ej. "1d10" si se usa a dos manos
}

/** Armaduras y escudos */
export interface ArmorBlock {
    kind: "Light" | "Medium" | "Heavy" | "Shield";
    baseAC?: number;              // p.ej. 16 (Chain Mail)
    dexCap?: number | null;       // p.ej. 2 para Medium; null si no aplica
    strengthReq?: number | null;  // p.ej. 13 para Chain Mail
    stealthDisadvantage?: boolean;
}

/** Ítem básico (mundano o “no-mágico”) */
export interface Items extends RowBase {
    system: "dnd5e";
    category: ItemCategory;

    // slots y uso de manos para facilitar equipamiento en sheet
    slot?: EquipmentSlot;       // "weapon-hand", "off-hand", "two-hands", "head", etc.
    hands?: Handedness;         // "one-hand" | "two-hands" | "versatile"

    cost?: Cost;                // { amount, unit: "GP" etc. }
    weight?: number;            // libras
    weapon?: WeaponBlock | null;
    armor?: ArmorBlock | null;

    properties?: string[];      // extras no modeladas
    traits?: TraitBlock[];      // para textos de uso/efecto
    description?: string;

    // flags útiles
    consumable?: boolean;       // p.ej. antitoxin, rations
    stackable?: boolean;        // true si puede apilarse en inventario

    // ayuda para mastery en UI
    masteryNote?: string;
    srdTag?: string;            // etiqueta del glosario SRD si aplica
}

export type Item = Items;
