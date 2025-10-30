/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { SystemId } from "../domain/types";

type Ctx = { system: SystemId; setSystem: (s: SystemId) => void };

export const SystemContext = createContext<Ctx | null>(null);

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [system, setSystem] = useState<SystemId>("dnd5e");
    return (
        <SystemContext.Provider value={{ system, setSystem }}>
            {children}
        </SystemContext.Provider>
    );
}

export function useSystem(): Ctx {
    const ctx = useContext(SystemContext);
    if (!ctx) throw new Error("useSystem must be used within SystemProvider");
    return ctx;
}
