// Sistemas conocidos (id -> label)
export const KNOWN_SYSTEMS = {
    dnd5e: "D&D 5e",
    pf2e: "Pathfinder 2e",
    sf2e: "Starfinder 2e",
    daggerheart: "Daggerheart",
    vampire5e: "Vampire 5e",
} as const;

export type SystemId = keyof typeof KNOWN_SYSTEMS;

// Familias (vendor): id de familia -> miembros
export const FAMILIES: Record<string, SystemId[]> = {
    paizo: ["pf2e", "sf2e"],
    wotc: ["dnd5e"], // por si querés tratar WotC como familia simple
    darrington: ["daggerheart"],
    paradox: ["vampire5e"],
};

// Detecta sistemas disponibles mirando /systems/*/data/*.json
const GLOB = import.meta.glob("../systems/*/data/*.json", { eager: true });
const found = new Set<string>();
Object.keys(GLOB).forEach((k) => {
    const m = k.match(/\.\.\/systems\/([^/]+)\/data\//);
    if (m?.[1]) found.add(m[1]);
});

export const AVAILABLE_SYSTEMS = Array.from(found).filter((id) => id in KNOWN_SYSTEMS) as SystemId[];

// Si hay al menos 1 miembro de la familia, mostramos esa familia como “scope”
export function availableFamilyMembers(familyId: keyof typeof FAMILIES): SystemId[] {
    return FAMILIES[familyId].filter((s) => AVAILABLE_SYSTEMS.includes(s));
}

// Entradas navegables: sistemas individuales + combos de familia
export function getNavEntries() {
    const systems = AVAILABLE_SYSTEMS.map((id) => ({ kind: "system" as const, id, label: KNOWN_SYSTEMS[id] }));
    const families = (Object.keys(FAMILIES) as Array<keyof typeof FAMILIES>)
        .map((fid) => ({ id: fid, members: availableFamilyMembers(fid) }))
        .filter((f) => f.members.length > 0)
        .map((f) => ({ kind: "family" as const, id: f.id, label: f.id === "paizo" ? "Paizo (PF2e+SF2e)" : f.id, members: f.members }));

    // Orden: Paizo combo primero si está, luego D&D, luego resto A→Z
    const sortKey = (e: any) => (e.kind === "family" && e.id === "paizo" ? "0" : e.label);
    return [...families, ...systems].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
}
