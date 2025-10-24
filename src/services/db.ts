import Dexie, { type EntityTable } from "dexie";

// 🔧 Alineamos los tipos con lo que consumen los hooks (incluye 'id')
export interface RowBasic {
    pk: string;
    id: string;
    system: "dnd5e";
    name: string;
}

export class GameDB extends Dexie {
    items!: EntityTable<RowBasic & { category?: string }, "pk">;
    spells!: EntityTable<RowBasic & { level?: number }, "pk">;
    species!: EntityTable<RowBasic, "pk">;
    monsters!: EntityTable<RowBasic & { cr?: number }, "pk">;
    actions!: EntityTable<RowBasic & { category?: string }, "pk">; // ✅ nueva

    constructor() {
        super("MesaDeJuegoDB");
        this.version(1).stores({
            items:    "&pk, system, name, category",
            spells:   "&pk, system, name, level",
            species:  "&pk, system, name",
            monsters: "&pk, system, name, cr",
            actions:  "&pk, system, name, category" // ✅ nueva
        });
    }
}

export const db = new GameDB();