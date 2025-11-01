import { createContext } from "react";
import type { SystemId } from "../systems/registry";

export type SystemContextValue = {
    system: SystemId;
    systemLabel: string;
    setSystem: (id: SystemId) => void;
};

export const SystemContext = createContext<SystemContextValue | null>(null);
