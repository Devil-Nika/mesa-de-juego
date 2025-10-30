import type { RowBase } from "../types";

export interface Subclass extends RowBase {
    system: "dnd5e";
    parentClassId?: string;   // id o nombre abierto de clase
    text?: string;
    srdTag?: string;
}
