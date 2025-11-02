import { Outlet, Link, NavLink } from "react-router-dom";
import SystemSwitcher from "@components/SystemSwitcher";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function ShellLayout() {
    const { system } = useSystem();
    const { t } = useLocale();

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-1.5 rounded-md text-sm transition ${
            isActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-700 hover:bg-neutral-200"
        }`;

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 justify-between">
                    <Link
                        to="/"
                        className="font-semibold tracking-tight text-neutral-900"
                        aria-label="Go to Home"
                    >
                        Mesa de Juego
                    </Link>

                    <nav className="hidden sm:flex items-center gap-1">
                        <NavLink to="/" end className={linkCls}>
                            {t("nav.home", "Home")}
                        </NavLink>
                        <NavLink to={`/${system}/grimoire`} className={linkCls}>
                            {t("nav.grimoire", "Grimoire")}
                        </NavLink>
                        <NavLink to={`/${system}/options`} className={linkCls}>
                            {t("nav.options", "Options")}
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-3">
                        <SystemSwitcher />
                    </div>
                </div>
            </header>

            <Outlet />
        </div>
    );
}
