import { useEffect, useState } from "react";
import type { SystemId } from "@domain/types";
import type { Monster } from "@domain/dnd5e";
import { db } from "@services/db";

type UseMonstersState = {
    system: SystemId;
    data: Monster[];
    isLoading: boolean;
    error: unknown;
};

export function useMonsters(): UseMonstersState {
    const system: SystemId = "dnd5e";
    const [data, setData] = useState<Monster[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        db.monsters.where("system").equals(system).toArray()
            .then((rows) => { if (!cancelled) setData(rows); })
            .catch((e) => { if (!cancelled) setError(e); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [system]);

    return { system, data, isLoading, error };
}

export { useMonsters as useMonstersDnd5e };
