export {
    KNOWN_SYSTEMS,
    type SystemId,                // 👈 ahora es: "dnd5e" | "pf2e" | "sf2e" | ...
    FAMILIES,
    AVAILABLE_SYSTEMS,
    availableFamilyMembers,
    getNavEntries,
    isSystemId,
    isFamilyId,
    markScopeUsed,
} from "./registry";

// Opcional: lista simple de sistemas individuales (para UIs rápidas)
import { getNavEntries, type SystemId as _SystemId } from "./registry";
export const systems = getNavEntries()
    .filter(e => e.kind === "system")
    .map(e => ({ id: e.id as _SystemId, label: e.label }));
