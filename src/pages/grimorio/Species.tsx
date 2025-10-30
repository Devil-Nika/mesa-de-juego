import { useSpeciesDnd5e } from "../../hooks/dnd5e/useSpecies";
import type { Species } from "../../domain/dnd5e/Species";

export default function Species() {
    const { system, species, isLoading, error } = useSpeciesDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando especies…</p>;
    if (error) return <p className="text-red-600">Error cargando especies.</p>;
    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Especies ({system})</h2>
            {species.length === 0 ? (
                <p className="opacity-70">No hay especies cargadas.</p>
            ) : (
                <ul className="space-y-2">
                    {species.map((s: Species) => (
                        <li key={s.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{s.name}</div>
                            {s.description && <p className="text-sm mt-1">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}