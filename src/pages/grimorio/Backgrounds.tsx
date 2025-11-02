import { useMemo } from "react";
import { useBackgrounds } from "../../hooks";
import type { Background } from "../../domain/dnd5e/Backgrounds";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function BackgroundsPage() {
    const { system, data, isLoading, error } = useBackgrounds();
    const { locale, t } = useLocale();

    const backgrounds = useMemo(
        () => sortByLocale(data as Background[], (b) => b.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.backgrounds")}</p>;
    if (error) return <p className="text-red-600">{t("error.backgrounds")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.backgrounds")} ({system})</h2>

            {backgrounds.length === 0 ? (
                <p className="opacity-70">{t("empty.backgrounds")}</p>
            ) : (
                <ul className="space-y-3">
                    {backgrounds.map((b) => (
                        <li key={b.pk} className="border rounded p-3">
                            <div className="font-medium">{b.name}</div>
                            <div className="text-sm opacity-80">
                                {b.feat ? `${t("background.feat")}: ${b.feat}` : ""}
                            </div>
                            {b.description && <p className="text-sm mt-2 whitespace-pre-wrap">{b.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
