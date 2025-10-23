import { systems, type SystemId } from "../systems";
import { useSystem } from "../contexts/SystemContext";
import { useNavigate } from "react-router-dom";

export function SystemSwitcher() {
    const { system, setSystem } = useSystem();
    const navigate = useNavigate();

    const handleChange = (s: SystemId) => {
        setSystem(s);
        navigate(`/${s}`);
    };

    return (
        <div className="flex gap-2">
            {Object.values(systems).map((s) => (
                <button
                    key={s.id}
                    onClick={() => handleChange(s.id)}
                    className={`px-3 py-1 rounded ${system === s.id ? "bg-black text-white" : "bg-neutral-200"}`}
                    title={s.label}
                >
                    {s.label}
                </button>
            ))}
        </div>
    );
}
