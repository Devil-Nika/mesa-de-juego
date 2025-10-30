import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Spell } from "../../domain/dnd5e/Spells";

export function useSpellsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.spells.where("system").equals(system).toArray() as Promise<Spell[]>,
        [system]
    );
    return { system, spells: data ?? [], isLoading: !data, error: null as unknown };
}
