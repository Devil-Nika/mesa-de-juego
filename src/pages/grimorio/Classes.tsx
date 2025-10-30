import { useClasses } from "../../hooks/dnd5e";

type ClassView = {
    pk: string;
    name: string;
    primaryAbility?: string;
    hitDie?: string;
    text?: string;
    source?: string;
};

export default function Classes() {
    const { system, classes, isLoading, error } = useClasses();

    if (isLoading) return <p className="opacity-70">Cargando clases…</p>;
    if (error) return <p className="text-red-600">Error cargando clases.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Clases ({system})</h2>
            {classes.length === 0 ? (
                <p className="opacity-70">No hay clases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {classes.map((c: ClassView) => (
                        <li key={c.pk} className="border rounded p-3">
                            <div className="font-medium">{c.name}</div>
                            <div className="text-sm opacity-80">
                                {c.primaryAbility ? `Primaria: ${c.primaryAbility}` : ""}
                                {c.primaryAbility && c.hitDie ? " · " : ""}
                                {c.hitDie ? `Hit Die: ${c.hitDie}` : ""}
                            </div>
                            {c.text ? <p className="mt-2 whitespace-pre-wrap">{c.text}</p> : null}
                            {c.source ? <div className="text-xs mt-1 opacity-70">Fuente: {c.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
