import type { BaseRow } from "./Base";

export type ConditionId =
    | "blinded" | "charmed" | "deafened" | "exhaustion" | "frightened" | "grappled"
    | "incapacitated" | "invisible" | "paralyzed" | "petrified" | "poisoned"
    | "prone" | "restrained" | "stunned" | "unconscious";

export interface Condition extends BaseRow {
    key: ConditionId;   // clave canónica
    effects: string[];  // viñetas con efectos (resumidos)
}
