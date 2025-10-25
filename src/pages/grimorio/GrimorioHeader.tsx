import { Link, useLocation } from "react-router-dom";
import { useSystem } from "../../contexts/SystemContext"; // ✅ ruta correcta

const tabs = [
    { to: "spells",    label: "Conjuros" },
    { to: "species",   label: "Especies" },
    { to: "items",     label: "Objetos" },
    { to: "monsters",  label: "Monstruos" },
    { to: "actions",   label: "Acciones" },
];

export default function DndHeader() {
    const { system } = useSystem();
    const { pathname } = useLocation();
    if (system !== "dnd5e") return null;

    return (
        <div className="mb-4 rounded-lg border bg-white p-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="font-semibold">Herramientas D&D 5e</div>
                <nav className="flex gap-2 text-sm">
                    {tabs.map(t => {
                        const href = `/${system}/grimoire/${t.to}`;
                        const active = pathname.startsWith(href);
                        return (
                            <Link
                                key={t.to}
                                to={href}
                                className={`px-3 py-1.5 rounded border ${active ? "bg-black text-white" : "bg-neutral-50 hover:bg-neutral-100"}`}
                            >
                                {t.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
