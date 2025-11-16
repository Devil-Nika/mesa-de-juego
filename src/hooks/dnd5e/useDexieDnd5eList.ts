import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";

type UseDnd5eListState<T> = {
    system: SystemId;
    data: T[];
    isLoading: boolean;
    error: unknown;
};

export function useDexieDnd5eList<T>(
    fetch: (system: SystemId) => Promise<T[]>
): UseDnd5eListState<T> {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetch(system)
            .then((rows) => {
                if (!cancelled) setData(rows);
            })
            .catch((e) => {
                if (!cancelled) setError(e);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [system]);

    return { system, data, isLoading, error };
}