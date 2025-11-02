// src/pages/grimorio/Subclasses.tsx
import { useMemo } from "react";
import { useSubclasses } from "../../hooks";
import type { Subclass } from "../../domain/dnd5e/Subclasses";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function SubclassesPage() {
    const { system, data, isLoading, error } = useSubclasses();
    const { locale, t } = useLocale();

    const subclasses: Subclass[] = useMemo(
        () => sortByLocale(data as Subclass[], (sc) => sc.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.subclasses")}</p>;
    if (error) return <p className="text-red-600">{t("error.subclasses")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">
                {t("grimorio.subclasses")} ({system})
            </h2>

            {subclasses.length === 0 ? (
                <p className="opacity-70">{t("empty.subclasses")}</p>
            ) : (
                <ul className="space-y-3">
                    {subclasses.map((sc) => (
                        <li key={sc.pk} className="border rounded p-3">
                            <div className="font-medium">{sc.name}</div>
                            <div className="text-sm opacity-80">
                                {sc.parentClassId ? `${t("subclass.parent")}: ${sc.parentClassId}` : ""}
                            </div>
                            {sc.description ? (
                                <p className="text-sm mt-2 whitespace-pre-wrap">{sc.description}</p>
                            ) : null}
                            {sc.source ? (
                                <div className="text-xs mt-1 opacity-70">
                                    {t("common.source")}: {sc.source}
                                </div>
                            ) : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
