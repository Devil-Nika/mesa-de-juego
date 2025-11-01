import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { KNOWN_SYSTEMS, AVAILABLE_SYSTEMS, type SystemId, isSystemId } from "../systems/registry";

type SystemContextValue = {
    /** Id interno: 'dnd5e' | 'pf2e' | ... */
    system: SystemId;
    /** Etiqueta amigable: 'D&D 5e', 'Pathfinder 2e', ... */
    systemLabel: string;
    /** Cambiar el sistema actual */
    setSystem: (id: SystemId) => void;
};

const SystemContext = createContext<SystemContextValue | null>(null);

const LS_KEY = "mdj:system";

function loadInitialSystem(): SystemId {
    // 1) MRU en localStorage
    const raw = localStorage.getItem(LS_KEY);
    if (raw && isSystemId(raw) && AVAILABLE_SYSTEMS.includes(raw)) return raw;

    // 2) Si no hay MRU, elegir el primero disponible o fallback a dnd5e
    return AVAILABLE_SYSTEMS[0] ?? "dnd5e";
}

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [system, setSystemState] = useState<SystemId>(() => loadInitialSystem());

    useEffect(() => {
        try { localStorage.setItem(LS_KEY, system); } catch { /* noop */ }
    }, [system]);

    const setSystem = (id: SystemId) => {
        if (!AVAILABLE_SYSTEMS.includes(id)) return; // ignora ids no disponibles
        setSystemState(id);
    };

    const value = useMemo<SystemContextValue>(() => ({
        system,
        systemLabel: KNOWN_SYSTEMS[system],
        setSystem,
    }), [system]);

    return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}

export function useSystem(): SystemContextValue {
    const ctx = useContext(SystemContext);
    if (!ctx) throw new Error("useSystem must be used inside <SystemProvider>");
    return ctx;
}
