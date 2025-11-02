import { NavLink } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function GrimorioHeader() {
    const { system } = useSystem();
    const { t } = useLocale();
    const cls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-1.5 rounded text-sm ${
            isActive ? "bg-indigo-600 text-white" : "bg-white border hover:bg-indigo-50"
        }`;

    return (
        <header className="border-b pb-3">
            <div className="flex items-center justify-between">
                <div className="font-semibold">
                    {t("grimorio.title") ?? "Grimorio"} <span className="opacity-60">({system})</span>
                </div>
                <nav className="flex gap-2">
                    <NavLink to="actions" className={cls}>{t("grimorio.actions") ?? "Actions"}</NavLink>
                    <NavLink to="backgrounds" className={cls}>{t("grimorio.backgrounds") ?? "Backgrounds"}</NavLink>
                    <NavLink to="classes" className={cls}>{t("grimorio.classes") ?? "Classes"}</NavLink>
                    <NavLink to="feats" className={cls}>{t("grimorio.feats") ?? "Feats"}</NavLink>
                    <NavLink to="items" className={cls}>{t("grimorio.items") ?? "Items"}</NavLink>
                    <NavLink to="magic-items" className={cls}>{t("grimorio.magicItems") ?? "Magic Items"}</NavLink>
                    <NavLink to="monsters" className={cls}>{t("grimorio.monsters") ?? "Monsters"}</NavLink>
                    <NavLink to="rules" className={cls}>{t("grimorio.rules") ?? "Rules"}</NavLink>
                    <NavLink to="species" className={cls}>{t("grimorio.species") ?? "Species"}</NavLink>
                    <NavLink to="spells" className={cls}>{t("grimorio.spells") ?? "Spells"}</NavLink>
                    {/* 👉 Subclases eliminado del header */}
                </nav>
            </div>
        </header>
    );
}
