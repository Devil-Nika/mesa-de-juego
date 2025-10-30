import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Subclass } from "../../domain/dnd5e/Subclasses";

export function useSubclassesDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.subclasses.where("system").equals(system).toArray() as Promise<Subclass[]>,
        [system]
    );
    return { system, subclasses: data ?? [], isLoading: !data, error: null as unknown };
}
