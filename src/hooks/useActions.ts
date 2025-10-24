import { useEffect, useState } from "react";
import { useSystem } from "../contexts/SystemContext";
import { db } from "../services/db";

interface ActionRow {
    pk: string;
    id: string;
    system: "dnd5e";
    name: string;
    category?: string; // "attack" | "feature" | "utility" | ...
}

export function useActions() {
    const { system } = useSystem();
    const [actions, setActions] = useState<ActionRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const rows = await db.actions.where("system").equals(system).toArray();
                if (alive) setActions(rows);
            } catch (e) {
                if (alive) setError(e);
            } finally {
                if (alive) setIsLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [system]);

    return { system, actions, isLoading, error };
}

// (Si antes exportabas useActionsMap, puedes ofrecer un stub opcional)
export function useActionsMap() {
    return new Map<string, unknown>();
}