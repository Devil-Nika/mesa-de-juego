import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Species } from "../../domain/dnd5e/Species";

export function useSpeciesDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.species.where("system").equals(system).toArray() as Promise<Species[]>,
        [system]
    );
    return { system, species: data ?? [], isLoading: !data, error: null as unknown };
}
