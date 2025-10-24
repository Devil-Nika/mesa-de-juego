// src/services/seed.ts
import { db } from "./db";
import dnd5eItems from "../systems/dnd5e/data/items.json";
import dnd5eSpells from "../systems/dnd5e/data/spells.json";
import dnd5eSpecies from "../systems/dnd5e/data/species.json";
import dnd5eMonsters from "../systems/dnd5e/data/monsters.json";
import dnd5eActions from "../systems/dnd5e/data/actions.json";

interface BaseRow { pk: string; id: string; system: "dnd5e"; name: string; }
interface ItemRow extends BaseRow { category?: string }
interface SpellRow extends BaseRow { level?: number }
type SpeciesRow = BaseRow;
interface MonsterRow extends BaseRow { cr?: number }
interface ActionRow extends BaseRow { category?: string }

export async function ensureSeeded(): Promise<void> {
    const count = await db.items.count();
    if (count > 0) return;

    await db.transaction(
        "rw",
        [db.items, db.spells, db.species, db.monsters, db.actions], // 👈 array de tablas
        async () => {
            await db.items.bulkPut(dnd5eItems as ItemRow[]);
            await db.spells.bulkPut(dnd5eSpells as SpellRow[]);
            await db.species.bulkPut(dnd5eSpecies as SpeciesRow[]);
            await db.monsters.bulkPut(dnd5eMonsters as MonsterRow[]);
            await db.actions.bulkPut(dnd5eActions as ActionRow[]);
        }
    );
}