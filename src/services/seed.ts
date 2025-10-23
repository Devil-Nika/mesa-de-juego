import { db } from "./db";
import type { SystemId } from "../systems";
import type { Spell } from "../types/Spell";
import type { Species } from "../types/Species";
import type { Item } from "../types/Item";

/**
 * Pre-cargamos TODOS los JSON posibles (por sistema) en build time.
 * Vite reemplaza esto por un objeto { ruta -> módulo }.
 * La clave es relativa a ESTE archivo: "../systems/<system>/data/<file>.json"
 */
const DATA = import.meta.glob("../systems/*/data/*.json", {
    eager: true,           // importa ya (sin promesas)
    import: "default",     // quedate con el default (el array JSON)
}) as Record<string, unknown>;

// Helper: obtiene y castea el JSON pedido o [] si no existe
function getData<T>(system: SystemId, file: "spells" | "species" | "items"): T {
    const key = `../systems/${system}/data/${file}.json`;
    const mod = DATA[key];
    return (Array.isArray(mod) ? mod : []) as T;
}

export async function seedIfNeeded(system: SystemId) {
    // Leemos los arrays (si no existen, vienen como [])
    const spells = getData<Omit<Spell, "pk" | "system">[]>(system, "spells");
    const species = getData<Omit<Species, "pk" | "system">[]>(system, "species");
    const items = getData<Omit<Item, "pk" | "system">[]>(system, "items");

    // Sólo sembramos si no hay registros de ese sistema
    if (await db.spells.where("system").equals(system).count() === 0 && spells.length) {
        await db.spells.bulkAdd(spells.map(s => ({ ...s, system, pk: `${system}:${s.id}` } as Spell)));
    }
    if (await db.species.where("system").equals(system).count() === 0 && species.length) {
        await db.species.bulkAdd(species.map(s => ({ ...s, system, pk: `${system}:${s.id}` } as Species)));
    }
    if (await db.items.where("system").equals(system).count() === 0 && items.length) {
        await db.items.bulkAdd(items.map(i => ({ ...i, system, pk: `${system}:${i.id}` } as Item)));
    }
}
