import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Monster } from "../../domain/dnd5e/Monsters";

export function useMonstersDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.monsters.where("system").equals(system).toArray() as Promise<Monster[]>,
        [system]
    );
    return { system, monsters: data ?? [], isLoading: !data, error: null as unknown };
}
