import { createContext } from "react";
import type { SystemId } from "../systems/registry";

export type SystemContextValue = {
    system: SystemId;
    systemLabel: string;
    setSystem: (id: SystemId) => void;
};

const SystemContext = createContext<SystemContextValue | null>(null);
export default SystemContext;
