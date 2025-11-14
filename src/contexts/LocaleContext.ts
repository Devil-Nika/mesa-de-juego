import { createContext } from "react";
import type { LocaleId } from "./locale.types";

export type LocaleContextValue = {
    locale: LocaleId;
    setLocale: (next: LocaleId) => void;
    t: (key: string, fallback?: string) => string;
    availableLocales: readonly LocaleId[];
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
export default LocaleContext;
