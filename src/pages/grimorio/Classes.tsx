import { useMemo, useState } from "react";
import { useClassesDnd5e } from "@hooks/dnd5e/useClassesDnd5e.ts";
import { useSubclassesDnd5e } from "@hooks/dnd5e/useSubclassesDnd5e.ts";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Classes as ClassRow, Subclass } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

export default function ClassesPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data: classData, isLoading, error } = useClassesDnd5e();
    const { data: subclassData } = useSubclassesDnd5e();
    const [query, setQuery] = useState("");
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const classes = useMemo(() => {
        const rows = (classData ?? []) as ClassRow[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) =>
                localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" })
            );
    }, [classData, query, locale]);

    const subclassesByClass = useMemo(() => {
        const map: Record<string, Subclass[]> = {};
        (subclassData ?? []).forEach((sc) => {
            if (sc.parentClassId) (map[sc.parentClassId] ??= []).push(sc);
        });
        for (const list of Object.values(map)) {
            list.sort((a, b) =>
                localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" })
            );
        }
        return map;
    }, [subclassData, locale]);

    if (isLoading) return <p>{t("loading.classes")}</p>;
    if (error) return <p className="text-red-600">{t("error.classes")}</p>;

    return (
        <section className="space-y-4">
            <header className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t("grimorio.classes")} ({system})</h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.classes")}
                    className="border rounded px-2 py-1"
                />
            </header>

            <ul className="space-y-3">
                {classes.map((c) => {
                    const open = expanded[c.pk];
                    const subList = subclassesByClass[c.id] ?? [];
                    return (
                        <li key={c.pk} className="border rounded-xl bg-white shadow-sm">
                            <button
                                onClick={() => setExpanded((s) => ({ ...s, [c.pk]: !open }))}
                                className="w-full text-left p-3 flex justify-between items-center hover:bg-indigo-50"
                            >
                                <div>
                                    <div className="font-medium">{localeName(c, locale)}</div>
                                    {c.hitDie && <div className="text-sm opacity-70">Hit Die: {c.hitDie}</div>}
                                </div>
                                <span className="text-indigo-600 text-sm">
                  {open ? t("common.hideDetails") : t("common.showDetails")}
                </span>
                            </button>

                            {open && (
                                <div className="px-3 pb-3">
                                    {c.description && <p className="text-sm mt-2">{c.description}</p>}
                                    {subList.length > 0 && (
                                        <>
                                            <div className="text-xs uppercase mt-3 mb-1 opacity-60">{t("grimorio.subclasses")}</div>
                                            <ul className="grid sm:grid-cols-2 gap-2">
                                                {subList.map((sc) => (
                                                    <li key={sc.pk} className="border rounded p-2">
                                                        <div className="font-medium">{localeName(sc, locale)}</div>
                                                        {sc.description && <p className="text-sm opacity-80 mt-1">{sc.description}</p>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
