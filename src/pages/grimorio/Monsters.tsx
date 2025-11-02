import { useMemo } from "react";
import { useMonsters } from "@hooks/dnd5e/useMonsters";
import type { Monster } from "@domain/dnd5e";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function MonstersPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useMonsters();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "cr-asc",   label: t("sort.crAsc") },
        { value: "cr-desc",  label: t("sort.crDesc") },
    ];

    const parseCR = (cr?: string) => {
        if (!cr) return 0;
        if (cr.includes("/")) {
            const [a, b] = cr.split("/").map(Number);
            return b ? a / b : 0;
        }
        const n = Number(cr);
        return Number.isFinite(n) ? n : 0;
    };

    const filtered = useMemo(() => {
        const base = (data as Monster[]) ?? [];
        const byName = query
            ? base.filter((m) =>
                (m.name ?? "").toLowerCase().includes(query.toLowerCase())
            )
            : base;

        if (sort === "name-asc") {
            return sortByLocale(byName, (m) => m.name ?? "", locale);
        }
        if (sort === "cr-asc") {
            return [...byName].sort((a, b) => parseCR(a.cr) - parseCR(b.cr));
        }
        if (sort === "cr-desc") {
            return [...byName].sort((a, b) => parseCR(b.cr) - parseCR(a.cr));
        }
        return byName;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.monsters")}</p>;
    if (error) return <p className="text-red-600">{t("error.monsters")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.monsters")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.monsters")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.monsters")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((m) => (
                        <EntryCard
                            key={m.pk}
                            title={m.name}
                            subtitle={[
                                m.type ?? "",
                                m.cr ? `• CR ${m.cr}` : "",
                                m.ac !== undefined ? `• AC ${m.ac}` : "",
                                m.hp !== undefined ? `• HP ${m.hp}` : "",
                            ].join(" ").trim()}
                            footer={m.source ? `${t("common.source")}: ${m.source}` : undefined}
                        >
                            {m.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
