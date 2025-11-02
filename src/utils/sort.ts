export function sortByLocale<T>(
    arr: readonly T[],
    getKey: (x: T) => string,
    locale: string
): T[] {
    const collator = new Intl.Collator(locale, { sensitivity: "base", numeric: true });
    return [...arr].sort((a, b) => collator.compare(getKey(a), getKey(b)));
}
