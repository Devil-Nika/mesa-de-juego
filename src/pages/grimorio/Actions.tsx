import { useMemo, useState } from "react";
import { useActions } from "@hooks/dnd5e/useActions";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Actions as ActionRow } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

export default function ActionsPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useActions();
    const [query, setQuery] = useState("");

    const actions = useMemo(() => {
        const rows = (data ?? []) as ActionRow[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) =>
                localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" })
            );
    }, [data, query, locale]);

    if (isLoading) return <p>{t("loading.actions")}</p>;
    if (error) return <p className="text-red-600">{t("error.actions")}</p>;

    return (
        <section className="space-y-4">
            <header className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t("grimorio.actions")} ({system})</h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.actions")}
                    className="border rounded px-2 py-1"
                />
            </header>

            <ul className="grid sm:grid-cols-2 gap-3">
                {actions.map((a) => (
                    <li key={a.pk} className="border rounded p-3 bg-white shadow-sm">
                        <div className="font-medium">{localeName(a, locale)}</div>
                        {a.tag && <div className="text-xs mt-1 opacity-70">{a.tag}</div>}
                        {a.text && <p className="text-sm mt-2 whitespace-pre-wrap">{a.text}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
