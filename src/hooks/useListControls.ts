import { useCallback, useState } from "react";

export function useListControls(defaultSort: string = "name-asc") {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(defaultSort);

    const setQuerySafe = useCallback((q: string) => setQuery(q.trim()), []);
    const setSortSafe = useCallback((s: string) => setSort(s), []);

    return { query, setQuery: setQuerySafe, sort, setSort: setSortSafe };
}
