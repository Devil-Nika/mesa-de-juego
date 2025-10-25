import { useEffect, useState } from "react";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { MagicItem } from "../domain/types";

export function useMagicItems() {
    const { system } = useSystem();
    const [magicItems, setMagicItems] = useState<MagicItem[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setErr] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        db.magicItems.where("system").equals(system).toArray()
            .then((rows) => { if (alive) setMagicItems(rows); })
            .catch((e) => { if (alive) setErr(e); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [system]);

    return { system, magicItems, isLoading, error };
}
