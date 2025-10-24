// src/pages/grimorio/Monsters.tsx
import { useMemo } from "react";
import { useMonsters, useActions } from "../../hooks";
import type { Monster, Actions } from "../../domain/types";

export default function Monsters() {
    const { system, monsters, isLoading, error } = useMonsters();
    const { actions } = useActions();

    // Mapa pk->acción (si ya tenés useActionsMap podés usarlo en su lugar)
    const actionsByPk = useMemo(() => {
        const map: Record<string, Actions> = {};
        for (const a of actions) map[a.pk] = a;
        return map;
    }, [actions]);

    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Monstruos ({system})</h2>

            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {monsters.map((m: Monster) => (
                        <li key={m.pk} className="rounded border bg-white shadow-sm p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold">{m.name}</h3>
                                    <p className="text-sm opacity-80">{m.size} {m.type}</p>
                                </div>
                                <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 border">
                  CR {m.challenge ?? "-"}
                </span>
                            </div>

                            <div className="mt-2 text-sm grid gap-1">
                                <div><span className="opacity-70">AC:</span> {m.armor_class}</div>
                                <div><span className="opacity-70">HP:</span> {m.hit_points} <span className="opacity-70">({m.hit_dice})</span></div>
                                {m.speed && <div><span className="opacity-70">Velocidad:</span> {m.speed}</div>}
                                {m.senses && <div><span className="opacity-70">Sentidos:</span> {m.senses}</div>}
                                {m.languages && <div><span className="opacity-70">Idiomas:</span> {m.languages}</div>}
                            </div>

                            {m.actions?.length ? (
                                <details className="mt-3">
                                    <summary className="cursor-pointer text-sm underline">Acciones</summary>
                                    <ul className="mt-2 text-sm list-disc pl-5">
                                        {m.actions.map((a, idx) => {
                                            const pk = `${m.system}:${a.actionId}`;
                                            const action = actionsByPk[pk];
                                            return (
                                                <li key={idx}>
                                                    <strong>{action?.name ?? a.actionId}</strong>
                                                    {a.count ? ` ×${a.count}` : ""}{action?.description ? ` — ${action.description}` : ""}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </details>
                            ) : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
