// src/pages/grimorio/Species.tsx
import { useSpeciesDnd5e } from "@hooks/dnd5e/useSpeciesDnd5e";
import type { Species } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function SpeciesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useSpeciesDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: Species[], sortId: string): Species[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (s: Species, term: string): boolean =>
        (s.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<Species>
            title={t("grimorio.species")}
            systemLabel={system}
            data={(data as Species[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.species")}
            emptyMessage={t("empty.species")}
            loadingLabel={t("loading.species")}
            errorLabel={t("error.species")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(_s: Species, index) => index}
            renderItem={(s: Species) => (
                <EntryCard
                    title={s.name}
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
