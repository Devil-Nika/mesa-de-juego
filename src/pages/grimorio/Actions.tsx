// src/pages/grimorio/Actions.tsx
import { useActionsDnd5e } from "@hooks/dnd5e/useActionsDnd5e";
import type { Actions as Action } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function ActionsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useActionsDnd5e();

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
    ];

    const sortFn = (items: Action[], sortId: string): Action[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        return items;
    };

    const searchPredicate = (a: Action, term: string): boolean =>
        (a.name ?? "").toLowerCase().includes(term);

    return (
        <ListPage<Action>
            title={t("grimorio.actions")}
            systemLabel={system}
            data={(data as Action[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.actions")}
            emptyMessage={t("empty.actions")}
            loadingLabel={t("loading.actions")}
            errorLabel={t("error.actions")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            // si no tenés pk en Actions, podés usar el índice de forma segura
            getKey={(_a: Action, index) => index}
            renderItem={(a: Action) => (
                <EntryCard
                    title={a.name}
                    // si tengas algún otro campo útil, podés usarlo de subtitle/meta
                    // subtitle={a.type ?? undefined}
                    footer={
                        a.source
                            ? `${t("common.source")}: ${a.source}`
                            : undefined
                    }
                />
            )}
        />
    );
}
