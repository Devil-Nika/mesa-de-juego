// src/db/GameDB.ts
import Dexie, { type EntityTable } from "dexie";
import type { Spell } from "../types";

export class GameDB extends Dexie {
    // En v4: EntityTable<Entidad, 'clavePrimaria'>
    spells!: EntityTable<Spell, "id">;

    constructor() {
        super("MesaDeJuegoDB");
        this.version(1).stores({
            // &id = primary key 'id' (string). Agregá índices que usarás.
            spells: "&id, name, level, ritual"
        });
    }
}

export const db = new GameDB();
