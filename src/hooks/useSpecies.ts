import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Species } from "../types/Species";

export function useSpecies(q?: string) {
    const { system } = useSystem();

    const data = useLiveQuery(async () => {
        let list: Species[] = await db.species.where("system").equals(system).toArray();
        if (q?.trim()) {
            const ql = q.toLowerCase();
            list = list.filter((s: Species) => s.name.toLowerCase().includes(ql));
        }
        list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [system, q]);

    return { species: data ?? [], loading: data === undefined };
}
