import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Monster } from "../domain/types";

export function useMonsters() {
    const { system } = useSystem();
    const rows = useLiveQuery(
        async () => await db.monsters.where("system").equals(system).toArray(),
        [system]
    );
    const isLoading = rows === undefined;
    const error: unknown = null;
    return { system, monsters: (rows ?? []) as Monster[], isLoading, error };
}
