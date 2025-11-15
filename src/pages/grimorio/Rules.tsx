import { useMemo } from "react";
import { useRulesDnd5e } from "@hooks/dnd5e/useRulesDnd5e.ts";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function RulesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useRulesDnd5e();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "tag-asc",  label: t("sort.tagAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data ?? []) as Array<{
            pk: string; name?: string; source?: string; summary?: string; text?: string; tag?: string;
        }>;
        const byQuery = query
            ? base.filter((r) =>
                (r.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
                (r.tag ?? "").toLowerCase().includes(query.toLowerCase()),
            )
            : base;

        if (sort === "name-asc") {
            return sortByLocale(byQuery, (r) => r.name ?? "", locale);
        }
        if (sort === "tag-asc") {
            return [...byQuery].sort((a, b) => (a.tag ?? "").localeCompare(b.tag ?? ""));
        }
        return byQuery;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.rules")}</p>;
    if (error) return <p className="text-red-600">{t("error.rules")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.rules")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.rules")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.rules")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((r) => (
                        <EntryCard
                            key={r.pk}
                            title={r.name ?? "—"}
                            subtitle={r.tag}
                            footer={r.source ? `${t("common.source")}: ${r.source}` : undefined}
                        >
                            {r.summary ?? r.text}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
