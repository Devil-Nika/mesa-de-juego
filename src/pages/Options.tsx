import { useLocale } from "../contexts/useLocale";
import { useSystem } from "../contexts/useSystem";

export default function OptionsPage() {
    const { locale, setLocale, t, availableLocales } = useLocale();
    const { system } = useSystem();

    return (
        <div className="max-w-xl space-y-6">
            <h2 className="text-xl font-semibold">
                {t("options.title")} ({system})
            </h2>

            <section className="space-y-2">
                <label className="block text-sm font-medium">{t("options.language")}</label>
                <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as typeof locale)}
                    className="border rounded px-3 py-2 bg-white"
                >
                    {availableLocales.map((id: "en" | "es") => (
                        <option key={id} value={id}>
                            {t(`locales.${id}`, id)}{/* <- usa fallback, no rompe TS2554 */}
                        </option>
                    ))}
                </select>
                <p className="text-xs opacity-70">{t("options.language_hint")}</p>
            </section>
        </div>
    );
}
