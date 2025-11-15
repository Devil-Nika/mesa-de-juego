import { useMemo } from "react";
import { useMagicItemsDnd5e } from "@hooks/dnd5e/useMagicItemsDnd5e.ts";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function MagicItemsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useMagicItemsDnd5e();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc",   label: t("sort.nameAsc") },
        { value: "rarity-asc", label: t("sort.rarityAsc") },
        { value: "type-asc",   label: t("sort.typeAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data ?? []) as Array<{
            pk: string; name?: string; source?: string; description?: string;
            rarity?: string; itemType?: string; requiresAttunement?: boolean;
        }>;
        const byQuery = query
            ? base.filter((i) =>
                (i.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
                (i.rarity ?? "").toLowerCase().includes(query.toLowerCase()) ||
                (i.itemType ?? "").toLowerCase().includes(query.toLowerCase()),
            )
            : base;

        let sorted = byQuery;
        if (sort === "name-asc") {
            sorted = sortByLocale(byQuery, (i) => i.name ?? "", locale);
        } else if (sort === "rarity-asc") {
            sorted = [...byQuery].sort((a, b) => (a.rarity ?? "").localeCompare(b.rarity ?? ""));
        } else if (sort === "type-asc") {
            sorted = [...byQuery].sort((a, b) => (a.itemType ?? "").localeCompare(b.itemType ?? ""));
        }

        return sorted;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.magicItems")}</p>;
    if (error) return <p className="text-red-600">{t("error.magicItems")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.magicItems")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.magicItems")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.magicItems")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((i) => (
                        <EntryCard
                            key={i.pk}
                            title={i.name ?? "—"}
                            subtitle={[
                                i.rarity ?? "",
                                i.itemType ? `• ${i.itemType}` : "",
                                i.requiresAttunement ? `• ${t("magicItems.attunement")}` : "",
                            ].join(" ").trim()}
                            footer={i.source ? `${t("common.source")}: ${i.source}` : undefined}
                        >
                            {i.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
