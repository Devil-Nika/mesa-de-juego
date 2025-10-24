import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Items } from "../domain/types";

export function useItems() {
    const { system } = useSystem();
    const rows = useLiveQuery(
        async () => await db.items.where("system").equals(system).toArray(),
        [system]
    );
    const isLoading = rows === undefined;
    const error: unknown = null;
    return { system, items: (rows ?? []) as Items[], isLoading, error };
}
