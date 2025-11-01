// src/pages/grimorio/GrimorioHeader.tsx
import { NavLink } from "react-router-dom";
import { useSystem } from "../../contexts/useSystem";

export default function GrimorioHeader() {
    const { system } = useSystem();
    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-1.5 rounded text-sm ${
            isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"
        }`;

    return (
        <header className="mb-4 border-b pb-3">
            <div className="flex items-center justify-between">
                <div className="font-semibold">
                    Grimorio <span className="opacity-60">({system})</span>
                </div>
                <nav className="flex gap-2">
                    <NavLink to="spells" className={linkCls}>Conjuros</NavLink>
                    <NavLink to="species" className={linkCls}>Especies</NavLink>
                    <NavLink to="items" className={linkCls}>Objetos</NavLink>
                    <NavLink to="monsters" className={linkCls}>Monstruos</NavLink>
                    <NavLink to="actions" className={linkCls}>Acciones</NavLink>
                    {/* si ya tienes las nuevas páginas, déjalas visibles */}
                    <NavLink to="classes" className={linkCls}>Clases</NavLink>
                    <NavLink to="subclasses" className={linkCls}>Subclases</NavLink>
                    <NavLink to="backgrounds" className={linkCls}>Trasfondos</NavLink>
                    <NavLink to="feats" className={linkCls}>Dotes</NavLink>
                    <NavLink to="magic-items" className={linkCls}>Obj. mágicos</NavLink>
                </nav>
            </div>
        </header>
    );
}
