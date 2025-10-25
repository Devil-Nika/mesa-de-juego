import type { BaseRow } from "./Base";

export type ActionKind =
    | "Action" | "BonusAction" | "Reaction" | "Special";

export type CoreActionId =
    | "attack" | "dash" | "disengage" | "dodge" | "help" | "hide"
    | "influence" | "magic" | "ready" | "search" | "study" | "utilize";

export interface GameAction extends BaseRow {
    kind: ActionKind;
    key?: CoreActionId;     // para las acciones núcleo
    trigger?: string;       // para Reactions
    rules: string;          // definición resumida de la acción
    notes?: string[];
}
