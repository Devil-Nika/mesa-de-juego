import type { SystemId } from "@domain/types";
import type { Species } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseSpeciesDnd5eState = {
    system: SystemId;
    data: Species[];
    isLoading: boolean;
    error: unknown;
};

export function useSpeciesDnd5e(): UseSpeciesDnd5eState {
    return useDexieDnd5eList<Species>((system) =>
        db.species.where("system").equals(system).toArray()
    );
}