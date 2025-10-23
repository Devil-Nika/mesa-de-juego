import { useEffect, useMemo, useState } from "react";
import { useSystem } from "../contexts/SystemContext";

export interface UseSpeciesOptions {
    search?: string;
}

type SpeciesSummary = { pk: string; name: string };

export function useSpecies(options: UseSpeciesOptions = {}) {
    const { system } = useSystem();
    const [data, setData] = useState<SpeciesSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // TODO: cargar species según `system`
        setData([]); // placeholder
        setIsLoading(false);
    }, [system]);

    const species = useMemo(() => {
        const term = (options.search ?? "").toLowerCase();
        return data.filter((s) => !term || s.name.toLowerCase().includes(term));
    }, [data, options.search]);

    return { system, species, isLoading, error };
}
