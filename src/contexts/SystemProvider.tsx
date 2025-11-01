import { useEffect, useMemo, useState } from "react";
import { KNOWN_SYSTEMS, AVAILABLE_SYSTEMS, isSystemId, type SystemId } from "../systems/registry";
import { SystemContext } from "./SystemContext";

const LS_KEY = "mdj:system";

function loadInitialSystem(): SystemId {
    const raw = localStorage.getItem(LS_KEY);
    if (raw && isSystemId(raw) && AVAILABLE_SYSTEMS.includes(raw)) return raw;
    return AVAILABLE_SYSTEMS[0] ?? "dnd5e";
}

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [system, setSystemState] = useState<SystemId>(() => loadInitialSystem());

    useEffect(() => { try { localStorage.setItem(LS_KEY, system); } catch {} }, [system]);

    const setSystem = (id: SystemId) => {
        if (!AVAILABLE_SYSTEMS.includes(id)) return;
        setSystemState(id);
    };

    const value = useMemo(() => ({
        system,
        systemLabel: KNOWN_SYSTEMS[system],
        setSystem,
    }), [system]);

    return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}
