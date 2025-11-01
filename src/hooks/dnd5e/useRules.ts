import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Rule } from "../../domain/dnd5e/Rules";
import { db } from "../../services/db";

const SYSTEM: SystemId = "dnd5e";

type UseRulesState = {
    system: SystemId;
    data: Rule[];
    isLoading: boolean;
    error: unknown;
};

export function useRules(): UseRulesState {
    const system = SYSTEM;
    const [data, setData] = useState<Rule[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.rules
            .where("system")
            .equals(system)
            .toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}