import type { SystemId } from "@domain/types";
import type { Feat } from "@domain/dnd5e";
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseFeatsDnd5eState = {
    system: SystemId;
    data: Feat[];
    isLoading: boolean;
    error: unknown;
};

export function useFeatsDnd5e(): UseFeatsDnd5eState {
    return useDexieDnd5eList<Feat>((system) =>
        db.feats.where("system").equals(system).toArray()
    );
}