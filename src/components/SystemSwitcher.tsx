// src/components/SystemSwitcher.tsx
import { useMemo } from "react";
import { useSystem } from "../contexts/SystemContext";
import { AVAILABLE_SYSTEMS, KNOWN_SYSTEMS, markScopeUsed } from "../systems/registry";

export default function SystemSwitcher() {
    const { system, setSystem } = useSystem();

    const options = useMemo(
        () => AVAILABLE_SYSTEMS.map((id) => ({ id, label: KNOWN_SYSTEMS[id] })),
        []
    );

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const next = e.target.value as typeof system;
        if (next !== system) {
            setSystem(next);
            markScopeUsed(next); // MRU para ordenar entradas, opcional
        }
    }

    return (
        <label className="inline-flex items-center gap-2">
            <span className="text-sm opacity-75">Sistema</span>
            <select
                value={system}
                onChange={onChange}
                className="border rounded px-2 py-1 text-sm bg-white"
            >
                {options.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}