import { Link, NavLink, useParams } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function TopNav() {
    const { system: currentSystem } = useSystem();
    const { system: routeSystem } = useParams();
    const { t } = useLocale();

    const sys = (routeSystem ?? currentSystem) as string;

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "bg-white text-indigo-700" : "text-white/90 hover:bg-white/10"
        }`;

    return (
        <header className="bg-indigo-700 text-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link to={`/${sys}`} className="font-semibold text-lg">
                    Mesa de Juego
                </Link>
                <nav className="flex items-center gap-2">
                    <NavLink to={`/${sys}`} end className={linkCls}>
                        {t("nav.home")}
                    </NavLink>
                    <NavLink to={`/${sys}/encounter`} className={linkCls}>
                        {t("nav.encounter")}
                    </NavLink>
                    <NavLink to={`/${sys}/builder`} className={linkCls}>
                        {t("nav.builder")}
                    </NavLink>
                    <NavLink to={`/${sys}/grimoire`} className={linkCls}>
                        {t("nav.grimoire")}
                    </NavLink>
                    <NavLink to={`/${sys}/options`} className={linkCls}>
                        {t("nav.options")}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
