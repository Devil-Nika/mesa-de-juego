import type { SystemId } from "@domain/types";
import type { Subclass } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseSubclassesDnd5eState = {
    system: SystemId;
    data: Subclass[];
    isLoading: boolean;
    error: unknown;
};

export function useSubclassesDnd5e(): UseSubclassesDnd5eState {
    return useDexieDnd5eList<Subclass>((system) =>
        db.subclasses.where("system").equals(system).toArray()
    );
}