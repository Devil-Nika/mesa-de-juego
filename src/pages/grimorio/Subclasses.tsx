import { useSubclassesDnd5e } from "../../hooks/dnd5e/useSubclasses";
import type { Subclass } from "../../domain/dnd5e/Subclasses";

export default function Subclasses() {
    const { system, subclasses, isLoading, error } = useSubclassesDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando subclases…</p>;
    if (error) return <p className="text-red-600">Error cargando subclases.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Subclases ({system})</h2>
            {subclasses.length === 0 ? (
                <p className="opacity-70">No hay subclases cargadas.</p>
            ) : (
                <ul className="space-y-2">
                    {subclasses.map((s: Subclass) => (
                        <li key={s.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{s.name}</div>
                            {s.parentClassId && <div className="text-sm opacity-80">Clase: {s.parentClassId}</div>}
                            {s.description && <p className="text-sm mt-1">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
