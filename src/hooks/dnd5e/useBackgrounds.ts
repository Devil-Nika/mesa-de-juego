import { useEffect, useState } from "react";
import type { SystemId } from "../../domain/types";
import type { Background } from "../../domain/dnd5e/Backgrounds";
import { db } from "../../services/db";

export function useBackgroundsDnd5e() {
    const system: SystemId = "dnd5e";
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const rows = await db.backgrounds.where("system").equals(system).toArray();
                if (!cancelled) setBackgrounds(rows);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [system]);

    return { system, backgrounds, isLoading, error };
}
export default useBackgroundsDnd5e;
