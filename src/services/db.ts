import Dexie, { type Table } from "dexie";
import type {
    Spell, Species, Item, MagicItems, Monsters, GameAction, RuleGlossary,
    AreaOfEffect, Condition, Feat, Backgrounds, CharacterClass, Subclass,
    Blessing, SupernaturalGift
} from "../domain/dnd5e";

type Migratable = { pk?: string; id?: string; system?: string; name?: string };

export class GameDB extends Dexie {
    spells!: Table<Spell, string>;
    species!: Table<Species, string>;
    items!: Table<Item, string>;
    magicItems!: Table<MagicItems, string>;
    monsters!: Table<Monsters, string>;
    actions!: Table<GameAction, string>;
    rules!: Table<RuleGlossary, string>;
    areas!: Table<AreaOfEffect, string>;
    conditions!: Table<Condition, string>;
    feats!: Table<Feat, string>;
    backgrounds!: Table<Backgrounds, string>;
    classes!: Table<CharacterClass, string>;
    subclasses!: Table<Subclass, string>;
    blessings!: Table<Blessing, string>;
    gifts!: Table<SupernaturalGift, string>;

    constructor() {
        super("MesaDeJuegoDB");
        this.version(5).stores({
            spells:      "&pk, system, name, level, school",
            species:     "&pk, system, name, size",
            items:       "&pk, system, name, category",
            magicItems:  "&pk, system, name, rarity",
            monsters:    "&pk, system, name, type, cr",
            actions:     "&pk, system, name, kind",
            rules:       "&pk, system, name, tag",
            areas:       "&pk, system, name, shape",
            conditions:  "&pk, system, name, key",
            feats:       "&pk, system, name, category",
            backgrounds: "&pk, system, name, feat",
            classes:     "&pk, system, name, hitDie",
            subclasses:  "&pk, system, name, forClass",
            blessings:   "&pk, system, name",
            gifts:       "&pk, system, name"
        }).upgrade(async (tx) => {
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