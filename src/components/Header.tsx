import { Link, NavLink, useParams } from "react-router-dom";
import SystemSwitcher from "./SystemSwitcher";
import { useLocale } from "@contexts/useLocale";

function navCls({ isActive }: { isActive: boolean }) {
    const base =
        "px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors border";

    if (isActive) {
        return [
            base,
            // activo: fuerte en ambos temas
            "border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
        ].join(" ");
    }

    return [
        base,
        // inactivo: chip neutro que respeta claro/oscuro
        "border-neutral-300 bg-neutral-200 text-neutral-900 hover:bg-neutral-300 " +
        "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
    ].join(" ");
}

export default function Header() {
    const { t } = useLocale();
    const params = useParams();
    const system = (params.system ?? "dnd5e") as string;

    return (
        <header className="w-full border-b border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
                {/* Logo -> actúa como Home, así evitamos el botón de Inicio */}
                <Link
                    to={`/${system}`}
                    className="shrink-0 text-lg font-semibold"
                >
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
