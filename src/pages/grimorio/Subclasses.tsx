import { useMemo } from "react";
import { useSubclasses } from "@hooks/dnd5e/useSubclasses";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function SubclassesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useSubclasses();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc",  label: t("sort.nameAsc") },
        { value: "class-asc", label: t("sort.classAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data ?? []) as Array<{
            pk: string; name?: string; parentClassId?: string; description?: string; source?: string;
        }>;
        const byQuery = query
            ? base.filter((sc) =>
                (sc.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
                (sc.parentClassId ?? "").toLowerCase().includes(query.toLowerCase()),
            )
            : base;

        if (sort === "name-asc") {
            return sortByLocale(byQuery, (sc) => sc.name ?? "", locale);
        }
        if (sort === "class-asc") {
            return [...byQuery].sort((a, b) => (a.parentClassId ?? "").localeCompare(b.parentClassId ?? ""));
        }
        return byQuery;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.subclasses")}</p>;
    if (error) return <p className="text-red-600">{t("error.subclasses")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.subclasses")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.subclasses")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.subclasses")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((sc) => (
                        <EntryCard
                            key={sc.pk}
                            title={sc.name ?? "—"}
                            subtitle={sc.parentClassId ? `${t("subclass.parent")}: ${sc.parentClassId}` : undefined}
                            footer={sc.source ? `${t("common.source")}: ${sc.source}` : undefined}
                        >
                            {sc.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
