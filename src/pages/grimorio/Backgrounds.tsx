import { useMemo } from "react";
import { useBackgrounds } from "@hooks/dnd5e/useBackgrounds";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function BackgroundsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useBackgrounds();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const filtered = useMemo(() => {
        const base = (data ?? []) as Array<{
            pk: string; name?: string; source?: string; description?: string;
            feat?: string;
        }>;
        const byQuery = query
            ? base.filter((b) =>
                (b.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
                (b.feat ?? "").toLowerCase().includes(query.toLowerCase()),
            )
            : base;

        if (sort === "name-asc") {
            return sortByLocale(byQuery, (b) => b.name ?? "", locale);
        }
        return byQuery;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.backgrounds")}</p>;
    if (error) return <p className="text-red-600">{t("error.backgrounds")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.backgrounds")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.backgrounds")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.backgrounds")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((b) => (
                        <EntryCard
                            key={b.pk}
                            title={b.name ?? "—"}
                            subtitle={b.feat ? `${t("backgrounds.feat")}: ${b.feat}` : undefined}
                            footer={b.source ? `${t("common.source")}: ${b.source}` : undefined}
                        >
                            {b.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}