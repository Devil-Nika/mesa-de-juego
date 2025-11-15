import { useMemo, useState } from "react";
import { useSpeciesDnd5e } from "@hooks/dnd5e/useSpeciesDnd5e.ts";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Species } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

export default function SpeciesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useSpeciesDnd5e();
    const [query, setQuery] = useState("");

    const species = useMemo(() => {
        const rows = (data ?? []) as Species[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) =>
                localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" })
            );
    }, [data, query, locale]);

    if (isLoading) return <p>{t("loading.species")}</p>;
    if (error) return <p className="text-red-600">{t("error.species")}</p>;

    return (
        <section className="space-y-4">
            <header className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t("grimorio.species")} ({system})</h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.species")}
                    className="border rounded px-2 py-1"
                />
            </header>

            <ul className="grid sm:grid-cols-2 gap-3">
                {species.map((s) => (
                    <li key={s.pk} className="border rounded p-3 bg-white shadow-sm">
                        <div className="font-medium">{localeName(s, locale)}</div>
                        {s.size && <div className="text-sm opacity-70">{s.size}</div>}
                        {s.description && <p className="text-sm mt-2 whitespace-pre-wrap">{s.description}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}