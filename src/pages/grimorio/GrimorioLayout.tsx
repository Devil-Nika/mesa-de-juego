import { NavLink, Outlet } from "react-router-dom";

export default function GrimorioLayout() {
    const link = (to: string, label: string) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-1 rounded ${isActive ? "bg-black text-white" : "bg-neutral-200"}`
            }
        >
            {label}
        </NavLink>
    );

    return (
        <div className="grid grid-cols-12 gap-4">
            <aside className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
                <h2 className="font-semibold mb-2">Grimorio</h2>
                <nav className="flex flex-wrap gap-2">
                    {link("spells", "Conjuros")}
                    {link("species", "Especies")}
                    {link("items", "Objetos")}
                    {link("monsters", "Monstruos")}
                    {link("actions", "Acciones")}
                    {/* nuevas */}
                    {link("classes", "Clases")}
                    {link("subclasses", "Subclases")}
                    {link("backgrounds", "Trasfondos")}
                    {link("feats", "Dotes")}
                    {link("magic-items", "Obj. mágicos")}
                </nav>
            </aside>
            <main className="col-span-12 md:col-span-9 lg:col-span-10">
                <Outlet />
            </main>
        </div>
    );
}
