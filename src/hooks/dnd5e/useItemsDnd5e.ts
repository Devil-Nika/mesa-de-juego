import type { SystemId } from "@domain/types";
import type { Items } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseItemsDnd5eState = {
    system: SystemId;
    data: Items[];
    isLoading: boolean;
    error: unknown;
};

export function useItemsDnd5e(): UseItemsDnd5eState {
    return useDexieDnd5eList<Items>((system) =>
        db.items.where("system").equals(system).toArray()
    );
}