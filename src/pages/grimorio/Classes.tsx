import { useMemo } from "react";
import { useClasses } from "../../hooks";
import type { Classes } from "../../domain/dnd5e/Classes";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function ClassesPage() {
    const { system, data, isLoading, error } = useClasses();
    const { locale, t } = useLocale();

    const classes = useMemo(
        () => sortByLocale(data as Classes[], (c) => c.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.classes")}</p>;
    if (error) return <p className="text-red-600">{t("error.classes")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.classes")} ({system})</h2>

            {classes.length === 0 ? (
                <p className="opacity-70">{t("empty.classes")}</p>
            ) : (
                <ul className="space-y-3">
                    {classes.map((c) => (
                        <li key={c.pk} className="border rounded p-3">
                            <div className="font-medium">{c.name}</div>
                            <div className="text-sm opacity-80">
                                {c.primaryAbility ? `${t("class.primaryAbility")}: ${c.primaryAbility}` : ""}
                                {c.hitDie ? ` • ${t("class.hitDie")}: ${c.hitDie}` : ""}
                            </div>
                            {c.description && <p className="text-sm mt-2 whitespace-pre-wrap">{c.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
