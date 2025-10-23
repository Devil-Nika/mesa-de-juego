import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Spell } from "../domain/types/Spell";

type Filters = { q?: string; level?: number; ritual?: boolean; concentration?: boolean; };

export function useSpells(filters: Filters) {
    const { system } = useSystem();

    const data = useLiveQuery(async () => {
        // Partimos de los del sistema activo
        let list: Spell[] = await db.spells.where("system").equals(system).toArray();

        // Filtros en memoria (sencillos y tip-safe)
        if (typeof filters.level === "number") {
            list = list.filter((s: Spell) => s.level === filters.level);
        }
        if (typeof filters.ritual === "boolean") {
            list = list.filter((s: Spell) => s.ritual === filters.ritual);
        }
        if (typeof filters.concentration === "boolean") {
            list = list.filter((s: Spell) => s.concentration === filters.concentration);
        }
        if (filters.q?.trim()) {
            const ql = filters.q.toLowerCase();
            list = list.filter((s: Spell) => s.name.toLowerCase().includes(ql));
        }

        // Orden por nombre
        list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [system, filters.q, filters.level, filters.ritual, filters.concentration]);

    return { spells: data ?? [], loading: data === undefined };
}
