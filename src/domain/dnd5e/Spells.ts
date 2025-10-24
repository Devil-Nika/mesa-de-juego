import type { SystemId } from "../../systems";
export interface Spells {
    pk: string;
    id: string;
    system: SystemId;
    name: string;
    level: number;
    school: string;
    casting_time: string;
    range: string;
    components: { verbal: boolean; somatic: boolean; material: { hasM: boolean; text: string } | null };
    duration: string;
    ritual: boolean;
    concentration: boolean;
    description: string;
    higher_level?: string;
    classes: string[];
    tags?: string[];
    source: "SRD" | string;
}