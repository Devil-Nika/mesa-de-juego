// src/pages/grimorio/Items.tsx
import { useItems } from "../../hooks";
import type { Items } from "../../domain/types";

export default function Items() {
    const { system, items, isLoading, error } = useItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Objects ({system})</h2>

            {items.length === 0 ? (
                <p className="opacity-70">No hay objetos cargados.</p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {items.map((i: Items) => (
                        <li key={i.pk} className="rounded border bg-white shadow-sm p-4">
                            <h3 className="font-semibold">{i.name}</h3>
                            <p className="text-sm opacity-80">{i.type ?? "-"}</p>

                            <div className="mt-2 text-sm grid gap-1">
                                {i.cost && <div><span className="opacity-70">Coste: </span>{i.cost}</div>}
                                {i.weight && <div><span className="opacity-70">Peso: </span>{i.weight}</div>}
                                {Array.isArray(i.properties) && i.properties.length > 0 && (
                                    <div><span className="opacity-70">Propiedades: </span>{i.properties.join(", ")}</div>
                                )}
                                {i.source && <div><span className="opacity-70">Fuente: </span>{i.source}</div>}
                            </div>

                            {i.description && (
                                <details className="mt-3">
                                    <summary className="cursor-pointer text-sm underline">Descripción</summary>
                                    <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                                        {i.description}
                                    </p>
                                </details>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
