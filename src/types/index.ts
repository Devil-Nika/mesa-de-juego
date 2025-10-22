export interface Spell {
    id: string;
    name: string;
    level: number;
    school: string;
    casting_time: string;
    range: string;
    components: {
        verbal: boolean;
        somatic: boolean;
        material: { hasM: boolean; text: string } | null;
    };
    duration: string;
    ritual: boolean;
    concentration: boolean;
    description: string;
    higher_level?: string;
    classes: string[];
    tags?: string[];
    source: string; // "SRD", "Homebrew", etc.
}
