import type { SystemId } from "@domain/types";
import type { Classes } from "@domain/dnd5e";     // si tu barrel re-exporta Actions
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseClassesDnd5eState = {
    system: SystemId;
    data: Classes[];
    isLoading: boolean;
    error: unknown;
};

export function useClassesDnd5e(): UseClassesDnd5eState {
    return useDexieDnd5eList<Classes>((system) =>
        db.classes.where("system").equals(system).toArray()
    );
}