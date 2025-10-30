import { useSubclasses } from "../../hooks/dnd5e";

type SubclassView = {
    pk: string;
    name: string;
    parentClassId?: string;
    text?: string;
    source?: string;
};

export default function Subclasses() {
    const { system, subclasses, isLoading, error } = useSubclasses();

    if (isLoading) return <p className="opacity-70">Cargando subclases…</p>;
    if (error) return <p className="text-red-600">Error cargando subclases.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Subclases ({system})</h2>
            {subclasses.length === 0 ? (
                <p className="opacity-70">No hay subclases cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {subclasses.map((sc: SubclassView) => (
                        <li key={sc.pk} className="border rounded p-3">
                            <div className="font-medium">{sc.name}</div>
                            <div className="text-sm opacity-80">
                                {sc.parentClassId ? `Clase: ${sc.parentClassId}` : "-"}
                            </div>
                            {sc.text ? <p className="mt-2 whitespace-pre-wrap">{sc.text}</p> : null}
                            {sc.source ? <div className="text-xs mt-1 opacity-70">Fuente: {sc.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
