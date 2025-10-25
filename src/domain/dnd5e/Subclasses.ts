import type { BaseRow } from "./Base";

export interface SubclassFeature {
    level: number;
    name: string;
    text: string;
}

export interface Subclass extends BaseRow {
    forClass: string;              // id de la clase base, p.ej. "wizard"
    features: SubclassFeature[];
}
