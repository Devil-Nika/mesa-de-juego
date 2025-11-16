import type { SystemId } from "@domain/types";
import type { Monster } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseMonstersDnd5eState = {
    system: SystemId;
    data: Monster[];
    isLoading: boolean;
    error: unknown;
};

export function useMonstersDnd5e(): UseMonstersDnd5eState {
    return useDexieDnd5eList<Monster>((system) =>
        db.monsters.where("system").equals(system).toArray()
    );
}