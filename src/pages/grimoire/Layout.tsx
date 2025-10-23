import { NavLink, Outlet } from "react-router-dom";
import { useSystem } from "../../contexts/SystemContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded ${isActive ? "bg-black text-white" : "hover:bg-neutral-200"}`;

export default function GrimorioLayout() {
    const { system } = useSystem();
    return (
        <div className="grid grid-cols-12">
            <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 space-y-2">
                <h2 className="text-lg font-semibold mb-2">Grimorio</h2>
                <nav className="space-y-1">
                    <NavLink to={`/${system}/grimoire/spells`} className={linkClass}>Conjuros</NavLink>
                    <NavLink to={`/${system}/grimoire/species`} className={linkClass}>Especies</NavLink>
                    <NavLink to={`/${system}/grimoire/items`} className={linkClass}>Objetos</NavLink>
                </nav>
            </aside>
            <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
                <Outlet />
            </main>
        </div>
    );
}
