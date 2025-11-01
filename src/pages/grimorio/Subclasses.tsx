import { useSubclasses } from "../../hooks";
import type { Subclass } from "../../domain/dnd5e/Subclasses";

export default function Subclasses() {
    const { system, data, isLoading, error } = useSubclasses();

    if (isLoading) return <p className="opacity-70">Cargando subclases…</p>;
    if (error) return <p className="text-red-600">Error cargando subclases.</p>;

    const subclasses = data as Subclass[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Subclases ({system})</h2>
            {subclasses.length === 0 ? (
                <p className="opacity-70">No hay subclases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {subclasses.map(sc => (
                        <li key={sc.pk} className="border rounded p-3">
                            <div className="font-medium">{sc.name}</div>
                            {sc.parentClassId && (
                                <div className="text-sm opacity-80">Clase: {sc.parentClassId}</div>
                            )}
                            {sc.description && (
                                <p className="text-sm mt-2 whitespace-pre-wrap">{sc.description}</p>
                            )}
                            {sc.source && <div className="text-xs mt-1 opacity-70">Fuente: {sc.source}</div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}