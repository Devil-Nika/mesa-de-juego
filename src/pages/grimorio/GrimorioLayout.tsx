import { Outlet, NavLink } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

const links = [
    { to: ".", key: "menu.grimoireHome" }, // Hub
    { to: "class", key: "menu.class" },
    { to: "origins", key: "menu.origins" },
    { to: "feats", key: "menu.feats" },
    { to: "equipment", key: "menu.equipment" },
    { to: "spells", key: "menu.spells" },
    { to: "monsters", key: "menu.monsters" },
    { to: "toolbox", key: "menu.toolbox" },
    { to: "rules", key: "menu.rules" },
] as const;

export default function GrimorioLayout() {
    const { system } = useSystem();
    const { t } = useLocale();

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "bg-neutral-200 hover:bg-neutral-300"}`;

    return (
        <div className="grid grid-cols-[260px_1fr] gap-6 p-6 bg-neutral-50">
            <aside className="space-y-4">
                <h2 className="font-semibold text-lg">
                    {t("grimoire.title")} <span className="opacity-60">({system})</span>
                </h2>
                <nav className="flex flex-col gap-2">
                    {links
                        .map((l) => ({ ...l, label: t(l.key) }))
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((l) => (
                            <NavLink key={l.to} to={l.to} end className={linkCls}>
                                {l.label}
                            </NavLink>
                        ))}
                </nav>
            </aside>

            <main className="min-h-[60vh]">
                <Outlet />
            </main>
        </div>
    );
}