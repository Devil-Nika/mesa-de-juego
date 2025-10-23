export type SystemId = "dnd5e" | "pf2e" | "sf2e";
export const SYSTEMS: Record<SystemId, { label: string }> = {
    dnd5e: { label: "D&D 5e" },
    pf2e:  { label: "Pathfinder 2e" },
    sf2e:  { label: "Starfinder 2e" },
};
