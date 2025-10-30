import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { MagicItem } from "../../domain/dnd5e/MagicItems";

export function useMagicItemsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.magicItems.where("system").equals(system).toArray() as Promise<MagicItem[]>,
        [system]
    );
    return { system, magicitem: data ?? [], isLoading: !data, error: null as unknown };
}
