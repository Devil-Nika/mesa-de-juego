// src/utils/i18nSearch.ts
export function matchAnyLocale(
    row: { name?: string; name_en?: string; name_es?: string },
    query: string
): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    return [row.name, (row as any).name_en, (row as any).name_es]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
}
