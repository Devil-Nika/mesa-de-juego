import type { RowBase } from "../types";

export interface Subclass extends RowBase {
    system: "dnd5e";
    parentClassId?: string;
    description?: string; // 👈 lo usa la página
    features?: Array<{ level: number; name: string; text: string }>;
}
export type Subclasses = Subclass;
export default undefined as unknown as never;
