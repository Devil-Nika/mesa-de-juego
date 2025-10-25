import { useEffect, useState } from "react";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Background } from "../domain/types";

export function useBackgrounds() {
    const { system } = useSystem();
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setErr] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        db.backgrounds.where("system").equals(system).toArray()
            .then((rows) => { if (alive) setBackgrounds(rows); })
            .catch((e) => { if (alive) setErr(e); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [system]);

    return { system, backgrounds, isLoading, error };
}
