export function sortByLocale<T>(
    arr: readonly T[],
    pick: (x: T) => string,
    locale: string
): T[] {
    const collator = new Intl.Collator(locale, { sensitivity: "base" });
    return [...arr].sort((a, b) => collator.compare(pick(a), pick(b)));
}
