import { useSpellsDnd5e } from "../../hooks/dnd5e/useSpells";
import type { Spell } from "../../domain/dnd5e/Spells";

export default function Spells() {
    const { system, spells, isLoading, error } = useSpellsDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando conjuros…</p>;
    if (error) return <p className="text-red-600">Error cargando conjuros.</p>;
    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Conjuros ({system})</h2>
            {spells.length === 0 ? (
                <p className="opacity-70">No hay conjuros cargados.</p>
            ) : (
                <ul className="space-y-2">
                    {spells.map((s: Spell) => (
                        <li key={s.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{s.name}</div>
                            <div className="text-sm opacity-80">
                                {s.level !== undefined ? `Nivel ${s.level}` : "Nivel —"}{s.school ? ` • ${s.school}` : ""}
                            </div>
                            {s.description && <p className="text-sm mt-1">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
