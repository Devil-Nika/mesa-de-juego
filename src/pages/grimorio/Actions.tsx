import { useMemo } from "react";
import { useActions } from "../../hooks";
import type { Actions as ActionRow } from "../../domain/dnd5e/Actions";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function ActionsPage() {
    const { system, data, isLoading, error } = useActions();
    const { locale, t } = useLocale();

    const actions = useMemo(
        () => sortByLocale(data as ActionRow[], (a) => a.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.actions")}</p>;
    if (error) return <p className="text-red-600">{t("error.actions")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.actions")} ({system})</h2>

            {actions.length === 0 ? (
                <p className="opacity-70">{t("empty.actions")}</p>
            ) : (
                <ul className="space-y-3">
                    {actions.map((a) => (
                        <li key={a.pk} className="border rounded p-3">
                            <div className="font-medium">{a.name}</div>
                            {a.tag ? (
                                <div className="text-xs inline-block mt-1 px-2 py-0.5 rounded bg-neutral-200">{a.tag}</div>
                            ) : null}
                            {a.summary && <p className="text-sm mt-2 opacity-80">{a.summary}</p>}
                            {a.text && <p className="text-sm mt-2 whitespace-pre-wrap">{a.text}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
