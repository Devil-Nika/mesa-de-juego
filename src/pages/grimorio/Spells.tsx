import { useMemo } from "react";
import { useSpellsDnd5e } from "@hooks/dnd5e/useSpellsDnd5e.ts";
import type { Spell } from "@domain/dnd5e";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import { useListControls } from "@hooks/useListControls";

export default function SpellsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useSpellsDnd5e();
    const { query, setQuery, sort, setSort } = useListControls("name-asc");

    const options = [
        { value: "name-asc",   label: t("sort.nameAsc") },
        { value: "level-asc",  label: t("sort.levelAsc") },
        { value: "level-desc", label: t("sort.levelDesc") },
    ];

    const filtered = useMemo(() => {
        const base = (data as Spell[]) ?? [];
        const byName = query
            ? base.filter((s) =>
                (s.name ?? "").toLowerCase().includes(query.toLowerCase())
            )
            : base;

        let sorted = byName;
        if (sort === "name-asc") {
            sorted = sortByLocale(byName, (s) => s.name ?? "", locale);
        } else if (sort === "level-asc") {
            sorted = [...byName].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
        } else if (sort === "level-desc") {
            sorted = [...byName].sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
        }

        return sorted;
    }, [data, query, sort, locale]);

    if (isLoading) return <p className="opacity-70">{t("loading.spells")}</p>;
    if (error) return <p className="text-red-600">{t("error.spells")}</p>;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.spells")} <span className="opacity-60">({system})</span>
                </h2>
                <div className="flex items-center gap-3">
                    <SearchBar value={query} onChange={setQuery} placeholder={t("search.spells")} />
                    <SortMenu value={sort} onChange={setSort} options={options} label={t("common.sort")} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{t("empty.spells")}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((s) => (
                        <EntryCard
                            key={s.pk}
                            title={s.name}
                            subtitle={[
                                s.level !== undefined ? `${t("spell.level")} ${s.level}` : "—",
                                s.school ? `• ${s.school}` : "",
                            ].join(" ").trim()}
                            footer={s.source ? `${t("common.source")}: ${s.source}` : undefined}
                        >
                            {s.description}
                        </EntryCard>
                    ))}
                </ul>
            )}
        </div>
    );
}
