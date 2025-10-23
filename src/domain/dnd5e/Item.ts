import type { SystemId } from "../../systems";

export interface Items {
    pk: string;               // "${system}:${id}"
    id: string;
    system: SystemId;
    name: string;
    type: string;             // "weapon.melee", "armor.light", "gear", etc.
    cost?: string;            // "2 gp"
    weight?: string;          // "1 lb"
    properties?: string[];    // ["finesse", "light", "thrown (20/60)"]
    description?: string;
    source: "SRD" | string;
}
