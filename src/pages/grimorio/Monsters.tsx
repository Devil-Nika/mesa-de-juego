import { useMemo } from "react";
import { useMonsters } from "../../hooks";
import type { Monster } from "../../domain/dnd5e/Monsters";
import { useLocale } from "../../contexts/useLocale";
import { sortByLocale } from "../../utils/sort";

export default function MonstersPage() {
    const { system, data, isLoading, error } = useMonsters();
    const { locale, t } = useLocale();

    const monsters = useMemo(
        () => sortByLocale(data as Monster[], (m) => m.name ?? "", locale),
        [data, locale]
    );

    if (isLoading) return <p className="opacity-70">{t("loading.monsters")}</p>;
    if (error) return <p className="text-red-600">{t("error.monsters")}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("grimorio.monsters")} ({system})</h2>

            {monsters.length === 0 ? (
                <p className="opacity-70">{t("empty.monsters")}</p>
            ) : (
                <ul className="space-y-3">
                    {monsters.map((m) => (
                        <li key={m.pk} className="border rounded p-3">
                            <div className="font-medium">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {m.size ?? "—"} {m.type ? `• ${m.type}` : ""}
                                {m.cr ? ` • CR ${m.cr}` : ""}
                                {m.ac !== undefined ? ` • AC ${m.ac}` : ""}
                                {m.hp !== undefined ? ` • HP ${m.hp}` : ""}
                            </div>

                            {m.traits?.length ? (
                                <div className="text-sm mt-2">
                                    <div className="font-medium">{t("monster.traits")}</div>
                                    <ul className="list-disc ml-5">
                                        {m.traits.map((f, i) => <li key={i}><b>{f.name}.</b> {f.text}</li>)}
                                    </ul>
                                </div>
                            ) : null}

                            {m.legendaryActions?.length ? (
                                <div className="text-sm mt-2">
                                    <div className="font-medium">{t("monster.legendary")}</div>
                                    <ul className="list-disc ml-5">
                                        {m.legendaryActions.map((f, i) => <li key={i}><b>{f.name}.</b> {f.text}</li>)}
                                    </ul>
                                </div>
                            ) : null}

                            {m.lairActions?.length ? (
                                <div className="text-sm mt-2">
                                    <div className="font-medium">{t("monster.lairActions")}</div>
                                    <ul className="list-disc ml-5">
                                        {m.lairActions.map((f, i) => <li key={i}><b>{f.name}.</b> {f.text}</li>)}
                                    </ul>
                                </div>
                            ) : null}

                            {m.description && <p className="text-sm mt-2 whitespace-pre-wrap">{m.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
