import { useMemo } from "react";
import { useSpecies } from "../../hooks";
import type { Species } from "../../domain/dnd5e/Species";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function SpeciesPage() {
    const { system, data, isLoading, error } = useSpecies();
    const { locale, t } = useLocale();

    const species = useMemo(
        () => sortByLocale(data as Species[], (s) => s.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.species")}</p>;
    if (error) return <p className="text-red-600">{t("error.species")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.species")} ({system})</h2>

            {species.length === 0 ? (
                <p className="opacity-70">{t("empty.species")}</p>
            ) : (
                <ul className="space-y-3">
                    {species.map((s) => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm opacity-80">
                                {s.size ?? "—"}{s.speed ? ` • ${t("species.speed")} ${s.speed} ft.` : ""}
                            </div>
                            {s.description && <p className="text-sm mt-2">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
