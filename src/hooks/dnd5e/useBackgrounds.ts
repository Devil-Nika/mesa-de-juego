import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Background } from "../../domain/dnd5e/Backgrounds";
import { db } from "../../services/db";

type UseBackgroundsState = {
    system: SystemId;
    data: Background[];
    isLoading: boolean;
    error: unknown;
};

export function useBackgrounds(): UseBackgroundsState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Background[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.backgrounds.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useBackgrounds as useBackgroundsDnd5e };
