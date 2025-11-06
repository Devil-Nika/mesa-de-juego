// src/utils/i18nSort.ts
export function localeName(
    row: { name?: string; name_en?: string; name_es?: string },
    locale: "en" | "es"
): string {
    if (locale === "es") return row.name_es ?? row.name ?? row.name_en ?? "";
    return row.name_en ?? row.name ?? row.name_es ?? "";
}
