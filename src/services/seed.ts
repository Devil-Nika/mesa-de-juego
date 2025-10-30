import { db, makePk } from "./db";
import type { SystemId } from "../domain/types";

// JSON stubs (D&D 5e)
import spellsData from "../systems/dnd5e/data/spells.json";
import speciesData from "../systems/dnd5e/data/species.json";
import itemsData from "../systems/dnd5e/data/items.json";
import monstersData from "../systems/dnd5e/data/monsters.json";
import actionsData from "../systems/dnd5e/data/actions.json";
import magicItemsData from "../systems/dnd5e/data/magic-items.json";
import backgroundsData from "../systems/dnd5e/data/backgrounds.json";
import featsData from "../systems/dnd5e/data/feats.json";
import classesData from "../systems/dnd5e/data/classes.json";
import subclassesData from "../systems/dnd5e/data/subclasses.json";
import rulesData from "../systems/dnd5e/data/rules.json";

// Semilla para un único sistema por DB (dnd5e)
const SYSTEM: SystemId = "dnd5e";

// Agrega system y pk sin cambiar el resto (tipos abiertos)
function withSystem<T extends { id: string }>(rows: T[]) {
    return rows.map((r) => ({
        ...r,
        system: SYSTEM as const,     // 👈 literal "dnd5e"
        pk: makePk(SYSTEM, r.id),    // pk consistente
    }));
}

export async function seedIfNeeded(): Promise<void> {
    // Cuenta por tabla (solo del sistema actual)
    const [
        cSpells, cSpecies, cItems, cMonsters, cActions,
        cMagicItems, cBackgrounds, cFeats, cClasses, cSubclasses, cRules,
    ] = await Promise.all([
        db.spells.where("system").equals(SYSTEM).count(),
        db.species.where("system").equals(SYSTEM).count(),
        db.items.where("system").equals(SYSTEM).count(),
        db.monsters.where("system").equals(SYSTEM).count(),
        db.actions.where("system").equals(SYSTEM).count(),
        db.magicItems.where("system").equals(SYSTEM).count(),
        db.backgrounds.where("system").equals(SYSTEM).count(),
        db.feats.where("system").equals(SYSTEM).count(),
        db.classes.where("system").equals(SYSTEM).count(),
        db.subclasses.where("system").equals(SYSTEM).count(),
        db.rules.where("system").equals(SYSTEM).count(),
    ]);

    // Inserta si está vacío o si el stub trae más filas
    await db.transaction(
        "rw",
        [
            db.spells, db.species, db.items, db.monsters, db.actions,
            db.magicItems, db.backgrounds, db.feats, db.classes, db.subclasses, db.rules,
        ],
        async () => {
            if (!cSpells || cSpells < spellsData.length) await db.spells.bulkPut(withSystem(spellsData));
            if (!cSpecies || cSpecies < speciesData.length) await db.species.bulkPut(withSystem(speciesData));
            if (!cItems || cItems < itemsData.length) await db.items.bulkPut(withSystem(itemsData));
            if (!cMonsters || cMonsters < monstersData.length) await db.monsters.bulkPut(withSystem(monstersData));
            if (!cActions || cActions < actionsData.length) await db.actions.bulkPut(withSystem(actionsData));
            if (!cMagicItems || cMagicItems < magicItemsData.length) await db.magicItems.bulkPut(withSystem(magicItemsData));
            if (!cBackgrounds || cBackgrounds < backgroundsData.length) await db.backgrounds.bulkPut(withSystem(backgroundsData));
            if (!cFeats || cFeats < featsData.length) await db.feats.bulkPut(withSystem(featsData));
            if (!cClasses || cClasses < classesData.length) await db.classes.bulkPut(withSystem(classesData));
            if (!cSubclasses || cSubclasses < subclassesData.length) await db.subclasses.bulkPut(withSystem(subclassesData));
            if (!cRules || cRules < rulesData.length) await db.rules.bulkPut(withSystem(rulesData));
        }
    );
}
