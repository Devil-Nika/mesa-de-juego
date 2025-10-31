import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Subclass } from "../../domain/dnd5e/Subclasses";
import { db } from "../../services/db";

export function useSubclassesDnd5e() {
    const system: SystemId = "dnd5e";
    const [subclasses, setSubclasses] = useState<Subclass[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const rows = await db.subclasses.where("system").equals(system).toArray();
                if (!cancelled) setSubclasses(rows);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [system]);

    return { system, subclasses, isLoading, error };
}
export default useSubclassesDnd5e;
