import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded ${isActive ? "bg-black text-white" : "hover:bg-neutral-200"}`;

export default function GrimorioLayout() {
    return (
        <div className="grid grid-cols-12">
            <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 space-y-2">
                <h2 className="text-lg font-semibold mb-2">Grimorio</h2>
                <nav className="space-y-1">
                    <NavLink to="spells" className={linkClass}>Conjuros</NavLink>
                    <NavLink to="species" className={linkClass}>Especies</NavLink>
                    <NavLink to="items" className={linkClass}>Objetos</NavLink>
                    <NavLink to="monsters" className={linkClass}>Monstruos</NavLink>
                </nav>
            </aside>
            <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
                <Outlet />
            </main>
        </div>
    );
}
