// src/pages/grimorio/Species.tsx
import { useSpecies } from "../../hooks";

export default function Species() {
    const { system, species, isLoading, error } = useSpecies(); // <- sin args

    if (isLoading) return <p className="opacity-70">Cargando especies…</p>;
    if (error) return <p className="text-red-600">Error cargando especies</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Especies ({system})</h2>
            {species.length === 0 ? (
                <p className="opacity-70">No hay especies cargadas.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {species.map((s: { pk: string; name: string }) => (
                        <li key={s.pk}>{s.name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
