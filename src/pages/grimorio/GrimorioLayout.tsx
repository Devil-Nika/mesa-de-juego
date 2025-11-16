import { Outlet } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";

export default function GrimorioLayout() {
    const { system } = useSystem();

    return (
        <section className="max-w-5xl mx-auto px-4 py-6 space-y-4">
            {/* Cabecera súper simple */}
            <header className="flex items-center justify-between">
        <span className="text-sm uppercase tracking-wide opacity-70">
          {system}
        </span>
            </header>

            {/* Acá se renderiza GrimorioHub, Spells, Equipment, etc. */}
            <Outlet />
        </section>
    );
}