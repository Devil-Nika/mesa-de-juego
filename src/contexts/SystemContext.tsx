/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SystemId } from "../systems";  // 👈 importa del index nuevo

type Ctx = { system: SystemId; setSystem: (s: SystemId) => void };
export const SystemContext = createContext<Ctx | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
    const [system, setSystem] = useState<SystemId>("dnd5e"); // 👈 ok
    return (
        <SystemContext.Provider value={{ system, setSystem }}>
            {children}
        </SystemContext.Provider>
    );
}

export function useSystem() {
    const ctx = useContext(SystemContext);
    if (!ctx) throw new Error("SystemContext not found");
    return ctx;
}
