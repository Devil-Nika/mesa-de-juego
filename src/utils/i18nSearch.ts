export function matchAnyLocale<T extends { name?: string; name_i18n?: Record<string, string> }>(
    entry: T,
    q: string
): boolean {
    if (!entry) return false;
    const needle = q.trim().toLowerCase();
    if (!needle) return true;

    const values: string[] = [];
    if (entry.name) values.push(entry.name);
    if (entry.name_i18n) values.push(...Object.values(entry.name_i18n));
    return values.some((s) => s.toLowerCase().includes(needle));
}
