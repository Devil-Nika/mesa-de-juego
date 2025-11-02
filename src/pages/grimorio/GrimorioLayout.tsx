import { NavLink, Outlet } from "react-router-dom";
import { useSystem } from "../../contexts/useSystem";
import { useLocale } from "../../contexts/useLocale";

const links = [
    { to: "actions", labelKey: "menu.actions" },
    { to: "backgrounds", labelKey: "menu.backgrounds" },
    { to: "classes", labelKey: "menu.classes" },
    { to: "feats", labelKey: "menu.feats" },
    { to: "items", labelKey: "menu.items" },
    { to: "magic-items", labelKey: "menu.magicItems" },
    { to: "monsters", labelKey: "menu.monsters" },
    { to: "rules", labelKey: "menu.rules" },
    { to: "species", labelKey: "menu.species" },
    { to: "spells", labelKey: "menu.spells" },
    { to: "subclasses", labelKey: "menu.subclasses" },
] as const;

export default function GrimorioLayout() {
    const { system } = useSystem();
    const { t } = useLocale();

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded ${isActive ? "bg-black text-white" : "bg-neutral-200 hover:bg-neutral-300"}`;

    return (
        <div className="grid grid-cols-[240px_1fr] gap-6 p-6">
            <aside className="space-y-4">
                <h2 className="font-semibold text-lg">
                    {t("grimoire.title")} ({system})
                </h2>

                <nav className="flex flex-col gap-2">
                    {links
                        .map(l => ({ ...l, label: t(l.labelKey) }))
                        .sort((a, b) => a.label.localeCompare(b.label)) // orden alfabético según idioma
                        .map(l => (
                            <NavLink key={l.to} to={l.to} className={linkCls}>
                                {l.label}
                            </NavLink>
                        ))}
                </nav>

                {/* Separador + opción al final */}
                <div className="border-t my-2" />
                {/* Ruta absoluta al scope actual: /:system/options */}
                <NavLink to={`/${system}/options`} className={linkCls}>
                    {t("menu.options")}
                </NavLink>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
