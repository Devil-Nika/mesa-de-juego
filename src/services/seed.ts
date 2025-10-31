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

// Carga JSONs (ajusta rutas según tengas)
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

type WithSystemPk<T extends Omit<RowBase, "system" | "pk">> = T & { system: SystemId; pk: string };

// helper: añade system + pk
function withSys<T extends Omit<RowBase, "system" | "pk">>(system: SystemId, rows: T[]): WithSystemPk<T>[] {
    return rows.map((r) => ({
        ...r,
        system,
        pk: `${system}:${r.id}`,
    }));
}

export async function seedDnd5e() {
    const system: SystemId = "dnd5e";

    // tipamos cada dataset
    const spellsData = spellsDataRaw as unknown as Omit<Spell, "system" | "pk">[];
    const speciesData = speciesDataRaw as unknown as Omit<Species, "system" | "pk">[];
    const itemsData = itemsDataRaw as unknown as Omit<Items, "system" | "pk">[];
    const monstersData = monstersDataRaw as unknown as Omit<Monster, "system" | "pk">[];
    const actionsData = actionsDataRaw as unknown as Omit<Actions, "system" | "pk">[];
    const magicItemsData = magicItemsDataRaw as unknown as Omit<MagicItem, "system" | "pk">[];
    const backgroundsData = backgroundsDataRaw as unknown as Omit<Background, "system" | "pk">[];
    const featsData = featsDataRaw as unknown as Omit<Feat, "system" | "pk">[];
    const classesData = classesDataRaw as unknown as Omit<Classes, "system" | "pk">[];
    const subclassesData = subclassesDataRaw as unknown as Omit<Subclass, "system" | "pk">[];
    const rulesData = rulesDataRaw as unknown as Omit<Rule, "system" | "pk">[];

    const [
        spellsC, speciesC, itemsC, monstersC, actionsC,
        magicItemsC, backgroundsC, featsC, classesC, subclassesC, rulesC,
    ] = await Promise.all([
        db.spells.where("system").equals(system).count(),
        db.species.where("system").equals(system).count(),
        db.items.where("system").equals(system).count(),
        db.monsters.where("system").equals(system).count(),
        db.actions.where("system").equals(system).count(),
        db.magicItems.where("system").equals(system).count(),
        db.backgrounds.where("system").equals(system).count(),
        db.feats.where("system").equals(system).count(),
        db.classes.where("system").equals(system).count(),
        db.subclasses.where("system").equals(system).count(),
        db.rules.where("system").equals(system).count(),
    ]);

    await db.transaction(
        "rw",
        [
            db.spells, db.species, db.items, db.monsters, db.actions,
            db.magicItems, db.backgrounds, db.feats, db.classes, db.subclasses, db.rules,
        ],
        async () => {
            if (spellsData.length      && (spellsC      === 0 || spellsC      < spellsData.length))      await db.spells.bulkPut(withSys(system, spellsData) as Spell[]);
            if (speciesData.length     && (speciesC     === 0 || speciesC     < speciesData.length))     await db.species.bulkPut(withSys(system, speciesData) as Species[]);
            if (itemsData.length       && (itemsC       === 0 || itemsC       < itemsData.length))       await db.items.bulkPut(withSys(system, itemsData) as Items[]);
            if (monstersData.length    && (monstersC    === 0 || monstersC    < monstersData.length))    await db.monsters.bulkPut(withSys(system, monstersData) as Monster[]);
            if (actionsData.length     && (actionsC     === 0 || actionsC     < actionsData.length))     await db.actions.bulkPut(withSys(system, actionsData) as Actions[]);
            if (magicItemsData.length  && (magicItemsC  === 0 || magicItemsC  < magicItemsData.length))  await db.magicItems.bulkPut(withSys(system, magicItemsData) as MagicItem[]);
            if (backgroundsData.length && (backgroundsC === 0 || backgroundsC < backgroundsData.length)) await db.backgrounds.bulkPut(withSys(system, backgroundsData) as Background[]);
            if (featsData.length       && (featsC       === 0 || featsC       < featsData.length))       await db.feats.bulkPut(withSys(system, featsData) as Feat[]);
            if (classesData.length     && (classesC     === 0 || classesC     < classesData.length))     await db.classes.bulkPut(withSys(system, classesData) as Classes[]);
            if (subclassesData.length  && (subclassesC  === 0 || subclassesC  < subclassesData.length))  await db.subclasses.bulkPut(withSys(system, subclassesData) as Subclass[]);
            if (rulesData.length       && (rulesC       === 0 || rulesC       < rulesData.length))       await db.rules.bulkPut(withSys(system, rulesData) as Rule[]);
        }
    );
}
