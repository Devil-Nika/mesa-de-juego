import { useClasses } from "../../hooks";
import type { Classes as ClassRow } from "../../domain/dnd5e/Classes";

export default function Classes() {
    const { system, data, isLoading, error } = useClasses();

    if (isLoading) return <p className="opacity-70">Cargando clases…</p>;
    if (error) return <p className="text-red-600">Error cargando clases.</p>;

    const classes = data as ClassRow[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Clases ({system})</h2>
            {classes.length === 0 ? (
                <p className="opacity-70">No hay clases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {classes.map(c => (
                        <li key={c.pk} className="border rounded p-3">
                            <div className="font-medium">{c.name}</div>
                            {c.primaryAbility && (
                                <div className="text-sm opacity-80">Habilidad primaria: {c.primaryAbility}</div>
                            )}
                            {c.hitDie && <div className="text-sm opacity-80">Golpe de vida: {c.hitDie}</div>}
                            {c.description && <p className="text-sm mt-2">{c.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
