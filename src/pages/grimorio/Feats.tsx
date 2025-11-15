// src/pages/grimorio/Feats.tsx
import { useMemo } from "react";
import { useFeatsDnd5e } from "@hooks/dnd5e/useFeatsDnd5e.ts";
import type { Feat } from "@domain/dnd5e";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function FeatsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useFeatsDnd5e();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "cat-asc",  label: t("sort.categoryAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data as Feat[]) ?? [];
        const byQuery = query
            ? base.filter((f) => (f.name ?? "").toLowerCase().includes(query.toLowerCase()))
            : base;

        if (sort === "name-asc") return sortByLocale(byQuery, (f) => f.name ?? "", locale);
        if (sort === "cat-asc")  return [...byQuery].sort((a, b) => (a.category ?? "").localeCompare(b.category ?? ""));
        return byQuery;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.feats")}</p>;
    if (error) return <p className="text-red-600">{t("error.feats")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.feats")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.feats")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.feats")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((f) => (
                        <EntryCard
                            key={f.pk}
                            title={f.name}
                            subtitle={f.category}
                            footer={f.source ? `${t("common.source")}: ${f.source}` : undefined}
                        >
                            {f.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
