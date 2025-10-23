import { db } from "./db";
import type { SystemId } from "../systems";
import type { Spell, Species, Items, Actions, Monster } from "../domain/dnd5e";

const DATA = import.meta.glob("../systems/*/data/*.json", { eager: true, import: "default" }) as Record<string, unknown>;

function getData<T>(system: SystemId, file: string): T {
    const key = `../systems/${system}/data/${file}.json`;
    const mod = DATA[key];
    return (Array.isArray(mod) ? mod : []) as T;
}

export async function seedIfNeeded(system: SystemId) {
    const spells   = getData<Omit<Spell, "pk"|"system">[]>(system, "spells");
    const species  = getData<Omit<Species, "pk"|"system">[]>(system, "species");
    const items    = getData<Omit<Items, "pk"|"system">[]>(system, "items");
    const actions  = getData<Omit<Actions, "pk"|"system">[]>(system, "actions");
    const monsters = getData<Omit<Monster, "pk"|"system">[]>(system, "monsters");

    console.debug("[seed]", { system, spells: spells.length, species: species.length, items: items.length, actions: actions.length, monsters: monsters.length });

    const [spellsCount, speciesCount, itemsCount, actionsCount, monstersCount] = await Promise.all([
        db.spells.where("system").equals(system).count(),
        db.species.where("system").equals(system).count(),
        db.items.where("system").equals(system).count(),
        db.actions.where("system").equals(system).count(),
        db.monsters.where("system").equals(system).count(),
    ]);
    console.debug("[seed] counts before", { spellsCount, speciesCount, itemsCount, actionsCount, monstersCount });

    if ((spellsCount === 0 || spellsCount < spells.length) && spells.length)
        await db.spells.bulkPut(spells.map(s => ({ ...s, system, pk: `${system}:${s.id}` } as Spell)));
    if ((speciesCount === 0 || speciesCount < species.length) && species.length)
        await db.species.bulkPut(species.map(s => ({ ...s, system, pk: `${system}:${s.id}` } as Species)));
    if ((itemsCount === 0 || itemsCount < items.length) && items.length)
        await db.items.bulkPut(items.map(i => ({ ...i, system, pk: `${system}:${i.id}` } as Items)));
    if ((actionsCount === 0 || actionsCount < actions.length) && actions.length)
        await db.actions.bulkPut(actions.map(a => ({ ...a, system, pk: `${system}:${a.id}` } as Actions)));
    if ((monstersCount === 0 || monstersCount < monsters.length) && monsters.length)
        await db.monsters.bulkPut(monsters.map(m => ({ ...m, system, pk: `${system}:${m.id}` } as Monster)));

    const after = {
        spells:   await db.spells.where("system").equals(system).count(),
        species:  await db.species.where("system").equals(system).count(),
        items:    await db.items.where("system").equals(system).count(),
        actions:  await db.actions.where("system").equals(system).count(),
        monsters: await db.monsters.where("system").equals(system).count(),
    };
    console.debug("[seed] counts after", after);
}
