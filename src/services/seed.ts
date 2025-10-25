import { db } from "./db";
import type { SystemId } from "../systems"; // tu helper de systems
import type {
    Spell, Species, Item, MagicItems, Monsters, GameAction, RuleGlossary,
    AreaOfEffect, Condition, Feat, Backgrounds, CharacterClass, Subclass,
    Blessing, SupernaturalGift
} from "../domain/dnd5e";

const DATA = import.meta.glob("../systems/*/data/*.json", { eager: true, import: "default" }) as Record<string, unknown>;

function getData<T>(system: SystemId, file: string): T {
    const key = `../systems/${system}/data/${file}.json`;
    const mod = DATA[key];
    return (Array.isArray(mod) ? mod : []) as T;
}

export async function seedIfNeeded(system: SystemId) {
    const spellsData       = getData<Omit<Spell, "pk"|"system">[]>(system, "spells");
    const speciesData      = getData<Omit<Species, "pk"|"system">[]>(system, "species");
    const itemsData        = getData<Omit<Item, "pk"|"system">[]>(system, "items");
    const magicItemsData   = getData<Omit<MagicItems, "pk"|"system">[]>(system, "magic-items");
    const monstersData     = getData<Omit<Monsters, "pk"|"system">[]>(system, "monsters");
    const actionsData      = getData<Omit<GameAction, "pk"|"system">[]>(system, "actions");
    const rulesData        = getData<Omit<RuleGlossary, "pk"|"system">[]>(system, "rules");
    const areasData        = getData<Omit<AreaOfEffect, "pk"|"system">[]>(system, "areas");
    const conditionsData   = getData<Omit<Condition, "pk"|"system">[]>(system, "conditions");
    const featsData        = getData<Omit<Feat, "pk"|"system">[]>(system, "feats");
    const backgroundsData  = getData<Omit<Backgrounds, "pk"|"system">[]>(system, "backgrounds");
    const classesData      = getData<Omit<CharacterClass, "pk"|"system">[]>(system, "classes");
    const subclassesData   = getData<Omit<Subclass, "pk"|"system">[]>(system, "subclasses");
    const blessingsData    = getData<Omit<Blessing, "pk"|"system">[]>(system, "blessings");
    const giftsData        = getData<Omit<SupernaturalGift, "pk"|"system">[]>(system, "gifts");

    const addSys = <T extends { id: string }>(arr: T[]) => arr.map(x => ({ ...x, system, pk: `${system}:${x.id}` }));

    console.debug("[seed] sizes", {
        system,
        spells: spellsData.length, species: speciesData.length, items: itemsData.length,
        magicItems: magicItemsData.length, monsters: monstersData.length, actions: actionsData.length,
        rules: rulesData.length, areas: areasData.length, conditions: conditionsData.length,
        feats: featsData.length, backgrounds: backgroundsData.length, classes: classesData.length,
        subclasses: subclassesData.length, blessings: blessingsData.length, gifts: giftsData.length
    });

    await db.transaction("rw", [
        db.spells, db.species, db.items, db.magicItems, db.monsters, db.actions,
        db.rules, db.areas, db.conditions, db.feats, db.backgrounds, db.classes,
        db.subclasses, db.blessings, db.gifts
    ], async () => {

        const counts = await Promise.all([
            db.spells.where("system").equals(system).count(),
            db.species.where("system").equals(system).count(),
            db.items.where("system").equals(system).count(),
            db.magicItems.where("system").equals(system).count(),
            db.monsters.where("system").equals(system).count(),
            db.actions.where("system").equals(system).count(),
            db.rules.where("system").equals(system).count(),
            db.areas.where("system").equals(system).count(),
            db.conditions.where("system").equals(system).count(),
            db.feats.where("system").equals(system).count(),
            db.backgrounds.where("system").equals(system).count(),
            db.classes.where("system").equals(system).count(),
            db.subclasses.where("system").equals(system).count(),
            db.blessings.where("system").equals(system).count(),
            db.gifts.where("system").equals(system).count()
        ]);

        const [
            spellsC, speciesC, itemsC, magicItemsC, monstersC, actionsC,
            rulesC, areasC, conditionsC, featsC, backgroundsC, classesC,
            subclassesC, blessingsC, giftsC
        ] = counts;

        if (spellsData.length   && (spellsC   === 0 || spellsC   < spellsData.length))   await db.spells.bulkPut(addSys(spellsData));
        if (speciesData.length  && (speciesC  === 0 || speciesC  < speciesData.length))  await db.species.bulkPut(addSys(speciesData));
        if (itemsData.length    && (itemsC    === 0 || itemsC    < itemsData.length))    await db.items.bulkPut(addSys(itemsData));
        if (magicItemsData.length && (magicItemsC === 0 || magicItemsC < magicItemsData.length)) await db.magicItems.bulkPut(addSys(magicItemsData));
        if (monstersData.length && (monstersC === 0 || monstersC < monstersData.length)) await db.monsters.bulkPut(addSys(monstersData));
        if (actionsData.length  && (actionsC  === 0 || actionsC  < actionsData.length))  await db.actions.bulkPut(addSys(actionsData));
        if (rulesData.length    && (rulesC    === 0 || rulesC    < rulesData.length))    await db.rules.bulkPut(addSys(rulesData));
        if (areasData.length    && (areasC    === 0 || areasC    < areasData.length))    await db.areas.bulkPut(addSys(areasData));
        if (conditionsData.length && (conditionsC === 0 || conditionsC < conditionsData.length)) await db.conditions.bulkPut(addSys(conditionsData));
        if (featsData.length    && (featsC    === 0 || featsC    < featsData.length))    await db.feats.bulkPut(addSys(featsData));
        if (backgroundsData.length && (backgroundsC === 0 || backgroundsC < backgroundsData.length)) await db.backgrounds.bulkPut(addSys(backgroundsData));
        if (classesData.length  && (classesC  === 0 || classesC  < classesData.length))  await db.classes.bulkPut(addSys(classesData));
        if (subclassesData.length && (subclassesC === 0 || subclassesC < subclassesData.length)) await db.subclasses.bulkPut(addSys(subclassesData));
        if (blessingsData.length && (blessingsC === 0 || blessingsC < blessingsData.length)) await db.blessings.bulkPut(addSys(blessingsData));
        if (giftsData.length     && (giftsC     === 0 || giftsC     < giftsData.length))     await db.gifts.bulkPut(addSys(giftsData));
    });

    const after = {
        spells: await db.spells.where("system").equals(system).count(),
        species: await db.species.where("system").equals(system).count(),
        items: await db.items.where("system").equals(system).count(),
        magicItems: await db.magicItems.where("system").equals(system).count(),
        monsters: await db.monsters.where("system").equals(system).count(),
        actions: await db.actions.where("system").equals(system).count(),
        rules: await db.rules.where("system").equals(system).count(),
        areas: await db.areas.where("system").equals(system).count(),
        conditions: await db.conditions.where("system").equals(system).count(),
        feats: await db.feats.where("system").equals(system).count(),
        backgrounds: await db.backgrounds.where("system").equals(system).count(),
        classes: await db.classes.where("system").equals(system).count(),
        subclasses: await db.subclasses.where("system").equals(system).count(),
        blessings: await db.blessings.where("system").equals(system).count(),
        gifts: await db.gifts.where("system").equals(system).count()
    };
    console.debug("[seed] after", after);
}

export async function ensureSeeded(system: SystemId = "dnd5e" as SystemId): Promise<void> {
    try {
        await seedIfNeeded(system);
    } catch (err) {
        console.error("ensureSeeded error:", err);
    }
}
