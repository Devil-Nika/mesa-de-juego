import { NavLink } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function Header() {
    const { system } = useSystem();
    const { t } = useLocale();

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded ${isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"}`;

    return (
        <header className="p-4 border-b bg-white">
            <div className="max-w-6xl mx-auto flex items-center gap-4">
                <NavLink to="/" className={linkCls}>
                    {t("app.home")}
                </NavLink>

                {/* Estos cambian según el sistema seleccionado */}
                <NavLink to={`/${system}/grimoire`} className={linkCls}>
                    {t("menu.grimoire")}
                </NavLink>
                <NavLink to={`/${system}/options`} className={linkCls}>
                    {t("menu.options")}
                </NavLink>

                {/* Placeholders (en desarrollo) */}
                <span className="ml-auto opacity-60">{t("app.brand") ?? "Mesa de Juego"}</span>
            </div>
        </header>
    );
}
