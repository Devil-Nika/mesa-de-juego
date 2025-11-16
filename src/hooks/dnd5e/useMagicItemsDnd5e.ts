import type { SystemId } from "@domain/types";
import type { MagicItem } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseMagicItemsDnd5eState = {
    system: SystemId;
    data: MagicItem[];
    isLoading: boolean;
    error: unknown;
};

export function useMagicItemsDnd5e(): UseMagicItemsDnd5eState {
    return useDexieDnd5eList<MagicItem>((system) =>
        db.magicItems.where("system").equals(system).toArray()
    );
}