import Dexie, { type DexieOptions } from "dexie";
import type { Table } from "dexie";

import type { Spell, Species, Items, Monster, Actions, MagicItem, Background, Feat, Classes, Subclass, Rule } from "@domain/dnd5e";

export class GameDB extends Dexie {
    spells!: Table<Spell, string>;
    species!: Table<Species, string>;
    items!: Table<Items, string>;
    monsters!: Table<Monster, string>;
    actions!: Table<Actions, string>;
    magicItems!: Table<MagicItem, string>;
    backgrounds!: Table<Background, string>;
    feats!: Table<Feat, string>;
    classes!: Table<Classes, string>;
    subclasses!: Table<Subclass, string>;
    rules!: Table<Rule, string>;

    constructor(name = "mesa-de-juego", options?: DexieOptions) {
        super(name, options);

        this.version(1).stores({
            spells: "pk, id, system, name",
            species: "pk, id, system, name",
            items: "pk, id, system, name",
            monsters: "pk, id, system, name",
            actions: "pk, id, system, name",
            magicItems: "pk, id, system, name",
            backgrounds: "pk, id, system, name",
            feats: "pk, id, system, name",
            classes: "pk, id, system, name",
            subclasses: "pk, id, system, name",
            rules: "pk, id, system, name",
        });

        this.spells = this.table("spells");
        this.species = this.table("species");
        this.items = this.table("items");
        this.monsters = this.table("monsters");
        this.actions = this.table("actions");
        this.magicItems = this.table("magicItems");
        this.backgrounds = this.table("backgrounds");
        this.feats = this.table("feats");
        this.classes = this.table("classes");
        this.subclasses = this.table("subclasses");
        this.rules = this.table("rules");
    }
}

// 👇 export nombrado para que los hooks lo usen
export const db = new GameDB();
