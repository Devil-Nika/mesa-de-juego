// src/contexts/LocaleProvider.tsx
import { useEffect, useMemo, useState } from "react";
import { LOCALES, DICTS } from "./locale.constants";
import type { LocaleId } from "./locale.types";
import { LocaleContext } from "./LocaleContext";

const LS_KEY = "mdj:locale";

function loadInitialLocale(): LocaleId {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw === "en" || raw === "es") return raw as LocaleId;
    } catch (e) {
        // Ignorar errores (modo privacidad / storages deshabilitados)
        void e;
    }
    return "en";
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<LocaleId>(loadInitialLocale);

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, locale);
        } catch (e) {
            // Ignorar errores de storage
            void e;
        }
    }, [locale]);

    const setLocale = (next: LocaleId) => {
        if (LOCALES.includes(next)) setLocaleState(next);
    };

    const t = (key: string, fallback?: string) =>
        DICTS[locale][key] ?? fallback ?? key;

    const value = useMemo(
        () => ({ locale, setLocale, t, availableLocales: LOCALES }),
        [locale]
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
