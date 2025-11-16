import type { SystemId } from "@domain/types";
import type { Background } from "@domain/dnd5e";     // si tu barrel re-exporta Actions
import { db } from "@services/db";
import { useDexieDnd5eList } from "./useDexieDnd5eList";

type UseBackgroundsDnd5eState = {
    system: SystemId;
    data: Background[];
    isLoading: boolean;
    error: unknown;
};

export function useBackgroundsDnd5e(): UseBackgroundsDnd5eState {
    return useDexieDnd5eList<Background>((system) =>
        db.backgrounds.where("system").equals(system).toArray()
    );
}