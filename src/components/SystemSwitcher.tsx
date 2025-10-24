import { useNavigate } from "react-router-dom";
import { useSystem } from "../contexts/SystemContext";
import { getNavEntries, markScopeUsed, type SystemId } from "../systems";

export function SystemSwitcher() {
    const { system, setSystem } = useSystem();
    const navigate = useNavigate();

    const entries = getNavEntries().filter(e => e.kind === "system"); // dnd5e, pf2e, sf2e…

    const handleChange = (s: SystemId) => {
        setSystem(s);
        markScopeUsed(s);         // 👈 registra MRU antes de navegar
        navigate(`/${s}`);
    };

    return (
        <div className="flex gap-2">
            {entries.map((e) => (
                <button
                    key={e.id}
                    onClick={() => handleChange(e.id as SystemId)}
                    className={`px-3 py-1 rounded ${system === e.id ? "bg-black text-white" : "bg-neutral-200"}`}
                    title={e.label}
                >
                    {e.label}
                </button>
            ))}
        </div>
    );
}
