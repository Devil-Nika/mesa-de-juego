import type { BaseRow } from "./Base";

export type FeatCategory = "Origin" | "General" | "FightingStyle" | "EpicBoon";

export interface Feat extends BaseRow {
    category: FeatCategory;
    prerequisite?: string;
    benefits: string[];     // bullets
    repeatable?: boolean;
}
