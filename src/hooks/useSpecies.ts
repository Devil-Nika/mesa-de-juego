import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Species } from "../domain/types";

export function useSpecies() {
    const { system } = useSystem();
    const rows = useLiveQuery(
        async () => await db.species.where("system").equals(system).toArray(),
        [system]
    );
    const isLoading = rows === undefined;
    const error: unknown = null;
    return { system, species: (rows ?? []) as Species[], isLoading, error };
}
