import { useEffect, useState } from "react";
import { useSystem } from "../contexts/SystemContext";
import { db } from "../services/db";

interface MonsterRow {
    pk: string;
    id: string;
    system: "dnd5e";
    name: string;
    cr?: number;
}

export function useMonsters() {
    const { system } = useSystem();
    const [monsters, setMonsters] = useState<MonsterRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const rows = await db.monsters.where("system").equals(system).toArray();
                if (alive) setMonsters(rows);
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

    return { system, monsters, isLoading, error };
}
