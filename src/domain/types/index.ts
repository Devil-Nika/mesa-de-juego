// SystemId canon
export type SystemId = "dnd5e" | "pf2e" | "sf2e" | "daggerheart" | "vampire5e";

// Fila base para todas las tablas
export interface RowBase {
    pk: string;
    id: string;
    system: SystemId;
    name: string;
    source?: string;
}
