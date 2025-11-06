import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LocaleId, LocaleDict } from "./locale.types";
import { LOCALES, DICTS } from "./locale.constants";

export type LocaleContextValue = {
    locale: LocaleId;
    setLocale: (next: LocaleId) => void;

    // overloads:
    t(key: keyof LocaleDict): string;
    t(key: string, fallback?: string): string;

    availableLocales: readonly LocaleId[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LS_KEY = "mdj:locale";

function loadInitialLocale(): LocaleId {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw === "en" || raw === "es") return raw;
    } catch {
        //*
    }
    return "en";
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<LocaleId>(loadInitialLocale);

    useEffect(() => {
        try { localStorage.setItem(LS_KEY, locale); } catch {
            //*
        }
    }, [locale]);

    const setLocale = (next: LocaleId) => {
        if (LOCALES.includes(next)) setLocaleState(next);
    };

    function t(key: string, fallback?: string): string;
    function t(key: keyof LocaleDict): string;
    function t(key: string, fallback?: string): string {
        // si es una key tipada:
        if ((DICTS[locale] as any)[key] !== undefined) {
            return (DICTS[locale] as Record<string, string>)[key];
        }
        // caso libre: usa fallback o devuelve la propia key
        return fallback ?? key;
    }

    const value: LocaleContextValue = useMemo(
        () => ({ locale, setLocale, t, availableLocales: LOCALES }),
        [locale]
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
    return ctx;
}
