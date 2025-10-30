import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { useSystem } from "../../contexts/SystemContext";
import type { Rule } from "../../domain/dnd5e/Rules";

export function useRulesDnd5e() {
    const { system } = useSystem();
    const data = useLiveQuery(
        () => db.rules.where("system").equals(system).toArray() as Promise<Rule[]>,
        [system]
    );
    return { system, rules: data ?? [], isLoading: !data, error: null as unknown };
}
