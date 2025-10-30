import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Class } from "../../domain/dnd5e/Classes";

export function useSubclassesDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.classes.where("system").equals(system).toArray() as Promise<Class[]>,
        [system]
    );
    return { system, classes: data ?? [], isLoading: !data, error: null as unknown };
}
