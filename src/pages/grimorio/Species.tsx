import { useSpecies } from "../../hooks";
import type { Species as SpeciesRow } from "../../domain/dnd5e/Species";

export default function Species() {
    const { system, data, isLoading, error } = useSpecies();

    if (isLoading) return <p className="opacity-70">Cargando especies…</p>;
    if (error) return <p className="text-red-600">Error cargando especies.</p>;

    const species = data as SpeciesRow[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Especies ({system})</h2>
            {species.length === 0 ? (
                <p className="opacity-70">No hay especies cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {species.map(s => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>
                            {s.size && <div className="text-sm opacity-80">Tamaño: {s.size}</div>}
                            {s.description && <p className="text-sm mt-2">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
