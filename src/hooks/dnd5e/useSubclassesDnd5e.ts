import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Subclass } from "@domain/dnd5e";
import { db } from "@services/db";


type UseSubclassesDnd5eState = {
    system: SystemId;
    data: Subclass[];
    isLoading: boolean;
    error: unknown;
};

export function useSubclassesDnd5e(): UseSubclassesDnd5eState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Subclass[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.subclasses.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}
