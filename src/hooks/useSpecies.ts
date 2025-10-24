import { useEffect, useState } from "react";
import { useSystem } from "../contexts/SystemContext";
import { db } from "../services/db";

interface SpeciesRow { pk: string; id: string; system: "dnd5e"; name: string; }

export function useSpecies() {
    const { system } = useSystem();
    const [species, setSpecies] = useState<SpeciesRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const rows = await db.species.where("system").equals(system).toArray();
                if (alive) setSpecies(rows);
            } catch (e) {
                if (alive) setError(e);
            } finally {
                if (alive) setIsLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [system]);

    return { system, species, isLoading, error };
}