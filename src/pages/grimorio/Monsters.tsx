import { useMonsters } from "../../hooks/dnd5e";
import type { Monster } from "../../domain/dnd5e/Monsters";

export default function Monsters() {
    const { system, data: monsters, isLoading, error } = useMonsters();

    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Monstruos ({system})</h2>
            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {monsters.map((m: Monster) => (
                        <li key={m.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {m.size} {m.type} {m.alignment ? `• ${m.alignment}` : ""}
                            </div>
                            <div className="text-sm">
                                {m.ac !== undefined ? `AC ${m.ac}` : "AC —"} •{" "}
                                {m.hp !== undefined ? `HP ${m.hp}` : "HP —"} •{" "}
                                {m.speeds?.walk ? `${m.speeds.walk} ft.` : ""}
                            </div>
                            {m.senses?.passivePerception !== undefined && (
                                <div className="text-xs opacity-80">
                                    Percepción pasiva: {m.senses.passivePerception}
                                </div>
                            )}
                            {m.languages?.length ? (
                                <div className="text-xs mt-1">Idiomas: {m.languages.join(", ")}</div>
                            ) : null}
                            {m.description && <p className="text-sm mt-1">{m.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
