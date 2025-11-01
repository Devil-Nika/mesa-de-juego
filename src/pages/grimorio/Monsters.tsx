import { useMonsters } from "../../hooks";
import type { Monster } from "../../domain/dnd5e/Monsters";

export default function Monsters() {
    const { system, data, isLoading, error } = useMonsters();

    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos.</p>;

    const monsters = data as Monster[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Monstruos ({system})</h2>
            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {monsters.map(m => (
                        <li key={m.pk} className="border rounded p-3">
                            <div className="font-medium">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {m.size ?? "—"} {m.type ? `• ${m.type}` : ""} {m.cr ? `• CR ${m.cr}` : ""}
                            </div>
                            {m.description && <p className="text-sm mt-2">{m.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
