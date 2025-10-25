import { useEffect, useState } from "react";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Subclass } from "../domain/types";

export function useSubclasses() {
    const { system } = useSystem();
    const [subclasses, setSubclasses] = useState<Subclass[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setErr] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        db.subclasses.where("system").equals(system).toArray()
            .then((rows) => { if (alive) setSubclasses(rows); })
            .catch((e) => { if (alive) setErr(e); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [system]);

    return { system, subclasses, isLoading, error };
}
