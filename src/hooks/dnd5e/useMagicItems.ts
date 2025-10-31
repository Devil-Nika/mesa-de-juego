import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { MagicItem } from "../../domain/dnd5e/MagicItems";
import { db } from "../../services/db";

export function useMagicItemsDnd5e() {
    const system: SystemId = "dnd5e";
    const [magicItems, setMagicItems] = useState<MagicItem[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const rows = await db.magicItems.where("system").equals(system).toArray();
                if (!cancelled) setMagicItems(rows);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [system]);

    return { system, magicItems, isLoading, error };
}
export default useMagicItemsDnd5e;
