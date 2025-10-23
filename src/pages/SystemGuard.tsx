import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSystem } from "../contexts/SystemContext";
import type { SystemId } from "../systems";

const VALID: SystemId[] = ["dnd5e","pf2e","sf2e"];

export default function SystemGuard({ children }: { children: React.ReactNode }) {
    const { system, setSystem } = useSystem();
    const params = useParams();
    const sys = params.system as SystemId | undefined;

    // Hook SIEMPRE se ejecuta
    useEffect(() => {
        if (sys && VALID.includes(sys) && sys !== system) {
            setSystem(sys);
        }
    }, [sys, system, setSystem]);

    // Luego validamos
    if (!sys || !VALID.includes(sys)) {
        return <Navigate to="/dnd5e/grimoire/spells" replace />;
    }

    return <>{children}</>;
}
