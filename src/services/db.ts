// src/services/db.ts
import Dexie, { type Table } from "dexie";
import type { Spells, Species, Items, Monster, Actions } from "../domain/types";

export class GameDB extends Dexie {
    spells!: Table<Spells, string>;
    species!: Table<Species, string>;
    items!: Table<Items, string>;
    monsters!: Table<Monster, string>;
    actions!: Table<Actions, string>;

    constructor() {
        super("MesaDeJuegoDB");

        // ⬆ bump a v5 para re-crear índices correctos
        this.version(5).stores({
            spells:   "&pk, system, name, level",
            species:  "&pk, system, name",
            items:    "&pk, system, name, type",       // ← antes decía category
            monsters: "&pk, system, name, challenge",  // ← antes decía cr
            actions:  "&pk, system, name, type",       // si Actions tiene "type" p/ clasificar, ok
        });
    }
}
export const db = new GameDB();
