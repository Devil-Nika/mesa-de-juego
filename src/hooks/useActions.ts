import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Actions } from "../domain/types";

export function useActions() {
    const { system } = useSystem();
    const rows = useLiveQuery(
        async () => await db.actions.where("system").equals(system).toArray(),
        [system]
    );
    const isLoading = rows === undefined;
    const error: unknown = null;
    return { system, actions: (rows ?? []) as Actions[], isLoading, error };
}

// Si algún código usa useActionsMap, podés dejar este stub:
export function useActionsMap() {
    const { actions, isLoading, error } = useActions();
    const map = Object.fromEntries(actions.map(a => [a.pk, a]));
    return { actionsByPk: map as Record<string, Actions>, isLoading, error };
}
