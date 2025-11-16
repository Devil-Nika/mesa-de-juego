// src/pages/grimorio/Feats.tsx
import { useFeatsDnd5e } from "@hooks/dnd5e/useFeatsDnd5e";
import type { Feat } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function FeatsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useFeatsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: Feat[], sortId: string): Feat[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (f: Feat, term: string): boolean =>
        (f.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<Feat>
            title={t("grimorio.feats")}
            systemLabel={system}
            data={(data as Feat[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.feats")}
            emptyMessage={t("empty.feats")}
            loadingLabel={t("loading.feats")}
            errorLabel={t("error.feats")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(_f: Feat, index) => index}
            renderItem={(f: Feat) => (
                <EntryCard
                    title={f.name}
                    footer={
                        f.source
                            ? `${t("common.source")}: ${f.source}`
                            : undefined
                    }
                >
                    {f.description}
                </EntryCard>
            )}
        />
    );
}
