import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Items } from "../../domain/dnd5e/Items";

export function useItemsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.items.where("system").equals(system).toArray() as Promise<Items[]>,
        [system]
    );
    return { system, items: data ?? [], isLoading: !data, error: null as unknown };
}
