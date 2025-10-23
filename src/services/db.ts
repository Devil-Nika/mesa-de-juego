import Dexie, { type Table } from "dexie";
import type { Spell } from "../domain/types/Spell";
import type { Species } from "../domain/types/Species";
import type { Item } from "../domain/types/Item";

type Migratable = {
    pk?: string;
    id?: string;
    system?: string;
    name?: string;
};

export class GameDB extends Dexie {
    spells!: Table<Spell, string>;
    species!: Table<Species, string>;
    items!: Table<Item, string>;

    constructor() {
        super("MesaDeJuegoDB");

        this.version(3).stores({
            spells:  "&pk, system, name, level, ritual, concentration",
            species: "&pk, system, name",
            items:   "&pk, system, name, type",
        }).upgrade(async (tx) => {
            const normalize = async (tableName: "spells" | "species" | "items") => {
                const table = tx.table(tableName) as Table<Migratable, string>;
                await table.toCollection().modify((obj) => {
                    const system = obj.system ?? "dnd5e";
                    const id = obj.id ?? (obj.name?.toLowerCase().replace(/\s+/g, "-") || crypto.randomUUID());
                    obj.system = system;
                    obj.id = id;
                    obj.pk = `${system}:${id}`;
                });
            };
            await normalize("spells");
            await normalize("species");
            await normalize("items");
        });
    }
}

export const db = new GameDB();