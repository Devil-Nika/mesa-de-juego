export type LocaleId = "en" | "es";

export type LocaleDict = Record<string, string>;

export type LocaleContextValue = {
    locale: LocaleId;
    setLocale: (next: LocaleId) => void;
    t: (key: string, fallback?: string) => string;
    availableLocales: LocaleId[];
};
