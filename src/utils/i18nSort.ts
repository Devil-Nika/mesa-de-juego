export function localeName<T extends { name?: string; name_i18n?: Record<string, string> }>(
    entry: T,
    locale: string
): string {
    return entry.name_i18n?.[locale] ?? entry.name ?? "";
}
