import { useEffect, useMemo, useState } from "react";
import SystemContext, { type SystemContextValue } from "./SystemContext";
import { KNOWN_SYSTEMS, AVAILABLE_SYSTEMS, isSystemId, type SystemId } from "../systems/registry";

const LS_KEY = "mdj:system";

function loadInitialSystem(): SystemId {
    // 1) MRU en localStorage
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw && isSystemId(raw) && AVAILABLE_SYSTEMS.includes(raw)) return raw;
    } catch {
        /* noop */
    }
    // 2) fallback
    return AVAILABLE_SYSTEMS[0] ?? "dnd5e";
}

export default function SystemProvider({ children }: { children: React.ReactNode }) {
    const [system, setSystemState] = useState<SystemId>(() => loadInitialSystem());

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, system);
        } catch {
            void 0; // evita ESLint no-empty
        }
    }, [system]);

    const setSystem = (id: SystemId) => {
        if (!AVAILABLE_SYSTEMS.includes(id)) return;
        setSystemState(id);
    };

    const value = useMemo<SystemContextValue>(
        () => ({ system, systemLabel: KNOWN_SYSTEMS[system], setSystem }),
        [system]
    );

    return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}
