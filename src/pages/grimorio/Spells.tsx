import { useMemo } from "react";
import { useSpells } from "../../hooks";
import type { Spell } from "../../domain/dnd5e/Spells";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function Spells() {
    const { system, data, isLoading, error } = useSpells();
    const { locale, t } = useLocale();

    const spells = useMemo(
        () => sortByLocale(data as Spell[], (s) => s.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.spells")}</p>;
    if (error) return <p className="text-red-600">{t("error.spells")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.spells")} ({system})</h2>

            {spells.length === 0 ? (
                <p className="opacity-70">{t("empty.spells")}</p>
            ) : (
                <ul className="space-y-3">
                    {spells.map((s) => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm opacity-80">
                                {s.level !== undefined ? `${t("spell.level")} ${s.level}` : "—"}
                                {s.school ? ` • ${s.school}` : ""}
                            </div>
                            {s.description && (
                                <p className="text-sm mt-2 whitespace-pre-wrap">{s.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
