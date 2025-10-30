import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Actions } from "../../domain/dnd5e/Actions";

export function useActionsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.actions.where("system").equals(system).toArray() as Promise<Actions[]>,
        [system]
    );
    return { system, actions: data ?? [], isLoading: !data, error: null as unknown };
}
