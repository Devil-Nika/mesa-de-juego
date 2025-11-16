// src/pages/grimorio/Classes.tsx
import { useClassesDnd5e } from "@hooks/dnd5e/useClassesDnd5e";
import type { Class } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function ClassesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useClassesDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: Class[], sortId: string): Class[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (c: Class, term: string): boolean =>
        (c.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<Class>
            title={t("grimorio.classes")}
            systemLabel={system}
            data={(data as Class[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.classes")}
            emptyMessage={t("empty.classes")}
            loadingLabel={t("loading.classes")}
            errorLabel={t("error.classes")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(_c: Class, index) => index}
            renderItem={(c: Class) => (
                <EntryCard
                    title={c.name}
                    footer={
                        c.source
                            ? `${t("common.source")}: ${c.source}`
                            : undefined
                    }
                >
                    {c.description}
                </EntryCard>
            )}
        />
    );
}
