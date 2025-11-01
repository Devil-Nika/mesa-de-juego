import { useItems } from "../../hooks";
import type { Items as ItemRow } from "../../domain/dnd5e/Items";

export default function Items() {
    const { system, data, isLoading, error } = useItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos.</p>;

    const items = data as ItemRow[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Objetos ({system})</h2>
            {items.length === 0 ? (
                <p className="opacity-70">No hay objetos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map(i => (
                        <li key={i.pk} className="border rounded p-3">
                            <div className="font-medium">{i.name}</div>
                            {i.category && <div className="text-sm opacity-80">Categoría: {i.category}</div>}
                            {i.description && <p className="text-sm mt-2">{i.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
