import { useSpecies } from "../../hooks";
import type { Species as SpeciesType } from "../../domain/types";

type SpeciesView = SpeciesType & { description?: string; size?: string; speed?: string };

export default function SpeciesPage() {
    const { system, species, isLoading, error } = useSpecies();

    if (isLoading) return <p className="opacity-70">Cargando especies…</p>;
    if (error) return <p className="text-red-600">Error cargando especies</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Especies ({system})</h2>

            {species.length === 0 ? (
                <p className="opacity-70">No hay especies cargadas.</p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {species.map((s: SpeciesView) => (
                        <li key={s.pk} className="rounded border bg-white shadow-sm p-4">
                            <h3 className="font-semibold">{s.name}</h3>
                            <p className="text-sm opacity-80">{s.size ?? "-"} • {s.speed ?? "-"}</p>
                            {s.description && (
                                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{s.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
