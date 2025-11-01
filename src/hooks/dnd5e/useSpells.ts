import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Spell } from "../../domain/dnd5e/Spells";
import { db } from "../../services/db";

type UseSpellsState = {
    system: SystemId;
    data: Spell[];
    isLoading: boolean;
    error: unknown;
};

export function useSpells(): UseSpellsState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Spell[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.spells.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

// alias de compatibilidad
export { useSpells as useSpellsDnd5e };
