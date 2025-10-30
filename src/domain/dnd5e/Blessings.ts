import type { RowBase } from "../types";

export interface Blessing extends RowBase {
    system: "dnd5e";
    benefits?: string[];
    description?: string;
    srdTag?: string;
}
