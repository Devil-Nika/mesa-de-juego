import type { Subclass as SubclassType } from "../../domain/types";
import { useSubclasses } from "../../hooks";

export default function Subclasses() {
    const { system, subclasses, isLoading, error } = useSubclasses();

    if (isLoading) return <p className="opacity-70">Cargando subclases…</p>;
    if (error) return <p className="text-red-600">Error cargando subclases</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Subclases ({system})</h2>
            {subclasses.length === 0 ? (
                <p className="opacity-70">No hay subclases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {subclasses.map((s: SubclassType) => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">{s.name}</div>
                            {s.parentClassId && (
                                <div className="text-sm opacity-80">Clase base: {s.parentClassId}</div>
                            )}
                            <div className="text-xs opacity-60">{s.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
