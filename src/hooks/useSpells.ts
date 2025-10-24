import { useEffect, useState } from "react";
import { useSystem } from "../contexts/SystemContext";
import { db } from "../services/db";

interface SpellRow {
    pk: string;
    id: string;
    system: "dnd5e";
    name: string;
    level?: number;
}

export function useSpells() {
    const { system } = useSystem();
    const [spells, setSpells] = useState<SpellRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const rows = await db.spells.where("system").equals(system).toArray();
                if (alive) setSpells(rows);
            } catch (e) {
                if (alive) setError(e);
            } finally {
                if (alive) setIsLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [system]);

    return { system, spells, isLoading, error };
}
