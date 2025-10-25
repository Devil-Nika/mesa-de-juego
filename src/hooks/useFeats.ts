import { useEffect, useState } from "react";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Feat } from "../domain/types";

export function useFeats() {
    const { system } = useSystem();
    const [feats, setFeats] = useState<Feat[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setErr] = useState<unknown>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        db.feats.where("system").equals(system).toArray()
            .then((rows) => { if (alive) setFeats(rows); })
            .catch((e) => { if (alive) setErr(e); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [system]);

    return { system, feats, isLoading, error };
}
