import { useEffect, useState } from "react";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Classes } from "../domain/types";

export function useClasses() {
    const { system } = useSystem();
    const [classes, setClasses] = useState<Classes[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setErr] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        db.classes.where("system").equals(system).toArray()
            .then((rows) => { if (alive) setClasses(rows); })
            .catch((e) => { if (alive) setErr(e); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [system]);

    return { system, classes, isLoading, error };
}
