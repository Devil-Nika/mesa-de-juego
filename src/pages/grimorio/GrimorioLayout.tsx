//*import GrimorioHeader from "./GrimorioHeader";
import { NavLink, Outlet } from "react-router-dom";
import { useSystem } from "../../contexts/SystemContext";

export default function GrimorioLayout() {
    const { system } = useSystem();
    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded ${isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"}`;

    return (
        <div className="grid grid-cols-[240px_1fr] gap-6">
            <aside className="space-y-4">
                <h2 className="font-semibold text-lg">Grimorio ({system})</h2>

                <nav className="flex flex-col gap-2">
                    <div className="text-sm uppercase opacity-70">Bestiario & Reglas</div>
                    <NavLink to="spells" className={linkCls}>Conjuros</NavLink>
                    <NavLink to="species" className={linkCls}>Especies</NavLink>
                    <NavLink to="items" className={linkCls}>Objetos</NavLink>
                    <NavLink to="monsters" className={linkCls}>Monstruos</NavLink>
                </nav>

                <nav className="flex flex-col gap-2">
                    <div className="text-sm uppercase opacity-70 mt-2">Personaje</div>
                    <NavLink to="classes" className={linkCls}>Clases</NavLink>
                    <NavLink to="subclasses" className={linkCls}>Subclases</NavLink>
                    <NavLink to="backgrounds" className={linkCls}>Trasfondos</NavLink>
                    <NavLink to="feats" className={linkCls}>Dotes</NavLink>
                    <NavLink to="magic-items" className={linkCls}>Objetos mágicos</NavLink>
                </nav>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
