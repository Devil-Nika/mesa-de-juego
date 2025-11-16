import type { SystemId } from "@domain/types";
import type { Rule } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseRulesDnd5eState = {
    system: SystemId;
    data: Rule[];
    isLoading: boolean;
    error: unknown;
};

export function useRulesDnd5e(): UseRulesDnd5eState {
    return useDexieDnd5eList<Rule>((system) =>
        db.rules.where("system").equals(system).toArray()
    );
}