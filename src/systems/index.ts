export type SystemId = "dnd5e"; // por ahora solo 5e. Si agregás más, extendé este union.

export interface SystemDescriptor {
    id: SystemId;
    label: string;
    enabled: boolean;
}

export const systems: Record<SystemId, SystemDescriptor> = {
    dnd5e: { id: "dnd5e", label: "D&D 5e", enabled: true },
};

export function isSystemId(x: string): x is SystemId {
    return x === "dnd5e";
}
