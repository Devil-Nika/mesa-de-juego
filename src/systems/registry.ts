// src/systems/registry.ts

// 1) Catálogo base
export const KNOWN_SYSTEMS = {
    dnd5e: "D&D 5e",
    pf2e: "Pathfinder 2e",
    sf2e: "Starfinder 2e",
    daggerheart: "Daggerheart",
    vampire5e: "Vampire 5e",
} as const;

export type SystemId = keyof typeof KNOWN_SYSTEMS;

// Familias (vendor) → miembros
export const FAMILIES: Record<"paizo" | "wotc" | "darrington" | "paradox", SystemId[]> = {
    paizo: ["pf2e", "sf2e"],
    wotc: ["dnd5e"],
    darrington: ["daggerheart"],
    paradox: ["vampire5e"],
};

// 2) Descubrimiento de sistemas disponibles (por carpetas de data)
const GLOB = import.meta.glob("../systems/*/data/*.json", { eager: true });
const found = new Set<string>();
Object.keys(GLOB).forEach((k) => {
    const m = k.match(/\.\.\/systems\/([^/]+)\/data\//);
    if (m?.[1]) found.add(m[1]);
});

export const AVAILABLE_SYSTEMS = Array.from(found).filter((id): id is SystemId => id in KNOWN_SYSTEMS);

// Utilidad: miembros disponibles de una familia
export function availableFamilyMembers(familyId: keyof typeof FAMILIES): SystemId[] {
    return FAMILIES[familyId].filter((s) => AVAILABLE_SYSTEMS.includes(s));
}

// 3) Tipos para navegación (sin any)
export type NavEntry =
    | { kind: "system"; id: SystemId; label: string }
    | { kind: "family"; id: keyof typeof FAMILIES; label: string; members: SystemId[] };

// 4) MRU (Most-Recently Used) en localStorage
const LS_KEY = "mdj:last-used-scopes";

function loadMRU(): string[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
    } catch {
        return [];
    }
}

function saveMRU(mru: string[]) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(mru)); } catch { /* noop */ }
}

// Llamalo cuando el usuario activa un scope (system o family)
export function markScopeUsed(id: SystemId | keyof typeof FAMILIES) {
    const mru = loadMRU();
    const next = [id, ...mru.filter((x) => x !== id)].slice(0, 10);
    saveMRU(next);
}

// 5) Entradas navegables y orden por “último usado”
export function getNavEntries(): NavEntry[] {
    const systems: NavEntry[] = AVAILABLE_SYSTEMS.map((id) => ({
        kind: "system",
        id,
        label: KNOWN_SYSTEMS[id],
    }));

    const families: NavEntry[] = (Object.keys(FAMILIES) as Array<keyof typeof FAMILIES>)
        .map((fid) => ({ id: fid, members: availableFamilyMembers(fid) }))
        .filter((f) => f.members.length > 0)
        .map((f) => ({
            kind: "family",
            id: f.id,
            label: f.id === "paizo" ? "Paizo (PF2e+SF2e)" : String(f.id),
            members: f.members,
        }));

    const entries = [...families, ...systems];

    // Orden MRU: lo último usado primero, el resto por label asc
    const mru = loadMRU();
    const score = (e: NavEntry) => {
        const idx = mru.indexOf(e.id);
        return idx === -1 ? Number.POSITIVE_INFINITY : idx; // menor = más reciente
    };
    return entries
        .slice()
        .sort((a, b) => {
            const sa = score(a), sb = score(b);
            if (sa !== sb) return sa - sb;
            return a.label.localeCompare(b.label);
        });
}

// 6) Helpers de validación
export function isSystemId(x: string): x is SystemId {
    return (KNOWN_SYSTEMS as Record<string, string>)[x] !== undefined;
}
export function isFamilyId(x: string): x is keyof typeof FAMILIES {
    return (FAMILIES as Record<string, SystemId[]>)[x] !== undefined;
}