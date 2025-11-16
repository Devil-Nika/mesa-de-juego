import { useItemsDnd5e } from "@hooks/dnd5e/useItemsDnd5e";
import type { Items as Item } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function ItemsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useItemsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "cat-asc", label: t("sort.categoryAsc") },
    ];

    const sortFn = (items: Item[], sortId: string): Item[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        if (sortId === "cat-asc") {
            return [...items].sort((a, b) =>
                (a.category ?? "").localeCompare(b.category ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (i: Item, term: string): boolean => {
        return (
            (i.name ?? "").toLowerCase().includes(term) ||
            (i.category ?? "").toLowerCase().includes(term)
        );
    };

    return (
        <ListPage<Item>
            title={t("grimorio.items")}
            systemLabel={system}
            data={(data as Item[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.items")}
            emptyMessage={t("empty.items")}
            loadingLabel={t("loading.items")}
            errorLabel={t("error.items")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(i: Item) => i.pk}
            renderItem={(i: Item) => (
                <EntryCard
                    title={i.name}
                    subtitle={[
                        i.category ?? "",
                        i.cost ? `• ${i.cost.amount} ${i.cost.unit}` : "",
                        i.weight !== undefined ? `• ${i.weight} lb` : "",
                    ]
                        .join(" ")
                        .trim()}
                    footer={
                        i.source ? `${t("common.source")}: ${i.source}` : undefined
                    }
                >
                    {i.description}
                </EntryCard>
            )}
        />
    );
}
