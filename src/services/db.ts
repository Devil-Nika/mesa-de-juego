import Dexie, { type IndexableType } from "dexie";
import type { Table } from "dexie"; // 👈 necesario con verbatimModuleSyntax
import type { SystemId, RowBase } from "../domain/types";

// D&D 5e modelos (solo estos por ahora)
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

// Esquema estándar: todas las tablas comparten pk / id / system / name
const common = "pk, id, system, name";

export class AppDB extends Dexie {
    // Tablas (tipadas)
    spells!: Table<Spell, IndexableType>;
    species!: Table<Species, IndexableType>;
    items!: Table<Items, IndexableType>;
    monsters!: Table<Monster, IndexableType>;
    actions!: Table<Actions, IndexableType>;
    magicItems!: Table<MagicItem, IndexableType>;
    backgrounds!: Table<Background, IndexableType>;
    feats!: Table<Feat, IndexableType>;
    classes!: Table<Classes, IndexableType>;
    subclasses!: Table<Subclass, IndexableType>;
    rules!: Table<Rule, IndexableType>;

    constructor() {
        super("mesaDeJuego");
        this.version(1).stores({
            spells: common,
            species: common,
            items: common,
            monsters: common,
            actions: common,
            magicItems: common,
            backgrounds: common,
            feats: common,
            classes: common,
            subclasses: common,
            rules: common,
        });
    }
}

// ✅ exportar db
export const db = new AppDB();

// Utilidad para construir PK consistente
export function makePk(system: SystemId, id: string): string {
    return `${system}:${id}`;
}
