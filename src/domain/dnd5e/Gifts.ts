import type { RowBase } from "../types";

export interface Gift extends RowBase {
    system: "dnd5e";
    benefits?: string[];
    description?: string;
    srdTag?: string;
}
