import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Items } from "@domain/dnd5e";
import { db } from "@services/db";

type UseItemsState = {
    system: SystemId;
    data: Items[];
    isLoading: boolean;
    error: unknown;
};

export function useItems(): UseItemsState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Items[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.items.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useItems as useItemsDnd5e };
