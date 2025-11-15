import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Feat } from "@domain/dnd5e";
import { db } from "@services/db";

type UseFeatsDnd5eState = {
    system: SystemId;
    data: Feat[];
    isLoading: boolean;
    error: unknown;
};

export function useFeatsDnd5e(): UseFeatsDnd5eState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Feat[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.feats.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}