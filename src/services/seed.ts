// src/services/seed.ts
import { db } from "./db";
import type { SystemId, RowBase } from "../domain/types";

import type { Spell } from "../domain/dnd5e/Spells";
import type { Species } from "../domain/dnd5e/Species";
import type { Items } from "../domain/dnd5e/Items";
import type { Monster } from "../domain/dnd5e/Monsters";
import type { Actions } from "../domain/dnd5e/Actions";
import type { MagicItem } from "../domain/dnd5e/MagicItems";
import type { Background } from "../domain/dnd5e/Backgrounds";
import type { Feat } from "../domain/dnd5e/Feats";
import type { Classes } from "../domain/dnd5e/Classes";
import type { Subclass } from "../domain/dnd5e/Subclasses";
import type { Rule } from "../domain/dnd5e/Rules";

// ===== Carga de JSONs =====
import spellsDataRaw from "../systems/dnd5e/data/spells.json";
import speciesDataRaw from "../systems/dnd5e/data/species.json";
import itemsDataRaw from "../systems/dnd5e/data/items.json";
import monstersDataRaw from "../systems/dnd5e/data/monsters.json";
import actionsDataRaw from "../systems/dnd5e/data/actions.json";
import magicItemsDataRaw from "../systems/dnd5e/data/magic-items.json";
import backgroundsDataRaw from "../systems/dnd5e/data/backgrounds.json";
import featsDataRaw from "../systems/dnd5e/data/feats.json";
import classesDataRaw from "../systems/dnd5e/data/classes.json";
import subclassesDataRaw from "../systems/dnd5e/data/subclasses.json";
import rulesDataRaw from "../systems/dnd5e/data/rules.json";

/**
 * Preserva el literal del system:
 *   - Si pasás "dnd5e", el campo .system queda de tipo "dnd5e" (no SystemId).
 */
type WithSys<S extends SystemId, T extends Omit<RowBase, "system" | "pk">> =
    T & { system: S; pk: string };

function withSys<S extends SystemId, T extends Omit<RowBase, "system" | "pk">>(
    system: S,
    rows: ReadonlyArray<T>,
): Array<WithSys<S, T>> {
    return rows.map((r) => ({
        ...r,
        system,
        pk: `${system}:${r.id}`,
    }));
}

/** Entrada “tolerante” para normalizar spells (componentes puede venir string o string[]) */
type SpellInput = Omit<Spell, "system" | "pk" | "components"> & {
    components?: string | string[];
};

/** Normaliza componentes: string → string[] */
function normalizeSpells(rows: ReadonlyArray<SpellInput>): Array<Omit<Spell, "system" | "pk">> {
    return rows.map((r) => {
        const comps = r.components;
        const components =
            typeof comps === "string"
                ? comps.split(",").map((s) => s.trim()).filter(Boolean)
                : Array.isArray(comps)
                    ? comps.slice()
                    : [];

        // sobrescribe components sin declarar _omit
        return { ...r, components };
    });
}

// ===========================================================
// D&D 5e SEED
// ===========================================================
export async function seedDnd5e() {
    const system = "dnd5e" as const;

    const spellsData       = normalizeSpells(spellsDataRaw as SpellInput[]);
    const speciesData      = speciesDataRaw      as Omit<Species,    "system" | "pk">[];
    const itemsData        = itemsDataRaw        as Omit<Items,      "system" | "pk">[];
    const monstersData     = monstersDataRaw     as Omit<Monster,    "system" | "pk">[];
    const actionsData      = actionsDataRaw      as Omit<Actions,    "system" | "pk">[];
    const magicItemsData   = magicItemsDataRaw   as Omit<MagicItem,  "system" | "pk">[];
    const backgroundsData  = backgroundsDataRaw  as Omit<Background, "system" | "pk">[];
    const featsData        = featsDataRaw        as Omit<Feat,       "system" | "pk">[];
    const classesData      = classesDataRaw      as Omit<Classes,    "system" | "pk">[];
    const subclassesData   = subclassesDataRaw   as Omit<Subclass,   "system" | "pk">[];
    const rulesData        = rulesDataRaw        as Omit<Rule,       "system" | "pk">[];

    await db.transaction(
        "rw",
        [
            db.spells, db.species, db.items, db.monsters, db.actions,
            db.magicItems, db.backgrounds, db.feats, db.classes,
            db.subclasses, db.rules,
        ],
        async () => {
            if (spellsData.length)      await db.spells.bulkPut(withSys(system, spellsData));
            if (speciesData.length)     await db.species.bulkPut(withSys(system, speciesData));
            if (itemsData.length)       await db.items.bulkPut(withSys(system, itemsData));
            if (monstersData.length)    await db.monsters.bulkPut(withSys(system, monstersData));
            if (actionsData.length)     await db.actions.bulkPut(withSys(system, actionsData));
            if (magicItemsData.length)  await db.magicItems.bulkPut(withSys(system, magicItemsData));
            if (backgroundsData.length) await db.backgrounds.bulkPut(withSys(system, backgroundsData));
            if (featsData.length)       await db.feats.bulkPut(withSys(system, featsData));
            if (classesData.length)     await db.classes.bulkPut(withSys(system, classesData));
            if (subclassesData.length)  await db.subclasses.bulkPut(withSys(system, subclassesData));
            if (rulesData.length)       await db.rules.bulkPut(withSys(system, rulesData));
        }
    );
}

// ===========================================================
// Dispatcher (para futuros sistemas)
// ===========================================================
export async function seedSystem(system: SystemId) {
    switch (system) {
        case "dnd5e":
            return seedDnd5e();
        default:
            console.warn(`[seed] No hay seed implementado para ${system}`);
            return;
    }
}
