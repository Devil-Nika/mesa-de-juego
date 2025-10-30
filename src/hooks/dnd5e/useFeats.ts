import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Feat } from "../../domain/dnd5e/Feats";

export function useFeatsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.feats.where("system").equals(system).toArray() as Promise<Feat[]>,
        [system]
    );
    return { system, feats: data ?? [], isLoading: !data, error: null as unknown };
}
