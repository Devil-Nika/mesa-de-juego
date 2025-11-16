// src/pages/grimorio/MagicItems.tsx
import { useMagicItemsDnd5e } from "@hooks/dnd5e/useMagicItemsDnd5e";
import type { MagicItem } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function MagicItemsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useMagicItemsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: MagicItem[], sortId: string): MagicItem[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (m: MagicItem, term: string): boolean =>
        (m.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<MagicItem>
            title={t("grimorio.magicItems")}
            systemLabel={system}
            data={(data as MagicItem[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.magicItems")}
            emptyMessage={t("empty.magicItems")}
            loadingLabel={t("loading.magicItems")}
            errorLabel={t("error.magicItems")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(_m: MagicItem, index) => index}
            renderItem={(m: MagicItem) => (
                <EntryCard
                    title={m.name}
                    footer={
                        m.source
                            ? `${t("common.source")}: ${m.source}`
                            : undefined
                    }
                >
                    {m.description}
                </EntryCard>
            )}
        />
    );
}