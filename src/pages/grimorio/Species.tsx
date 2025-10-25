import { useSpecies } from "../../hooks";
import type { Species as SpeciesType } from "../../domain/dnd5e/Species";


export default function Species() {
    const { system, species, isLoading, error } = useSpecies();

    if (isLoading) return <p className="opacity-70">Cargando especies…</p>;
    if (error) return <p className="text-red-600">Error cargando especies</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Especies ({system})</h2>
            {species.length === 0 ? (
                <p className="opacity-70">No hay especies cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {species.map((s: SpeciesType) => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>

                            {/* Campos opcionales comunes del SRD 5.2.1 */}
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                {"size" in s && s.size ? <div>Tamaño: {s.size}</div> : null}
                                {"speed" in s && s.speed ? <div>Velocidad: {s.speed}</div> : null}
                                {"type" in s && s.type ? <div>Tipo: {s.type}</div> : null}
                            </div>

                            {"traits" in s && Array.isArray(s.traits) && s.traits.length ? (
                                <>
                                    <div className="mt-2 font-semibold">Rasgos</div>
                                    <ul className="list-disc pl-6 text-sm">
                                        {s.traits.map((t: string, idx: number) => (
                                            <li key={`${s.id}-trait-${idx}`}>{t}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}

                            {"description" in s && s.description ? (
                                <>
                                    <div className="mt-2 font-semibold">Descripción</div>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {s.description}
                                    </p>
                                </>
                            ) : null}

                            <div className="mt-2 text-xs opacity-60">{s.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
