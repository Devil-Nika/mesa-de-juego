// src/components/list/ListPage.tsx
import { useMemo, useState } from "react";
import SearchBar from "@components/SearchBar";
import SortMenu from "@components/SortMenu";

export type SortOption = {
    value: string;
    label: string;
};

type ListPageProps<T> = {
    title: React.ReactNode;
    systemLabel?: string;
    data: T[];
    isLoading: boolean;
    error: unknown;
    searchPlaceholder: string;
    emptyMessage: string;
    loadingLabel: string;
    errorLabel: string;
    sortOptions: SortOption[];
    initialSort: string;
    searchPredicate?: (item: T, term: string) => boolean;
    sortFn?: (items: T[], sortId: string) => T[];
    renderItem: (item: T) => React.ReactNode;
    getKey?: (item: T, index: number) => string | number;
};

export default function ListPage<T>({
                                        title,
                                        systemLabel,
                                        data,
                                        isLoading,
                                        error,
                                        searchPlaceholder,
                                        emptyMessage,
                                        loadingLabel,
                                        errorLabel,
                                        sortOptions,
                                        initialSort,
                                        searchPredicate,
                                        sortFn,
                                        renderItem,
                                        getKey,
                                    }: ListPageProps<T>) {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(initialSort);

    const filtered = useMemo(() => {
        const base = (data ?? []) as T[];

        const byQuery =
            query && searchPredicate
                ? base.filter((item) =>
                    searchPredicate(item, query.toLowerCase())
                )
                : base;

        if (sortFn) {
            return sortFn(byQuery, sort);
        }

        return byQuery;
    }, [data, query, sort, searchPredicate, sortFn]);

    if (isLoading) {
        return <p className="opacity-70">{loadingLabel}</p>;
    }

    if (error) {
        return <p className="text-red-600">{errorLabel}</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-lg font-semibold">
                    {title}
                    {systemLabel && (
                        <span className="opacity-60"> ({systemLabel})</span>
                    )}
                </h2>

                <div className="flex items-center gap-3">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        placeholder={searchPlaceholder}
                    />
                    <SortMenu
                        value={sort}
                        onChange={setSort}
                        options={sortOptions}
                        label="Sort"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="opacity-70">{emptyMessage}</p>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((item, index) => (
                        <li key={getKey ? getKey(item, index) : index}>
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
