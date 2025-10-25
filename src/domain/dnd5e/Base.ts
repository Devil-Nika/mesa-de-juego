import type { SystemId } from "../../systems";
export interface BaseRow {
    pk: string;        // `${system}:${id}`
    id: string;        // slug único dentro del sistema
    system: SystemId;  // "dnd5e"
    name: string;      // nombre visible
    source?: string;   // p.ej. "SRD 5.2.1"
}
