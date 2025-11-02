import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Actions } from "@domain/dnd5e";     // si tu barrel re-exporta Actions
import { db } from "@services/db";

type UseActionsState = {
    system: SystemId;
    data: Actions[];
    isLoading: boolean;
    error: unknown;
};

export function useActions(): UseActionsState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Actions[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.actions.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useActions as useActionsDnd5e };
