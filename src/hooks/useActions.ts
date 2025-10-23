import { useEffect, useMemo, useState } from "react";
import { useSystem } from "../contexts/SystemContext";

export interface UseActionsOptions {
    search?: string;
    category?: "attack" | "feature" | "spell" | "utility" | "other";
}

type ActionSummary = { pk: string; name: string; category?: string };

export function useActions(options: UseActionsOptions = {}) {
    const { system } = useSystem();
    const [data, setData] = useState<ActionSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // TODO: cargar acciones según `system`
        setData([]); // placeholder
        setIsLoading(false);
    }, [system]);

    const actions = useMemo(() => {
        const term = (options.search ?? "").toLowerCase();
        const cat = options.category;
        return data.filter((a) => {
            const byText = !term || a.name.toLowerCase().includes(term);
            const byCat = !cat || a.category === cat;
            return byText && byCat;
        });
    }, [data, options.search, options.category]);

    return { system, actions, isLoading, error };
}

/** Stub por compatibilidad con código previo que importaba useActionsMap */
export function useActionsMap() {
    return new Map<string, unknown>();
}
