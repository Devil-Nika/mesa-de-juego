import { useClassesDnd5e } from "../../hooks/dnd5e/useClasses";
import type { Classes } from "../../domain/dnd5e/Classes";

export default function ClassesPage() {
    const { system, classes, isLoading, error } = useClassesDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando clases…</p>;
    if (error) return <p className="text-red-600">Error cargando clases.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Clases ({system})</h2>
            {classes.length === 0 ? (
                <p className="opacity-70">No hay clases cargadas.</p>
            ) : (
                <ul className="space-y-2">
                    {classes.map((c: Classes) => (
                        <li key={c.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{c.name}</div>
                            {c.primaryAbility && <div className="text-sm opacity-80">Habilidad principal: {c.primaryAbility}</div>}
                            {c.hitDie && <div className="text-sm opacity-80">Dado de golpe: {c.hitDie}</div>}
                            {c.description && <p className="text-sm mt-1">{c.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
