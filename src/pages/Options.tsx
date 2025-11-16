import { useLocale } from "../contexts/useLocale";
import { useSystem } from "../contexts/useSystem";
import { useTheme } from "../contexts/useTheme"; // 👈 nuevo

export default function OptionsPage() {
    const { locale, setLocale, t, availableLocales } = useLocale();
    const { system } = useSystem();
    const { theme, setTheme } = useTheme(); // 👈 nuevo

    return (
        <div className="max-w-xl space-y-6">
            <h2 className="text-xl font-semibold">
                {t("options.title")} ({system})
            </h2>

            {/* Idioma */}
            <section className="space-y-2">
                <label className="block text-sm font-medium">
                    {t("options.language")}
                </label>
                <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as typeof locale)}
                    className="border border-neutral-300 rounded px-3 py-2 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
                >
                    {availableLocales.map((id: "en" | "es") => (
                        <option key={id} value={id}>
                            {t(`locales.${id}`, id)}
                        </option>
                    ))}
                </select>
                <p className="text-xs opacity-70">
                    {t("options.language_hint")}
                </p>
            </section>

            {/* Tema */}
            <section className="space-y-2">
                <label className="block text-sm font-medium">
                    {t("options.theme")}
                </label>
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                    className="border border-neutral-300 rounded px-3 py-2 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
                >
                    <option value="light">{t("options.theme_light")}</option>
                    <option value="dark">{t("options.theme_dark")}</option>
                </select>
            </section>
        </div>
    );
}