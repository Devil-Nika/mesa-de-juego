import type { Monster as MonsterType } from "../../domain/dnd5e";
import { useMonsters } from "../../hooks";

export default function Monsters() {
    const { system, monsters, isLoading, error } = useMonsters();

    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Monstruos ({system})</h2>
            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {monsters.map((m: MonsterType) => (
                        <li key={m.pk} className="border rounded p-3">
                            <div className="font-medium">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {[m.size, m.type].filter(Boolean).join(" ") || "—"}
                            </div>

                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                                {"cr" in m && m.cr ? <div>CR: {m.cr}</div> : null}
                                {"ac" in m && m.ac ? <div>AC: {m.ac}</div> : null}
                                {"hp" in m && m.hp ? <div>HP: {m.hp}</div> : null}
                                {"speed" in m && m.speed ? <div>Velocidad: {m.speed}</div> : null}
                                {"senses" in m && m.senses ? <div>Sentidos: {m.senses}</div> : null}
                                {"languages" in m && m.languages ? (
                                    <div className="sm:col-span-2">Idiomas: {m.languages}</div>
                                ) : null}
                            </div>

                            {"traits" in m && Array.isArray(m.traits) && m.traits.length ? (
                                <>
                                    <div className="mt-2 font-semibold">Rasgos</div>
                                    <ul className="list-disc pl-6 text-sm">
                                        {m.traits.map((t: string, idx: number) => (
                                            <li key={`${m.id}-trait-${idx}`}>{t}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}

                            {"actions" in m && Array.isArray(m.actions) && m.actions.length ? (
                                <>
                                    <div className="mt-2 font-semibold">Acciones</div>
                                    <ul className="list-disc pl-6 text-sm">
                                        {m.actions.map(
                                            (a: { name: string; text?: string } | string, idx: number
                                            ) => {
                                                if (typeof a === "string") {
                                                    return <li key={`${m.id}-action-${idx}`}>{a}</li>;
                                                }
                                                return (
                                                    <li key={`${m.id}-action-${idx}`}>
                                                        <span className="font-medium">{a.name}.</span>{" "}
                                                        {a.text ?? ""}
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </>
                            ) : null}

                            <div className="mt-2 text-xs opacity-60">{m.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
