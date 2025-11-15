import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Spell } from "@domain/dnd5e";
import { db } from "@services/db";


type UseSpellsDnd5eState = {
    system: SystemId;
    data: Spell[];
    isLoading: boolean;
    error: unknown;
};

export function useSpellsDnd5e(): UseSpellsDnd5eState {
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