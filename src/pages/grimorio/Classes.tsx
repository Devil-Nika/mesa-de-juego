import type { Classes as ClassesType } from "../../domain/types";
import { useClasses } from "../../hooks";

export default function Classes() {
    const { system, classes, isLoading, error } = useClasses();

    if (isLoading) return <p className="opacity-70">Cargando clases…</p>;
    if (error) return <p className="text-red-600">Error cargando clases</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Clases ({system})</h2>
            {classes.length === 0 ? (
                <p className="opacity-70">No hay clases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {classes.map((c: ClassesType) => (
                        <li key={c.pk} className="border rounded p-3">
                            <div className="font-medium">{c.name}</div>
                            {c.primaryAbility && (
                                <div className="text-sm opacity-80">Habilidad primaria: {c.primaryAbility}</div>
                            )}
                            {c.hitDie && <div className="text-sm opacity-80">Hit Die: {c.hitDie}</div>}
                            <div className="text-xs opacity-60">{c.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
