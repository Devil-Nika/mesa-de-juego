import { useMemo } from "react";
import { useFeats } from "../../hooks";
import type { Feat } from "../../domain/dnd5e/Feats";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function FeatsPage() {
    const { system, data, isLoading, error } = useFeats();
    const { locale, t } = useLocale();

    const feats = useMemo(
        () => sortByLocale(data as Feat[], (f) => f.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.feats")}</p>;
    if (error) return <p className="text-red-600">{t("error.feats")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.feats")} ({system})</h2>

            {feats.length === 0 ? (
                <p className="opacity-70">{t("empty.feats")}</p>
            ) : (
                <ul className="space-y-3">
                    {feats.map((f) => (
                        <li key={f.pk} className="border rounded p-3">
                            <div className="font-medium">{f.name}</div>
                            <div className="text-sm opacity-80">
                                {f.category ? `${t("feat.category")}: ${f.category}` : ""}
                                {f.prerequisite ? ` • ${t("feat.prerequisite")}: ${f.prerequisite}` : ""}
                                {f.repeatable ? ` • ${t("feat.repeatable")}` : ""}
                            </div>
                            {f.description && <p className="text-sm mt-2 whitespace-pre-wrap">{f.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
