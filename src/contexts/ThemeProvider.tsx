import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

const STORAGE_KEY = "mdj:theme";

type ThemeProviderProps = {
    children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>("light");

    // cargar desde localStorage (si hay algo guardado)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
            if (stored === "light" || stored === "dark") {
                setThemeState(stored);
            }
        } catch {
            // ignorar errores de localStorage
        }
    }, []);

    // aplicar a <html> y guardar en localStorage cuando cambie
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignorar
        }
    }, [theme]);

    const setTheme = (next: Theme) => {
        setThemeState(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}