import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Classes } from "@domain/dnd5e";     // si tu barrel re-exporta Actions
import { db } from "@services/db";

type UseClassesState = {
    system: SystemId;
    data: Classes[];
    isLoading: boolean;
    error: unknown;
};

export function useClasses(): UseClassesState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Classes[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.classes.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useClasses as useClassesDnd5e };
