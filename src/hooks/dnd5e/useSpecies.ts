import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Species } from "../../domain/dnd5e/Species";
import { db } from "../../services/db";

type UseSpeciesState = {
    system: SystemId;
    data: Species[];
    isLoading: boolean;
    error: unknown;
};

export function useSpecies(): UseSpeciesState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Species[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.species.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useSpecies as useSpeciesDnd5e };