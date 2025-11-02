import { useMemo } from "react";
import { useItems } from "../../hooks";
import type { Items } from "../../domain/dnd5e/Items";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function ItemsPage() {
    const { system, data, isLoading, error } = useItems();
    const { locale, t } = useLocale();

    const items = useMemo(
        () => sortByLocale(data as Items[], (i) => i.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.items")}</p>;
    if (error) return <p className="text-red-600">{t("error.items")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.items")} ({system})</h2>

            {items.length === 0 ? (
                <p className="opacity-70">{t("empty.items")}</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((it) => (
                        <li key={it.pk} className="border rounded p-3">
                            <div className="font-medium">{it.name}</div>
                            <div className="text-sm opacity-80">
                                {it.category ?? "—"}
                                {it.weight !== undefined ? ` • ${t("item.weight")} ${it.weight}` : ""}
                                {it.cost ? ` • ${t("item.cost")} ${typeof it.cost === "string" ? it.cost : `${it.cost.amount} ${it.cost.unit}`}` : ""}
                            </div>

                            {/* Bloques estructurados */}
                            {it.weapon ? (
                                <div className="text-xs mt-2 opacity-80">
                                    {t("item.weapon")}: {it.weapon.kind} {it.weapon.category}
                                    {it.weapon.damage ? ` • ${t("item.damage")} ${it.weapon.damage.dice} ${it.weapon.damage.type}` : ""}
                                    {it.weapon.mastery ? ` • ${t("item.mastery")} ${it.weapon.mastery}` : ""}
                                </div>
                            ) : null}

                            {it.armor ? (
                                <div className="text-xs mt-2 opacity-80">
                                    {t("item.armor")}: {it.armor.kind}
                                    {it.armor.baseAC !== undefined ? ` • AC ${it.armor.baseAC}` : ""}
                                    {it.armor.dexCap !== undefined ? ` • DexCap ${it.armor.dexCap ?? "-"}` : ""}
                                    {it.armor.strengthReq ? ` • STR ${it.armor.strengthReq}+` : ""}
                                    {it.armor.stealthDisadvantage ? ` • ${t("item.stealthDisadvantage")}` : ""}
                                </div>
                            ) : null}

                            {it.description && <p className="text-sm mt-2 whitespace-pre-wrap">{it.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
