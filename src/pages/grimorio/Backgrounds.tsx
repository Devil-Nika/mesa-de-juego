// src/pages/grimorio/Backgrounds.tsx
import { useBackgroundsDnd5e } from "@hooks/dnd5e/useBackgroundsDnd5e";
import type { Background } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function BackgroundsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useBackgroundsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: Background[], sortId: string): Background[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (b: Background, term: string): boolean =>
        (b.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<Background>
            title={t("grimorio.backgrounds")}
            systemLabel={system}
            data={(data as Background[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.backgrounds")}
            emptyMessage={t("empty.backgrounds")}
            loadingLabel={t("loading.backgrounds")}
            errorLabel={t("error.backgrounds")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(_b: Background, index) => index}
            renderItem={(b: Background) => (
                <EntryCard
                    title={b.name}
                    footer={
                        b.source
                            ? `${t("common.source")}: ${b.source}`
                            : undefined
                    }
                >
                    {b.description}
                </EntryCard>
            )}
        />
    );
}