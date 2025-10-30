import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Background } from "../../domain/dnd5e/Backgrounds";

export function useBackgroundsDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.backgrounds.where("system").equals(system).toArray() as Promise<Background[]>,
        [system]
    );
    return { system, background: data ?? [], isLoading: !data, error: null as unknown };
}
