// src/pages/grimorio/Spells.tsx
import { useSpellsDnd5e } from "@hooks/dnd5e/useSpellsDnd5e";
import type { Spell } from "@domain/dnd5e";
import EntryCard from "@components/EntryCard";
import { sortByLocale } from "@utils/sort";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function SpellsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useSpellsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "level-asc", label: t("sort.levelAsc") },
        { value: "level-desc", label: t("sort.levelDesc") },
    ];

    const sortFn = (items: Spell[], sortId: string): Spell[] => {
        if (sortId === "name-asc") {
            return sortByLocale(items, (s) => s.name ?? "", locale);
        }
        if (sortId === "level-asc") {
            return [...items].sort(
                (a, b) => (a.level ?? 0) - (b.level ?? 0)
            );
        }
        if (sortId === "level-desc") {
            return [...items].sort(
                (a, b) => (b.level ?? 0) - (a.level ?? 0)
            );
        }
        return items;
    };

    const searchPredicate = (s: Spell, term: string): boolean => {
        const name = (s.name ?? "").toLowerCase();
        return name.includes(term);
    };

    return (
        <ListPage<Spell>
            title={t("grimorio.spells")}
            systemLabel={system}
            data={(data as Spell[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.spells")}
            emptyMessage={t("empty.spells")}
            loadingLabel={t("loading.spells")}
            errorLabel={t("error.spells")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(s: Spell) => s.pk}
            renderItem={(s: Spell) => (
                <EntryCard
                    title={s.name}
                    subtitle={[
                        s.level !== undefined
                            ? `${t("spell.level")} ${s.level}`
                            : "—",
                        s.school ? `• ${s.school}` : "",
                    ]
                        .join(" ")
                        .trim()}
                    footer={
                        s.source
                            ? `${t("common.source")}: ${s.source}`
                            : undefined
                    }
                >
                    {s.description}
                </EntryCard>
            )}
        />
    );
}