import type { Spell } from "@domain/dnd5e";
import type { SystemId } from "@domain/types";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseSpellsDnd5eState = {
    system: SystemId;
    data: Spell[];
    isLoading: boolean;
    error: unknown;
};

export function useSpellsDnd5e(): UseSpellsDnd5eState {
    return useDexieDnd5eList<Spell>((system) =>
        db.spells.where("system").equals(system).toArray()
    );
}