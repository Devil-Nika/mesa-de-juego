import type { SystemId } from "@domain/types";
import type { Actions } from "@domain/dnd5e";     // si tu barrel re-exporta Actions
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseActionsDnd5eState = {
    system: SystemId;
    data: Actions[];
    isLoading: boolean;
    error: unknown;
};

export function useActionsDnd5e(): UseActionsDnd5eState {
    return useDexieDnd5eList<Actions>((system) =>
        db.actions.where("system").equals(system).toArray()
    );
}