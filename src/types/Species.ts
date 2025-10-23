import type { SystemId } from "../systems";

export interface Species {
    pk: string;               // "${system}:${id}"
    id: string;
    system: SystemId;
    name: string;
    size: "Small" | "Medium" | "Large" | string;
    speed: string;            // "30 ft"
    languages: string[];      // ["common", "elvish"]
    traits: string[];         // ["Versatile", "Darkvision", ...]
    source: "SRD" | string;
}
