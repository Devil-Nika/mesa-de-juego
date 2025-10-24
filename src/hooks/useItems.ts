import { useEffect, useState } from "react";
import { useSystem } from "../contexts/SystemContext";
import { db } from "../services/db";

interface ItemRow {
    pk: string;
    id: string;
    system: "dnd5e";
    name: string;
    category?: string;
}

export function useItems() {
    const { system } = useSystem();
    const [items, setItems] = useState<ItemRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const rows = await db.items.where("system").equals(system).toArray();
                if (alive) setItems(rows);
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

    return { system, items, isLoading, error };
}
