import { useEffect, useMemo, useState } from "react";
import { useSystem } from "../contexts/SystemContext";

export interface UseSpellsOptions {
    search?: string;
    level?: number; // opcional, para cuando tengas niveles
}

type SpellSummary = { pk: string; name: string; level?: number };

export function useSpells(options: UseSpellsOptions = {}) {
    const { system } = useSystem();
    const [data, setData] = useState<SpellSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // TODO: cuando tengas data real, cargala según `system`
        setData([]); // placeholder
        setIsLoading(false);
    }, [system]);

    const spells = useMemo(() => {
        const term = (options.search ?? "").toLowerCase();
        const lvl = options.level;
        return data.filter((s) => {
            const byText = !term || s.name.toLowerCase().includes(term);
            const byLvl = lvl == null || s.level === lvl;
            return byText && byLvl;
        });
    }, [data, options.search, options.level]);

    return { system, spells, isLoading, error };
}
