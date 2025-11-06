import { Link, NavLink, useParams } from "react-router-dom";
import SystemSwitcher from "./SystemSwitcher";
import { useLocale } from "@contexts/useLocale";

function navCls({ isActive }: { isActive: boolean }) {
    return [
        "px-3 py-1.5 rounded-md text-sm whitespace-nowrap",
        isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"
    ].join(" ");
}

export default function Header() {
    const { t } = useLocale();
    const params = useParams();
    const system = (params.system ?? "dnd5e") as string;

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
                {/* Logo -> actúa como Home, así evitamos el botón de Inicio */}
                <Link to={`/${system}`} className="shrink-0 font-semibold text-lg">
                    Mesa de Juego
                </Link>

                {/* Nav IZQUIERDA: scroll horizontal en pantallas chicas */}
                <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                    <NavLink to={`/${system}/encounter`} className={navCls}>
                        {t("nav.encounter")}
                    </NavLink>
                    <NavLink to={`/${system}/builder`} className={navCls}>
                        {t("nav.builder")}
                    </NavLink>
                    <NavLink to={`/${system}/grimoire`} end className={navCls}>
                        {t("nav.grimoire")}
                    </NavLink>
                    <NavLink to={`/${system}/options`} className={navCls}>
                        {t("nav.options")}
                    </NavLink>
                </nav>

                {/* Separador flexible */}
                <div className="flex-1" />

                {/* Controles DERECHA */}
                <div className="flex items-center gap-3">
                    <SystemSwitcher />
                </div>
            </div>
        </header>
    );
}
