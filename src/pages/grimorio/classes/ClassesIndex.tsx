import { useMemo, useState } from "react";
import { useClassesDnd5e } from "@hooks/dnd5e/useClassesDnd5e.ts";
import { useSubclassesDnd5e } from "@hooks/dnd5e/useSubclassesDnd5e.ts";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Classes as ClassRow, Subclass } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

export default function ClassesIndex() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data: classData, isLoading, error } = useClassesDnd5e();
    const { data: subclassData } = useSubclassesDnd5e();

    const [query, setQuery] = useState("");
    const [selectedClassPk, setSelectedClassPk] = useState<string | null>(null);
    const [selectedSubclassPk, setSelectedSubclassPk] = useState<string | null>(null);

    const classes = useMemo(() => {
        const rows = (classData ?? []) as ClassRow[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) => localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" }));
    }, [classData, query, locale]);

    const subclassesByClassId = useMemo(() => {
        const map: Record<string, Subclass[]> = {};
        (subclassData ?? []).forEach((sc) => {
            if (sc.parentClassId) (map[sc.parentClassId] ??= []).push(sc);
        });
        for (const arr of Object.values(map)) {
            arr.sort((a, b) => localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" }));
        }
        return map;
    }, [subclassData, locale]);

    const selectedClass = classes.find((c) => c.pk === selectedClassPk) ?? null;
    const availableSubclasses: Subclass[] =
        selectedClass ? subclassesByClassId[selectedClass.id] ?? [] : [];

    const selectedSubclass: Subclass | null =
        availableSubclasses.find((s) => s.pk === selectedSubclassPk) ?? null;

    if (isLoading) return <p>{t("loading.classes")}</p>;
    if (error) return <p className="text-red-600">{t("error.classes")}</p>;

    return (
        <section className="space-y-6">
            <header className="flex gap-3 items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {t("grimorio.classes")} ({system})
                </h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.classes")}
                    className="border rounded px-2 py-1"
                />
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Lista de clases */}
                <div>
                    <div className="text-sm font-medium mb-2">{t("classes.list")}</div>
                    <ul className="space-y-2">
                        {classes.map((c) => {
                            const isSelected = c.pk === selectedClassPk;
                            return (
                                <li
                                    key={c.pk}
                                    className={`rounded border p-3 bg-white shadow-sm cursor-pointer ${
                                        isSelected ? "ring-2 ring-indigo-500" : "hover:bg-indigo-50"
                                    }`}
                                    onClick={() => {
                                        setSelectedClassPk(c.pk);
                                        setSelectedSubclassPk(null);
                                    }}
                                >
                                    <div className="font-medium">{localeName(c, locale)}</div>
                                    {c.hitDie && <div className="text-xs opacity-70 mt-0.5">Hit Die: {c.hitDie}</div>}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Panel de detalle y subclases */}
                <div>
                    <div className="text-sm font-medium mb-2">{t("classes.details")}</div>
                    {!selectedClass ? (
                        <div className="p-4 border rounded bg-white opacity-70">{t("classes.pickOne")}</div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 border rounded bg-white shadow-sm">
                                <div className="text-lg font-semibold">{localeName(selectedClass, locale)}</div>
                                {selectedClass.description && (
                                    <p className="text-sm mt-2 whitespace-pre-wrap">{selectedClass.description}</p>
                                )}
                            </div>

                            <div className="p-4 border rounded bg-white shadow-sm">
                                <div className="text-sm font-medium mb-2">{t("classes.subclasses")}</div>
                                {availableSubclasses.length === 0 ? (
                                    <div className="opacity-70 text-sm">{t("subclasses.none")}</div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {availableSubclasses.map((sc) => {
                                            const isSel = sc.pk === selectedSubclassPk;
                                            return (
                                                <button
                                                    key={sc.pk}
                                                    className={`text-left border rounded p-2 ${
                                                        isSel ? "bg-indigo-600 text-white" : "bg-white hover:bg-indigo-50"
                                                    }`}
                                                    onClick={() => setSelectedSubclassPk(sc.pk)}
                                                >
                                                    <div className="font-medium">{localeName(sc, locale)}</div>
                                                    {sc.description && <p className="text-xs opacity-90 mt-1">{sc.description}</p>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {selectedSubclass && (
                                <div className="p-4 border rounded bg-white shadow-sm">
                                    <div className="text-sm font-medium mb-1">{t("subclass.selected")}</div>
                                    <div className="font-medium">{localeName(selectedSubclass, locale)}</div>
                                    {selectedSubclass.description && (
                                        <p className="text-sm mt-2 whitespace-pre-wrap">{selectedSubclass.description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
