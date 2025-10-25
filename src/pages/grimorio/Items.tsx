import { useItems } from "../../hooks";
import type { Items as ItemType } from "../../domain/dnd5e/Items";


export default function Items() {
    const { system, items, isLoading, error } = useItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Objetos ({system})</h2>
            {items.length === 0 ? (
                <p className="opacity-70">No hay objetos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((i: ItemType) => (
                        <li key={i.pk} className="border rounded p-3">
                            <div className="font-medium">{i.name}</div>
                            <div className="text-sm opacity-80">
                                {i.type ?? i.category ?? "—"}
                            </div>

                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                {"cost" in i && i.cost ? <div>Coste: {i.cost}</div> : null}
                                {"weight" in i && i.weight ? <div>Peso: {i.weight}</div> : null}
                                {"properties" in i && i.properties?.length ? (
                                    <div className="sm:col-span-2">
                                        Propiedades: {i.properties.join(", ")}
                                    </div>
                                ) : null}
                            </div>

                            {"description" in i && i.description ? (
                                <>
                                    <div className="mt-2 font-semibold">Descripción</div>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {i.description}
                                    </p>
                                </>
                            ) : null}

                            <div className="mt-2 text-xs opacity-60">{i.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
