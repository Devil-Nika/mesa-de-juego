import { useMemo } from "react";
import { useRules } from "../../hooks";
import type { Rule } from "../../domain/dnd5e/Rules";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function RulesPage() {
    const { system, data, isLoading, error } = useRules();
    const { locale, t } = useLocale();

    const rules = useMemo(
        () => sortByLocale(data as Rule[], (r) => r.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.rules")}</p>;
    if (error) return <p className="text-red-600">{t("error.rules")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.rules")} ({system})</h2>

            {rules.length === 0 ? (
                <p className="opacity-70">{t("empty.rules")}</p>
            ) : (
                <ul className="space-y-3">
                    {rules.map((r) => (
                        <li key={r.pk} className="border rounded p-3">
                            <div className="font-medium">{r.name}</div>
                            {r.tag ? <div className="text-xs inline-block mt-1 px-2 py-0.5 rounded bg-neutral-200">{r.tag}</div> : null}
                            {r.summary && <p className="text-sm mt-2 opacity-80">{r.summary}</p>}
                            {r.text && <p className="text-sm mt-2 whitespace-pre-wrap">{r.text}</p>}
                            {r.source && <div className="text-xs mt-2 opacity-60">{t("common.source")}: {r.source}</div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
