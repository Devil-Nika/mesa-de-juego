import { useSpells } from "../../hooks";
import type { Spell } from "../../domain/dnd5e/Spells";

export default function Spells() {
    const { system, data, isLoading, error } = useSpells();

    if (isLoading) return <p className="opacity-70">Cargando conjuros…</p>;
    if (error) return <p className="text-red-600">Error cargando conjuros.</p>;

    const spells = data as Spell[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Conjuros ({system})</h2>
            {spells.length === 0 ? (
                <p className="opacity-70">No hay conjuros cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {spells.map(s => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm opacity-80">
                                {s.level ?? "—"} {s.school ? `• ${s.school}` : ""}
                            </div>
                            {s.description && <p className="text-sm mt-2">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
