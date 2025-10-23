import { useEffect, useMemo, useState } from "react";
import { useSystem } from "../contexts/SystemContext";

export interface UseItemsOptions {
    search?: string;
    category?: "weapon" | "armor" | "gear" | "tool" | "consumable" | "other";
}

type ItemSummary = { pk: string; name: string; category?: string };

export function useItems(options: UseItemsOptions = {}) {
    const { system } = useSystem();
    const [data, setData] = useState<ItemSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // TODO: cargar items según `system`
        setData([]); // placeholder
        setIsLoading(false);
    }, [system]);

    const items = useMemo(() => {
        const term = (options.search ?? "").toLowerCase();
        const cat = options.category;
        return data.filter((i) => {
            const byText = !term || i.name.toLowerCase().includes(term);
            const byCat = !cat || i.category === cat;
            return byText && byCat;
        });
    }, [data, options.search, options.category]);

    return { system, items, isLoading, error };
}
