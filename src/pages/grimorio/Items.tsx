import { useMemo } from "react";
import { useItems } from "@hooks/dnd5e/useItems";
import type { Items as Item } from "@domain/dnd5e";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function ItemsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useItems();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "cat-asc",  label: t("sort.categoryAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data as Item[]) ?? [];
        const byName = query
            ? base.filter((i) =>
                (i.name ?? "").toLowerCase().includes(query.toLowerCase())
            )
            : base;

        if (sort === "name-asc") {
            return sortByLocale(byName, (i) => i.name ?? "", locale);
        }
        if (sort === "cat-asc") {
            return [...byName].sort((a, b) => (a.category ?? "").localeCompare(b.category ?? ""));
        }
        return byName;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.items")}</p>;
    if (error) return <p className="text-red-600">{t("error.items")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.items")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.items")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.items")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((i) => (
                        <EntryCard
                            key={i.pk}
                            title={i.name}
                            subtitle={[
                                i.category ?? "",
                                i.cost ? `• ${i.cost.amount} ${i.cost.unit}` : "",
                                i.weight !== undefined ? `• ${i.weight} lb` : "",
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
