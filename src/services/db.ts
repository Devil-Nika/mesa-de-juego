import Dexie, { type Table } from "dexie";
import type { Spell, Species, Items, Monster, Actions } from "../domain/dnd5e";

type Migratable = { pk?: string; id?: string; system?: string; name?: string };

export class GameDB extends Dexie {
    spells!: Table<Spell, string>;
    species!: Table<Species, string>;
    items!: Table<Items, string>;
    monsters!: Table<Monster, string>;
    actions!: Table<Actions, string>;

    constructor() {
        super("MesaDeJuegoDB");
        this.version(4).stores({
            spells:   "&pk, system, name, level, ritual, concentration",
            species:  "&pk, system, name",
            items:    "&pk, system, name, type",
            monsters: "&pk, system, name, type, challenge",
            actions:  "&pk, system, name, type",
        }).upgrade(async (tx) => {
            // normaliza pk/system en tablas antiguas (spells/species/items)
            for (const name of ["spells","species","items"] as const) {
                const table = tx.table(name) as Table<Migratable, string>;
                await table.toCollection().modify((obj) => {
                    const system = obj.system ?? "dnd5e";
                    const id = obj.id ?? (obj.name?.toLowerCase().replace(/\s+/g, "-") || crypto.randomUUID());
                    obj.system = system;
                    obj.id = id;
                    obj.pk = `${system}:${id}`;
                });
            }
        });
    }
}

export const db = new GameDB();
