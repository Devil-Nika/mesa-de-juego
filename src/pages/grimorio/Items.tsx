import { useItems } from "../../hooks/dnd5e";
import type { Item } from "../../domain/dnd5e/Items";

export default function Items() {
    const { system, data: items, isLoading, error } = useItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Objetos ({system})</h2>
            {items.length === 0 ? (
                <p className="opacity-70">No hay objetos cargados.</p>
            ) : (
                <ul className="space-y-2">
                    {items.map((i: Item) => (
                        <li key={i.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{i.name}</div>
                            <div className="text-sm opacity-80">
                                {i.category ?? "—"} {i.cost ? `• ${i.cost}` : ""} {i.weight ? `• ${i.weight}` : ""}
                            </div>
                            {i.properties?.length ? (
                                <div className="text-xs mt-1">Propiedades: {i.properties.join(", ")}</div>
                            ) : null}
                            {i.description && <p className="text-sm mt-1">{i.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
