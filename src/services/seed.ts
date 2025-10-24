import { db } from "./db";
import type { SystemId } from "../systems";
import type { Spells, Species, Items, Actions, Monster } from "../domain/types";

// Mapa de todos los JSON por sistema detectados por Vite:
const DATA = import.meta.glob("../systems/*/data/*.json", {
    eager: true,
    import: "default",
}) as Record<string, unknown>;

function getData<T>(system: SystemId, file: string): T {
    const key = `../systems/${system}/data/${file}.json`;
    const mod = DATA[key];
    return (Array.isArray(mod) ? mod : []) as T;
}

export async function seedIfNeeded(system: SystemId) {
    // 👉 Variables *de datos* con nombres únicos (no chocan con tipos)
    const spellsData   = getData<Omit<Spells,   "pk"|"system">[]>(system, "spells");
    const speciesData  = getData<Omit<Species,  "pk"|"system">[]>(system, "species");
    const itemsData    = getData<Omit<Items,    "pk"|"system">[]>(system, "items");
    const actionsData  = getData<Omit<Actions,  "pk"|"system">[]>(system, "actions");
    const monstersData = getData<Omit<Monster,  "pk"|"system">[]>(system, "monsters");

    // Logs claros: nada de “actions” sin declarar
    console.debug("[seed] sizes", {
        system,
        spells:   spellsData.length,
        species:  speciesData.length,
        items:    itemsData.length,
        actions:  actionsData.length,
        monsters: monstersData.length,
    });

    const [spellsCount, speciesCount, itemsCount, actionsCount, monstersCount] = await Promise.all([
        db.spells.where("system").equals(system).count(),
        db.species.where("system").equals(system).count(),
        db.items.where("system").equals(system).count(),
        db.actions.where("system").equals(system).count(),
        db.monsters.where("system").equals(system).count(),
    ]);
    console.debug("[seed] before", { spellsCount, speciesCount, itemsCount, actionsCount, monstersCount });

    // Usa siempre las *Data variables* aquí:
    if ((spellsCount   === 0 || spellsCount   < spellsData.length)   && spellsData.length)
        await db.spells.bulkPut(spellsData  .map(s => ({ ...s, system, pk: `${system}:${s.id}` })));
    if ((speciesCount  === 0 || speciesCount  < speciesData.length)  && speciesData.length)
        await db.species.bulkPut(speciesData.map(s => ({ ...s, system, pk: `${system}:${s.id}` })));
    if ((itemsCount    === 0 || itemsCount    < itemsData.length)    && itemsData.length)
        await db.items.bulkPut(itemsData    .map(i => ({ ...i, system, pk: `${system}:${i.id}` })));
    if ((actionsCount  === 0 || actionsCount  < actionsData.length)  && actionsData.length)
        await db.actions.bulkPut(actionsData.map(a => ({ ...a, system, pk: `${system}:${a.id}` })));
    if ((monstersCount === 0 || monstersCount < monstersData.length) && monstersData.length)
        await db.monsters.bulkPut(monstersData.map(m => ({ ...m, system, pk: `${system}:${m.id}` })));

    const after = {
        spells:   await db.spells.where("system").equals(system).count(),
        species:  await db.species.where("system").equals(system).count(),
        items:    await db.items.where("system").equals(system).count(),
        actions:  await db.actions.where("system").equals(system).count(),
        monsters: await db.monsters.where("system").equals(system).count(),
    };
    console.debug("[seed] after", after);
}
export async function ensureSeeded(system: SystemId = "dnd5e" as SystemId): Promise<void> {
    try {
        await seedIfNeeded(system);
    } catch (err) {
        console.error("ensureSeeded error:", err); // loguea y sigue
    }
}