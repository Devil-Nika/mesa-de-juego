import { useMonstersDnd5e } from "../../hooks/dnd5e/useMonsters";
import type { Monster } from "../../domain/dnd5e/Monsters";

export default function Monsters() {
    const { system, monsters, isLoading, error } = useMonstersDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Monstruos ({system})</h2>
            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="space-y-2">
                    {monsters.map((m: Monster) => (
                        <li key={m.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {m.size} {m.type} {m.alignment ? `(${m.alignment})` : ""}<br />
                                CR: {m.cr ?? "—"} • AC: {m.ac ?? "—"} • HP: {m.hp ?? "—"}
                            </div>
                            {m.description && <p className="text-sm mt-1">{m.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
