import { useEffect, useMemo, useState } from "react";
import { useSystem } from "../contexts/SystemContext";

export interface UseMonstersOptions {
    search?: string;
    crMin?: number;
    crMax?: number;
}

type MonsterSummary = { pk: string; name: string; cr?: number };

export function useMonsters(options: UseMonstersOptions = {}) {
    const { system } = useSystem();
    const [data, setData] = useState<MonsterSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // TODO: cargar monstruos según `system`
        setData([]); // placeholder
        setIsLoading(false);
    }, [system]);

    const monsters = useMemo(() => {
        const term = (options.search ?? "").toLowerCase();
        const min = options.crMin ?? -Infinity;
        const max = options.crMax ?? Infinity;
        return data.filter((m) => {
            const byText = !term || m.name.toLowerCase().includes(term);
            const byCr =
                m.cr == null ||
                (typeof m.cr === "number" && m.cr >= min && m.cr <= max);
            return byText && byCr;
        });
    }, [data, options.search, options.crMin, options.crMax]);

    return { system, monsters, isLoading, error };
}
