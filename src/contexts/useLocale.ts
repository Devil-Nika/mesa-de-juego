// src/contexts/useLocale.ts
import { useContext } from "react";
import { LocaleContext, type LocaleContextValue } from "./LocaleContext";

export type { LocaleContextValue } from "./LocaleContext";
export { default as LocaleProvider } from "./LocaleProvider";

export function useLocale(): LocaleContextValue {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
    return ctx;
}
