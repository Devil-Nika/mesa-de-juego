// src/contexts/LocaleProvider.tsx
import { useEffect, useMemo, useState } from "react";
import { DICTS, LOCALES, type LocaleId } from "./locale.constants";
import { LocaleContext } from "./LocaleContext";

const LS_KEY = "mdj:locale";

function loadInitialLocale(): LocaleId {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw === "en" || raw === "es") return raw;
    } catch { /* noop */ }
    return "en";
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<LocaleId>(loadInitialLocale);

    useEffect(() => {
        try { localStorage.setItem(LS_KEY, locale); } catch { /* noop */ }
    }, [locale]);

    const setLocale = (next: LocaleId) => {
        if (LOCALES.includes(next)) setLocaleState(next);
    };

    // Relajamos el índice para claves dinámicas (evita TS7053)
    const dict = DICTS[locale] as Record<string, string>;
    const t = (key: string, fallback?: string) => dict[key] ?? (fallback ?? key);

    const value = useMemo(
        () => ({ locale, setLocale, t, availableLocales: LOCALES }),
        [locale]
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
