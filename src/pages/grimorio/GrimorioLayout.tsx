import { NavLink, Outlet } from "react-router-dom";
import { useSystem } from "../../contexts/useSystem";

const links = [
    { to: "actions", label: "Acciones" },
    { to: "backgrounds", label: "Trasfondos" },
    { to: "classes", label: "Clases" },
    { to: "feats", label: "Dotes" },
    { to: "items", label: "Objetos" },
    { to: "magic-items", label: "Objetos mágicos" },
    { to: "monsters", label: "Monstruos" },
    { to: "rules", label: "Reglas" },
    { to: "species", label: "Especies" },
    { to: "spells", label: "Conjuros" },
    { to: "subclasses", label: "Subclases" },
] as const;

export default function GrimorioLayout() {
    const { system } = useSystem();
    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded ${
            isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"
        }`;

    return (
        <div className="grid grid-cols-[240px_1fr] gap-6 p-6">
            <aside className="space-y-4">
                <h2 className="font-semibold text-lg">Grimorio ({system})</h2>
                <nav className="flex flex-col gap-2">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} className={linkCls}>
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
