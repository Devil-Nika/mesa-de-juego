import { useEffect, useState } from "react";
// ⬇️ ESTAS RUTAS SON DESDE src/hooks/**
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Rule } from "../domain/dnd5e/Rules";

type UseRulesState = {
    system: string;
    data: Rule[];
    isLoading: boolean;
    error: unknown;
};

export function useRules(): UseRulesState {
    const { system } = useSystem();
    const [data, setData] = useState<Rule[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.rules
            .where("system")
            .equals(system)
            .toArray()
            .then((rows: Rule[]) => {
                if (!cancelled) setData(rows);
            })
            .catch((e: unknown) => {
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
