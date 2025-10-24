import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Spells } from "../domain/types";

export function useSpells() {
    const { system } = useSystem();
    const rows = useLiveQuery(
        async () => await db.spells.where("system").equals(system).toArray(),
        [system]
    );
    const isLoading = rows === undefined;
    const error: unknown = null;
    return { system, spells: (rows ?? []) as Spells[], isLoading, error };
}
