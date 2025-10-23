import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { useSystem } from "../contexts/SystemContext";
import type { Item } from "../types/Item";

export function useItems(q?: string, type?: string) {
    const { system } = useSystem();

    const data = useLiveQuery(async () => {
        let list: Item[] = await db.items.where("system").equals(system).toArray();
        if (type) list = list.filter((i: Item) => i.type === type);
        if (q?.trim()) {
            const ql = q.toLowerCase();
            list = list.filter((i: Item) => i.name.toLowerCase().includes(ql));
        }
        list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [system, q, type]);

    return { items: data ?? [], loading: data === undefined };
}
