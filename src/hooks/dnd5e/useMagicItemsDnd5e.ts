import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { MagicItem } from "@domain/dnd5e";
import { db } from "@services/db";

type UseMagicItemsDnd5eState = {
    system: SystemId;
    data: MagicItem[];
    isLoading: boolean;
    error: unknown;
};

export function useMagicItemsDnd5e(): UseMagicItemsDnd5eState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<MagicItem[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.magicItems.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}