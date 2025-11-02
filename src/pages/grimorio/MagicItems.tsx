import { useMemo } from "react";
import { useMagicItems } from "../../hooks";
import type { MagicItem } from "../../domain/dnd5e/MagicItems";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function MagicItemsPage() {
    const { system, data, isLoading, error } = useMagicItems();
    const { locale, t } = useLocale();

    const magicItems = useMemo(
        () => sortByLocale(data as MagicItem[], (mi) => mi.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.magicItems")}</p>;
    if (error) return <p className="text-red-600">{t("error.magicItems")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.magicItems")} ({system})</h2>

            {magicItems.length === 0 ? (
                <p className="opacity-70">{t("empty.magicItems")}</p>
            ) : (
                <ul className="space-y-3">
                    {magicItems.map((mi) => (
                        <li key={mi.pk} className="border rounded p-3">
                            <div className="font-medium">{mi.name}</div>
                            <div className="text-sm opacity-80">
                                {mi.rarity ? `${t("magicItem.rarity")}: ${mi.rarity}` : ""}
                                {mi.requiresAttunement ? ` • ${t("magicItem.attunement")}` : ""}
                                {mi.itemType ? ` • ${t("magicItem.type")}: ${mi.itemType}` : ""}
                            </div>
                            {mi.description && <p className="text-sm mt-2 whitespace-pre-wrap">{mi.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
